const { z } = require("zod");
const { CONTENT_CATEGORIES } = require("../constants/contentCategories");

const noteStatusSchema = z.enum(["draft", "published"]);

const noteCategorySchema = z.enum(CONTENT_CATEGORIES);

const createNoteSchema = z.object({
  title: z.string().trim().min(3).max(120),
  excerpt: z.string().trim().min(10).max(280),
  content: z.string().trim().min(10),
  category: noteCategorySchema,
  cloudColor: z.string().trim().default("#1f1f1f"),
  status: noteStatusSchema.default("draft"),
});

const updateNoteSchema = z
  .object({
    title: z.string().trim().min(3).max(120).optional(),
    excerpt: z.string().trim().min(10).max(280).optional(),
    content: z.string().trim().min(10).optional(),
    category: noteCategorySchema.optional(),
    cloudColor: z.string().trim().optional(),
    status: noteStatusSchema.optional(),
  })
  .strict();

module.exports = {
  createNoteSchema,
  updateNoteSchema,
};