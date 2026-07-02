const mongoose = require("mongoose");

const libraryCommentSchema = new mongoose.Schema(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LibraryRecommendation",
      required: true,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },

    likedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    isDeleted: {
      type: Boolean,
      default: false,
    },

    moderation: {
      reason: {
        type: String,
        enum: ["charter_violation", "other"],
        default: null,
      },
      publicMessage: {
        type: String,
        default: "",
      },
      adminComment: {
        type: String,
        trim: true,
        maxlength: 2000,
        default: "",
      },
      moderatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
      },
      moderatedAt: {
        type: Date,
        default: null,
      },
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("LibraryComment", libraryCommentSchema);
