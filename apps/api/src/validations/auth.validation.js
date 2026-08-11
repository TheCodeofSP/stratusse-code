const { z } = require("zod");

const passwordSchema = z
  .string()
  .min(8, "Le mot de passe doit contenir au moins 8 caractères.")
  .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule.")
  .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre.")
  .regex(
    /[^A-Za-z0-9]/,
    "Le mot de passe doit contenir au moins un caractère spécial.",
  );

const registerSchema = z.object({
  email: z.string().email("Email invalide."),
  password: passwordSchema,
  pseudo: z
    .string()
    .trim()
    .min(3, "Le pseudo doit contenir au moins 3 caractères.")
    .max(30, "Le pseudo ne peut pas dépasser 30 caractères."),
  hasAcceptedCharter: z.literal(true, {
    message: "Vous devez accepter la charte de bonne conduite.",
  }),
  hasAcceptedTerms: z.literal(true, {
    message: "Vous devez accepter les Conditions Générales d’Utilisation.",
  }),
  hasAcceptedPrivacy: z.literal(true, {
    message:
      "Vous devez prendre connaissance de la Politique de confidentialité.",
  }),
});

const loginSchema = z.object({
  email: z.string().email("Email invalide."),
  password: z.string().min(1, "Mot de passe obligatoire."),
  captchaToken: z.string().min(1).optional(),
});

const resendVerificationEmailSchema = z.object({
  email: z.string().email("Adresse email invalide."),
});

const forgotPasswordSchema = z.object({
  email: z.string().email("Adresse email invalide."),
  pseudo: z
    .string()
    .trim()
    .min(3, "Le pseudo doit contenir au moins 3 caractères.")
    .max(30, "Le pseudo ne peut pas dépasser 30 caractères."),
});

const resetPasswordSchema = z.object({
  token: z.string().min(1, "Token obligatoire."),
  password: passwordSchema,
});

module.exports = {
  passwordSchema,
  registerSchema,
  loginSchema,
  resendVerificationEmailSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
};
