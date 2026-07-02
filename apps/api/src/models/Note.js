const mongoose = require("mongoose");

const { CONTENT_CATEGORIES } = require("../constants/contentCategories");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    excerpt: {
      type: String,
      required: true,
      trim: true,
      maxlength: 280,
    },

    content: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: CONTENT_CATEGORIES,
      required: true,
    },

    cloudColor: {
      type: String,
      required: true,
      default: "#1f1f1f",
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },

    hasBeenPublished: {
      type: Boolean,
      default: false,
    },

    firstPublishedAt: {
      type: Date,
      default: null,
    },

    lastPublishedAt: {
      type: Date,
      default: null,
    },

    hasBeenModifiedAfterPublication: {
      type: Boolean,
      default: false,
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

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Note", noteSchema);
