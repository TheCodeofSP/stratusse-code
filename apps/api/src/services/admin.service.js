const User = require("../models/User");
const Note = require("../models/Note");
const Comment = require("../models/Comment");
const LibraryRecommendation = require("../models/LibraryRecommendation");
const LibraryComment = require("../models/LibraryComment");
const CreatorRequest = require("../models/CreatorRequest");
const AdminActionLog = require("../models/AdminActionLog");

const { createAdminActionLog } = require("./adminActionLog.service");

const getAllUsers = async () => {
  const users = await User.find()
    .select("-passwordHash")
    .populate("creatorApproval.approvedBy", "pseudo role")
    .sort({ createdAt: -1 });

  return users;
};

const updateUserRole = async ({ userId, role, adminId, comment = "" }) => {
  const allowedRoles = ["observer", "creator", "admin"];

  if (!allowedRoles.includes(role)) {
    throw new Error("INVALID_ROLE");
  }

  if (userId.toString() === adminId.toString()) {
    throw new Error("CANNOT_UPDATE_OWN_ROLE");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  if (user.role === "admin" && role !== "admin") {
    const activeAdminsCount = await User.countDocuments({
      role: "admin",
      isBanned: false,
      isDeleted: false,
    });

    if (activeAdminsCount <= 1) {
      throw new Error("LAST_ADMIN_PROTECTED");
    }
  }

  user.role = role;

  if (role === "creator") {
    user.isApprovedCreator = true;

    user.creatorApproval = {
      isApproved: true,
      approvedBy: adminId,
      approvedAt: new Date(),
    };
  }

  if (role === "observer") {
    user.isApprovedCreator = false;

    user.creatorApproval = {
      isApproved: false,
      approvedBy: null,
      approvedAt: null,
    };
  }

  if (role === "admin") {
    user.isApprovedCreator = false;

    user.creatorApproval = {
      isApproved: false,
      approvedBy: null,
      approvedAt: null,
    };
  }

  await user.save();

  await createAdminActionLog({
    admin: adminId,
    targetUser: user._id,

    actionType: "ROLE_CHANGED",
    comment,

    metadata: {
      newRole: role,
    },
  });

  return user.populate("creatorApproval.approvedBy", "pseudo role");
};

const toggleUserBan = async ({ userId, isBanned, adminId, comment = "" }) => {
  if (userId.toString() === adminId.toString()) {
    throw new Error("CANNOT_UPDATE_OWN_BAN");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  if (user.role === "admin" && isBanned && !user.isBanned) {
    const activeAdminsCount = await User.countDocuments({
      role: "admin",
      isBanned: false,
      isDeleted: false,
    });

    if (activeAdminsCount <= 1) {
      throw new Error("LAST_ADMIN_PROTECTED");
    }
  }

  user.isBanned = isBanned;

  await user.save();

  await createAdminActionLog({
    admin: adminId,
    targetUser: user._id,

    actionType: isBanned ? "USER_BANNED" : "USER_UNBANNED",
    comment,
  });

  return user;
};

const approveCreator = async (userId, isApprovedCreator, adminId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  user.role = "creator";
  user.isApprovedCreator = isApprovedCreator;

  user.creatorApproval = {
    isApproved: isApprovedCreator,
    approvedBy: isApprovedCreator ? adminId : null,
    approvedAt: isApprovedCreator ? new Date() : null,
  };

  await user.save();

  return user.populate("creatorApproval.approvedBy", "pseudo role");
};

const getAdminDashboardStats = async () => {
  const [
    usersCount,
    deletedUsersCount,
    creatorsCount,

    notesCount,
    publishedNotesCount,

    booksCount,
    publishedBooksCount,

    commentsCount,
    libraryCommentsCount,

    actionsCount,

    pendingCreatorRequests,
    approvedCreatorRequests,
    rejectedCreatorRequests,
  ] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ isDeleted: true }),
    User.countDocuments({
      role: "creator",
      isDeleted: false,
    }),

    Note.countDocuments({ isDeleted: false }),
    Note.countDocuments({
      isDeleted: false,
      status: "published",
    }),

    LibraryRecommendation.countDocuments({ isDeleted: false }),
    LibraryRecommendation.countDocuments({
      isDeleted: false,
      status: "published",
    }),

    Comment.countDocuments({ isDeleted: false }),
    LibraryComment.countDocuments({ isDeleted: false }),

    AdminActionLog.countDocuments(),

    CreatorRequest.countDocuments({ status: "pending" }),
    CreatorRequest.countDocuments({ status: "approved" }),
    CreatorRequest.countDocuments({ status: "rejected" }),
  ]);

  return {
    usersCount,
    deletedUsersCount,
    creatorsCount,

    notesCount,
    publishedNotesCount,

    booksCount,
    publishedBooksCount,

    commentsCount,
    noteCommentsCount: commentsCount,
    libraryCommentsCount,

    actionsCount,

    pendingCreatorRequestsCount: pendingCreatorRequests,

    creatorRequests: {
      pending: pendingCreatorRequests,
      approved: approvedCreatorRequests,
      rejected: rejectedCreatorRequests,
    },
  };
};

const getUserByIdForAdmin = async (userId) => {
  const user = await User.findById(userId)
    .select("-passwordHash -emailVerificationToken -passwordResetToken")
    .populate("creatorApproval.approvedBy", "pseudo role");

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  return user;
};

const getUserActivitySummary = async (userId) => {
  const [notesCount, booksCount, noteCommentsCount, libraryCommentsCount] =
    await Promise.all([
      Note.countDocuments({ author: userId }),
      LibraryRecommendation.countDocuments({ recommendedBy: userId }),
      Comment.countDocuments({ author: userId }),
      LibraryComment.countDocuments({ author: userId }),
    ]);

  return {
    notesCount,
    booksCount,
    noteCommentsCount,
    libraryCommentsCount,
  };
};

const getUserNotes = async (userId) => {
  return Note.find({ author: userId }).sort({ createdAt: -1 });
};

const getUserBooks = async (userId) => {
  return LibraryRecommendation.find({ recommendedBy: userId }).sort({
    createdAt: -1,
  });
};

const getUserComments = async (userId) => {
  return Comment.find({ author: userId })
    .populate("note", "title slug status isDeleted")
    .sort({ createdAt: -1 });
};

const getUserLibraryComments = async (userId) => {
  return LibraryComment.find({ author: userId })
    .populate("book", "title author status isDeleted")
    .sort({ createdAt: -1 });
};

module.exports = {
  getAllUsers,
  updateUserRole,
  toggleUserBan,
  approveCreator,
  getAdminDashboardStats,
  getUserByIdForAdmin,
  getUserActivitySummary,
  getUserNotes,
  getUserBooks,
  getUserComments,
  getUserLibraryComments,
};
