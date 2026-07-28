const { z } = require("zod");

const contactSchema = z
  .object({
    email: z.string().trim().email("Adresse email invalide.").max(254),
    message: z
      .string()
      .trim()
      .min(10, "Le message doit contenir au moins 10 caractères.")
      .max(3000, "Le message ne peut pas dépasser 3 000 caractères."),
    captchaToken: z.string().min(1, "Vérification de sécurité manquante."),
    website: z.string().max(0).optional().or(z.literal("")),
    formStartedAt: z.coerce.number().int().positive(),
  })
  .strict();

module.exports = {
  contactSchema,
};
