const { z } = require("zod");
const { CONTENT_CATEGORIES } = require("../constants/contentCategories");

const readingStatusSchema = z.enum(["reading", "finished", "abandoned"]);

const publicationStatusSchema = z.enum(["draft", "published"]);

const bookUniverseSchema = z.enum(CONTENT_CATEGORIES);

const baseBookSchema = z.object({
  title: z.string().trim().min(1).max(160),
  author: z.string().trim().min(1).max(120),
  coverImageUrl: z.string().trim().url().optional().or(z.literal("")),
  subject: z.string().trim().min(3).max(160),
  universe: bookUniverseSchema,

  opinion: z.string().trim().max(2000).optional().default(""),
  whyRecommend: z.string().trim().max(1000).optional().default(""),

  startedBecause: z.string().trim().max(1000).optional().default(""),
  readingExpectation: z.string().trim().max(1000).optional().default(""),

  abandonedReason: z.string().trim().max(1000).optional().default(""),
  disappointment: z.string().trim().max(1000).optional().default(""),

  readingStatus: readingStatusSchema.default("finished"),
  status: publicationStatusSchema.default("draft"),
});

const createBookSchema = baseBookSchema.superRefine((data, ctx) => {
  if (data.status !== "published") {
    return;
  }

  if (data.readingStatus === "reading") {
    if (!data.startedBecause) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["startedBecause"],
        message: "Explique pourquoi tu as commencé ce livre.",
      });
    }

    if (!data.readingExpectation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["readingExpectation"],
        message: "Explique ce que tu attends de cette lecture.",
      });
    }
  }

  if (data.readingStatus === "finished") {
    if (!data.opinion) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["opinion"],
        message: "Ton regard sur le livre est obligatoire.",
      });
    }

    if (!data.whyRecommend) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["whyRecommend"],
        message: "Explique pourquoi tu recommandes ce livre.",
      });
    }
  }

  if (data.readingStatus === "abandoned") {
    if (!data.abandonedReason) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["abandonedReason"],
        message: "Explique pourquoi tu as arrêté cette lecture.",
      });
    }

    if (!data.disappointment) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["disappointment"],
        message: "Explique ce qui t’a déçu.",
      });
    }
  }
});

const updateBookSchema = baseBookSchema.partial().strict();

module.exports = {
  createBookSchema,
  updateBookSchema,
};
