const { z } = require("zod");

const createCreatorRequestSchema = z.object({
  motivation: z.string().trim().min(10).max(2000),

  writingIntent: z
    .object({
      notes: z.boolean().default(false),
      books: z.boolean().default(false),
    })
    .refine((value) => value.notes || value.books, {
      message: "Vous devez choisir au moins une intention d’écriture.",
    }),

  firstContribution: z.object({
    type: z.enum(["note", "book"]),
    title: z.string().trim().max(160).optional().default(""),
    content: z.string().trim().min(10).max(5000),
  }),

  improvementIdeas: z.string().trim().max(2000).optional().default(""),
});

const rejectCreatorRequestSchema = z.object({
  rejectionReason: z.string().trim().max(1000).optional().default(""),
  comment: z.string().trim().max(2000).optional().default(""),
});

module.exports = {
  createCreatorRequestSchema,
  rejectCreatorRequestSchema,
};
