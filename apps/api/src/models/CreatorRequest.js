const mongoose = require("mongoose");

const creatorRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    motivation: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },

    writingIntent: {
      notes: {
        type: Boolean,
        default: false,
      },
      books: {
        type: Boolean,
        default: false,
      },
    },

    firstContribution: {
      type: {
        type: String,
        enum: ["note", "book"],
        required: true,
      },
      title: {
        type: String,
        trim: true,
        maxlength: 160,
        default: "",
      },
      content: {
        type: String,
        required: true,
        trim: true,
        maxlength: 5000,
      },
    },

    improvementIdeas: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: "",
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    reviewedAt: {
      type: Date,
      default: null,
    },

    rejectionReason: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("CreatorRequest", creatorRequestSchema);
