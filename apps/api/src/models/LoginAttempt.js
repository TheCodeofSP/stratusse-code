const mongoose = require("mongoose");

const loginAttemptSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    attempts: {
      type: Number,
      required: true,
      default: 0,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: {
        expires: 0,
      },
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model("LoginAttempt", loginAttemptSchema);
