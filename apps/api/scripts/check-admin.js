require("dotenv").config();

const mongoose = require("mongoose");
const User = require("../src/models/User");

const ADMIN_EMAIL = "gardien@stratusse.fr";

const checkAdmin = async () => {
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI est obligatoire.");

  await mongoose.connect(process.env.MONGO_URI);

  const [admin, activeAdminsCount] = await Promise.all([
    User.findOne({ email: ADMIN_EMAIL }).select(
      "email pseudo role isEmailVerified isBanned isDeleted",
    ),
    User.countDocuments({ role: "admin", isBanned: false, isDeleted: false }),
  ]);

  if (!admin) throw new Error("Compte Gardien introuvable.");

  const valid =
    admin.pseudo === "La Gardienne de Stratusse" &&
    admin.role === "admin" &&
    admin.isEmailVerified &&
    !admin.isBanned &&
    !admin.isDeleted;

  console.log({
    email: admin.email,
    pseudo: admin.pseudo,
    role: admin.role,
    emailVerifie: admin.isEmailVerified,
    compteActif: !admin.isBanned && !admin.isDeleted,
    gardiensActifs: activeAdminsCount,
  });

  if (!valid) throw new Error("Le compte Gardien existe mais sa configuration est invalide.");
};

checkAdmin()
  .catch((error) => {
    console.error("Contrôle en échec :", error.message);
    process.exitCode = 1;
  })
  .finally(async () => mongoose.disconnect());
