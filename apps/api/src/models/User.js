const mongoose = require("mongoose");

const formatPseudo = (pseudo) => {
  if (!pseudo) return pseudo;

  const cleanedPseudo = pseudo.trim();

  return cleanedPseudo.charAt(0).toUpperCase() + cleanedPseudo.slice(1);
};

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    passwordHash: {
      type: String,
      required: true,
    },

    pseudo: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
      set: formatPseudo,
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    emailVerifiedAt: {
      type: Date,
      default: null,
    },

    emailVerificationToken: {
      type: String,
      default: null,
    },

    emailVerificationExpiresAt: {
      type: Date,
      default: null,
    },

    passwordResetToken: {
      type: String,
      default: null,
    },

    passwordResetExpiresAt: {
      type: Date,
      default: null,
    },

    role: {
      type: String,
      enum: ["observer", "creator", "admin"],
      default: "observer",
    },

    isApprovedCreator: {
      type: Boolean,
      default: false,
    },

    creatorApproval: {
      isApproved: {
        type: Boolean,
        default: false,
      },
      approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
      },
      approvedAt: {
        type: Date,
        default: null,
      },
    },

    isBanned: {
      type: Boolean,
      default: false,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: {
      type: Date,
      default: null,
    },

    deletionComment: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: "",
    },

    hasAcceptedCharter: {
      type: Boolean,
      required: true,
      default: false,
    },

    charterAcceptedAt: {
      type: Date,
      default: null,
    },

    hasAcceptedTerms: {
      type: Boolean,
      required: true,
      default: false,
    },

    termsAcceptedAt: {
      type: Date,
      default: null,
    },

    hasAcceptedPrivacy: {
      type: Boolean,
      required: true,
      default: false,
    },

    privacyAcceptedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.index(
  { pseudo: 1 },
  {
    unique: true,
    collation: {
      locale: "fr",
      strength: 2,
    },
  },
);

module.exports = mongoose.model("User", userSchema);
