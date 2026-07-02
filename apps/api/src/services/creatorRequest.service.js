const CreatorRequest = require("../models/CreatorRequest");
const User = require("../models/User");

const { createAdminActionLog } = require("./adminActionLog.service");

const createCreatorRequest = async (userId, payload) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  // admin / creator interdits
  if (user.role === "admin" || user.role === "creator") {
    throw new Error("FORBIDDEN");
  }

  // demande déjà pending
  const existingRequest = await CreatorRequest.findOne({
    user: userId,
    status: "pending",
  });

  if (existingRequest) {
    throw new Error("PENDING_REQUEST_ALREADY_EXISTS");
  }

  const request = await CreatorRequest.create({
    user: userId,
    ...payload,
  });

  return request.populate("user", "pseudo email role");
};

const getPendingCreatorRequests = async () => {
  return CreatorRequest.find({
    status: "pending",
  })
    .populate("user", "pseudo email role")
    .sort({
      createdAt: -1,
    });
};

const approveCreatorRequest = async (requestId, adminId, comment = "") => {
  const request = await CreatorRequest.findById(requestId).populate("user");

  if (!request) {
    throw new Error("REQUEST_NOT_FOUND");
  }

  if (request.status !== "pending") {
    throw new Error("REQUEST_ALREADY_REVIEWED");
  }

  const user = await User.findById(request.user._id);

  user.role = "creator";
  user.isApprovedCreator = true;

  user.creatorApproval = {
    isApproved: true,
    approvedBy: adminId,
    approvedAt: new Date(),
  };

  await user.save();

  await createAdminActionLog({
    admin: adminId,
    targetUser: user._id,

    actionType: "CREATOR_APPROVED",
    comment,

    metadata: {
      requestId: request._id,
    },
  });

  request.status = "approved";
  request.reviewedBy = adminId;
  request.reviewedAt = new Date();

  await request.save();

  return request.populate([
    {
      path: "user",
      select: "pseudo email role",
    },
    {
      path: "reviewedBy",
      select: "pseudo role",
    },
  ]);
};

const rejectCreatorRequest = async (
  requestId,
  adminId,
  rejectionReason,
  comment = "",
) => {
  const request = await CreatorRequest.findById(requestId);

  if (!request) {
    throw new Error("REQUEST_NOT_FOUND");
  }

  if (request.status !== "pending") {
    throw new Error("REQUEST_ALREADY_REVIEWED");
  }

  request.status = "rejected";
  request.reviewedBy = adminId;
  request.reviewedAt = new Date();
  request.rejectionReason = rejectionReason;

  await request.save();

  await createAdminActionLog({
    admin: adminId,
    targetUser: request.user,

    actionType: "CREATOR_REJECTED",

    comment: comment || rejectionReason,

    metadata: {
      requestId: request._id,
      rejectionReason,
    },
  });

  return request.populate([
    {
      path: "user",
      select: "pseudo email role",
    },
    {
      path: "reviewedBy",
      select: "pseudo role",
    },
  ]);
};

const getMyCreatorRequest = async (userId) => {
  const request = await CreatorRequest.findOne({
    user: userId,
  })
    .populate("reviewedBy", "pseudo role")
    .sort({
      createdAt: -1,
    });

  return request;
};

const getCreatorRequestById = async (requestId) => {
  return CreatorRequest.findById(requestId).populate(
    "user",
    "pseudo email role createdAt",
  );
};

const getCreatorRequestHistory = async () => {
  return CreatorRequest.find({
    status: {
      $in: ["approved", "rejected"],
    },
  })
    .populate("user", "pseudo email role")
    .populate("reviewedBy", "pseudo role")
    .sort({
      reviewedAt: -1,
      createdAt: -1,
    });
};

module.exports = {
  createCreatorRequest,
  getPendingCreatorRequests,
  getCreatorRequestHistory,
  approveCreatorRequest,
  rejectCreatorRequest,
  getMyCreatorRequest,
  getCreatorRequestById,
};