const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");

const createEmailVerificationToken = () => {
  const rawToken = crypto.randomBytes(32).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(rawToken)
    .digest("hex");

  return { rawToken, hashedToken };
};

const getEmailVerificationExpiration = () => {
  return new Date(Date.now() + 1000 * 60 * 60 * 24); // 24h
};

const registerUser = async ({
  email,
  password,
  pseudo,
  hasAcceptedCharter,
}) => {
  const existingEmail = await User.findOne({ email });

  if (existingEmail) {
    throw new Error("EMAIL_ALREADY_EXISTS");
  }

  const existingPseudo = await User.findOne({ pseudo }).collation({
    locale: "fr",
    strength: 2,
  });

  if (existingPseudo) {
    throw new Error("PSEUDO_ALREADY_EXISTS");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const { rawToken, hashedToken } = createEmailVerificationToken();

  const user = await User.create({
    email,
    passwordHash,
    pseudo,
    role: "observer",
    isApprovedCreator: false,
    isBanned: false,
    hasAcceptedCharter,
    charterAcceptedAt: new Date(),
    isEmailVerified: false,
    emailVerifiedAt: null,
    emailVerificationToken: hashedToken,
    emailVerificationExpiresAt: getEmailVerificationExpiration(),
  });

  return {
    user: {
      id: user._id,
      email: user.email,
      pseudo: user.pseudo,
      role: user.role,
    },
    emailVerificationToken: rawToken,
  };
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    throw new Error("INVALID_CREDENTIALS");
  }

  if (user.isBanned) {
    throw new Error("USER_BANNED");
  }

  if (!user.isEmailVerified) {
    throw new Error("EMAIL_NOT_VERIFIED");
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      pseudo: user.pseudo,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
    },
  };
};

const verifyEmail = async (token) => {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationExpiresAt: { $gt: new Date() },
  });

  if (!user) {
    throw new Error("INVALID_OR_EXPIRED_TOKEN");
  }

  user.isEmailVerified = true;
  user.emailVerifiedAt = new Date();
  user.emailVerificationToken = null;
  user.emailVerificationExpiresAt = null;

  await user.save();

  const jwtToken = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  return {
    token: jwtToken,
    user: {
      _id: user._id,
      pseudo: user.pseudo,
      email: user.email,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
      hasAcceptedCharter: user.hasAcceptedCharter,
    },
  };
};

const resendVerificationEmail = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    return;
  }

  if (user.isEmailVerified) {
    return;
  }

  const { rawToken, hashedToken } = createEmailVerificationToken();

  user.emailVerificationToken = hashedToken;
  user.emailVerificationExpiresAt = getEmailVerificationExpiration();

  await user.save();

  return rawToken;
};

const createPasswordResetToken = () => {
  const rawToken = crypto.randomBytes(32).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(rawToken)
    .digest("hex");

  return { rawToken, hashedToken };
};

const getPasswordResetExpiration = () => {
  return new Date(Date.now() + 1000 * 60 * 30); // 30 minutes
};

const forgotPassword = async (email) => {
  const user = await User.findOne({ email });

  if (!user || user.isDeleted || user.isBanned) {
    return null;
  }

  const { rawToken, hashedToken } = createPasswordResetToken();

  user.passwordResetToken = hashedToken;
  user.passwordResetExpiresAt = getPasswordResetExpiration();

  await user.save();

  return rawToken;
};

const resetPassword = async ({ token, password }) => {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpiresAt: { $gt: new Date() },
  });

  if (!user || user.isDeleted || user.isBanned) {
    throw new Error("INVALID_OR_EXPIRED_TOKEN");
  }

  user.passwordHash = await bcrypt.hash(password, 10);
  user.passwordResetToken = null;
  user.passwordResetExpiresAt = null;

  await user.save();

  return true;
};

module.exports = {
  registerUser,
  loginUser,
  verifyEmail,
  resendVerificationEmail,
  forgotPassword,
  resetPassword,
};
