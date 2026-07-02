const mongoose = require("mongoose");

const adminActionLogSchema = new mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    targetUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    actionType: {
      type: String,
      required: true,
      enum: [
        "ROLE_CHANGED",
        "USER_BANNED",
        "USER_UNBANNED",
        "CREATOR_APPROVED",
        "CREATOR_REJECTED",
        "ARTICLE_DELETED",
        "BOOK_DELETED",
        "COMMENT_DELETED",
        "BOOK_COMMENT_DELETED",
      ],
    },

    comment: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: "",
    },

    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "AdminActionLog",
  adminActionLogSchema
);