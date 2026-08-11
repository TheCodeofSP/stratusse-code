require("dotenv").config();

const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = require("../src/models/User");
const AdminActionLog = require("../src/models/AdminActionLog");
const { passwordSchema } = require("../src/validations/auth.validation");
const { readHiddenValue } = require("./admin-terminal");

const ADMIN_EMAIL = "gardien@stratusse.fr";
const ADMIN_PSEUDO = "La Gardienne de Stratusse";

const createAdmin = async () => {
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI est obligatoire.");

  const password = await readHiddenValue("Mot de passe du Gardien : ");
  const confirmation = await readHiddenValue("Confirmez le mot de passe : ");

  if (password !== confirmation) throw new Error("Les mots de passe diffèrent.");

  const validation = passwordSchema.safeParse(password);
  if (!validation.success) throw new Error(validation.error.issues[0].message);

  await mongoose.connect(process.env.MONGO_URI);

  const existingEmail = await User.findOne({ email: ADMIN_EMAIL });
  const existingPseudo = await User.findOne({ pseudo: ADMIN_PSEUDO }).collation({
    locale: "fr",
    strength: 2,
  });

  if (existingEmail || existingPseudo) {
    if (
      existingEmail &&
      existingPseudo &&
      existingEmail._id.equals(existingPseudo._id) &&
      existingEmail.role === "admin"
    ) {
      console.log("Le compte Gardien existe déjà. Aucune modification effectuée.");
      return;
    }

    throw new Error("L’adresse email ou le pseudo est déjà utilisé.");
  }

  const now = new Date();
  const admin = await User.create({
    email: ADMIN_EMAIL,
    pseudo: ADMIN_PSEUDO,
    passwordHash: await bcrypt.hash(password, 12),
    role: "admin",
    isEmailVerified: true,
    emailVerifiedAt: now,
    hasAcceptedCharter: true,
    charterAcceptedAt: now,
    hasAcceptedTerms: true,
    termsAcceptedAt: now,
    hasAcceptedPrivacy: true,
    privacyAcceptedAt: now,
  });

  await AdminActionLog.create({
    admin: admin._id,
    targetUser: admin._id,
    actionType: "ADMIN_CREATED",
    comment: "Création sécurisée du premier compte Gardien.",
  });

  console.log(`Compte créé : ${admin.pseudo} <${admin.email}>`);
};

createAdmin()
  .catch((error) => {
    console.error("Échec de la création :", error.message);
    process.exitCode = 1;
  })
  .finally(async () => mongoose.disconnect());
