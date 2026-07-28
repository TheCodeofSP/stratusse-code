const mongoose = require("mongoose");

const requestLimitSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    hits: {
      type: Number,
      required: true,
      default: 0,
    },
    resetAt: {
      type: Date,
      required: true,
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

module.exports = mongoose.model("RequestLimit", requestLimitSchema);
