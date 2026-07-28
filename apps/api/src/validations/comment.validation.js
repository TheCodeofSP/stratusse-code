const { z } = require("zod");

const createCommentSchema = z
  .object({
    content: z
      .string()
      .trim()
      .min(1, "Le commentaire ne peut pas être vide.")
      .max(1000, "Le commentaire ne peut pas dépasser 1 000 caractères."),
  })
  .strict();

module.exports = {
  createCommentSchema,
};
