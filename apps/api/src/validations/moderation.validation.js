const { z } = require("zod");

const moderateContentSchema = z.object({
  reason: z
    .enum([
      "charter_violation",
      "other",
    ])
    .default("charter_violation"),

  adminComment: z
    .string()
    .trim()
    .max(2000)
    .optional()
    .default(
      "Le contenu ne respecte pas la charte de Stratusse."
    ),
});

module.exports = {
  moderateContentSchema,
};