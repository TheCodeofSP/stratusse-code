const { z } = require("zod");

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce.number().int().positive().default(5050),
  MONGO_URI: z.string().min(1, "MONGO_URI est obligatoire."),
  JWT_SECRET: z
    .string()
    .min(64, "JWT_SECRET doit contenir au moins 64 caractères."),
  FRONTEND_URL: z.string().url("FRONTEND_URL doit être une URL valide."),
  RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY est obligatoire."),
  EMAIL_FROM: z.string().min(1, "EMAIL_FROM est obligatoire."),
  CONTACT_RECEIVER_EMAIL: z
    .string()
    .email("CONTACT_RECEIVER_EMAIL doit être une adresse valide."),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  const details = parsedEnv.error.issues
    .map((issue) => `- ${issue.path.join(".")} : ${issue.message}`)
    .join("\n");

  throw new Error(`Variables d’environnement invalides :\n${details}`);
}

module.exports = parsedEnv.data;
