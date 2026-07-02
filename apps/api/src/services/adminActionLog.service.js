const AdminActionLog = require("../models/AdminActionLog");

const createAdminActionLog = async ({
  admin,
  targetUser = null,
  actionType,
  comment = "",
  metadata = {},
}) => {
  const log = await AdminActionLog.create({
    admin,
    targetUser,
    actionType,
    comment,
    metadata,
  });

  return log;
};

const getAdminActionLogs = async () => {
  const logs = await AdminActionLog.find()
    .populate("admin", "pseudo email role")
    .populate("targetUser", "pseudo email role")
    .sort({ createdAt: -1 });

  return logs;
};

const getAdminActionLogsByUser = async (userId) => {
  const logs = await AdminActionLog.find({
    targetUser: userId,
  })
    .populate("admin", "pseudo email role")
    .populate("targetUser", "pseudo email role")
    .sort({ createdAt: -1 });

  return logs;
};

module.exports = {
  createAdminActionLog,
  getAdminActionLogs,
  getAdminActionLogsByUser,
};