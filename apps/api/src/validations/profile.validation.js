const { z } = require("zod");

const updatePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Mot de passe actuel obligatoire."),
  newPassword: z
    .string()
    .min(8, "Le nouveau mot de passe doit contenir au moins 8 caractères."),
});

const deleteAccountSchema = z.object({
  deletionComment: z
    .string()
    .trim()
    .max(1000, "Le commentaire ne peut pas dépasser 1000 caractères.")
    .optional()
    .default(""),
});

module.exports = {
  updatePasswordSchema,
  deleteAccountSchema,
};