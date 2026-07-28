const crypto = require("crypto");

const hashRequestKey = (...values) =>
  crypto
    .createHash("sha256")
    .update(values.filter(Boolean).join("|"))
    .digest("hex");

const getClientIp = (req) => req.ip || req.socket?.remoteAddress || "unknown";

module.exports = {
  getClientIp,
  hashRequestKey,
};
