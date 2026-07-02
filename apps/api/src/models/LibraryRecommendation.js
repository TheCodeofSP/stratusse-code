const mongoose = require("mongoose");
const { CONTENT_CATEGORIES } = require("../constants/contentCategories");

const libraryRecommendationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 160,
    },

    author: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    normalizedTitle: {
      type: String,
      required: true,
      trim: true,
    },

    normalizedAuthor: {
      type: String,
      required: true,
      trim: true,
    },

    coverImageUrl: {
      type: String,
      trim: true,
      default: "",
    },

    subject: {
      type: String,
      required: true,
      trim: true,
      maxlength: 160,
    },

    universe: {
      type: String,
      enum: CONTENT_CATEGORIES,
      required: true,
    },

    opinion: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: "",
    },

    whyRecommend: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: "",
    },

    startedBecause: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: "",
    },

    readingExpectation: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: "",
    },

    abandonedReason: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: "",
    },

    disappointment: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: "",
    },

    readingStatus: {
      type: String,
      enum: ["to_read", "reading", "finished", "abandoned"],
      default: "finished",
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

    recommendedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

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

libraryRecommendationSchema.index(
  { normalizedTitle: 1, normalizedAuthor: 1 },
  { unique: true },
);

module.exports = mongoose.model(
  "LibraryRecommendation",
  libraryRecommendationSchema,
);
