const Note = require("../models/Note");
const LibraryRecommendation = require("../models/LibraryRecommendation");
const User = require("../models/User");

const SITE_URL = "https://www.stratusse.fr";

const STATIC_PATHS = [
  "/",
  "/notes",
  "/library",
  "/about",
  "/care",
  "/charter",
  "/observer-to-creator",
  "/contact",
];

const escapeXml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

const formatLastModified = (date) => {
  if (!date) return null;

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return null;

  return parsedDate.toISOString();
};

const createUrlEntry = ({ path, lastModified }) => {
  const location = escapeXml(`${SITE_URL}${path}`);
  const formattedDate = formatLastModified(lastModified);
  const lastModifiedTag = formattedDate
    ? `\n    <lastmod>${formattedDate}</lastmod>`
    : "";

  return `  <url>
    <loc>${location}</loc>${lastModifiedTag}
  </url>`;
};

const buildSitemapXml = (entries) => {
  const urls = entries.map(createUrlEntry).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
};

const getPublicCreatorIds = async () => {
  const [noteAuthorIds, bookAuthorIds] = await Promise.all([
    Note.distinct("author", {
      status: "published",
      isDeleted: false,
    }),
    LibraryRecommendation.distinct("recommendedBy", {
      status: "published",
      isDeleted: false,
    }),
  ]);

  return [...new Set([...noteAuthorIds, ...bookAuthorIds].map(String))];
};

const generateSitemap = async () => {
  const [notes, books, publicCreatorIds] = await Promise.all([
    Note.find({
      status: "published",
      isDeleted: false,
    })
      .select("slug lastPublishedAt updatedAt")
      .lean(),
    LibraryRecommendation.find({
      status: "published",
      isDeleted: false,
    })
      .select("_id lastPublishedAt updatedAt")
      .lean(),
    getPublicCreatorIds(),
  ]);

  const creators = publicCreatorIds.length
    ? await User.find({
        _id: { $in: publicCreatorIds },
        role: { $in: ["creator", "admin"] },
        isDeleted: false,
        isBanned: false,
      })
        .select("pseudo updatedAt")
        .lean()
    : [];

  const entries = [
    ...STATIC_PATHS.map((path) => ({ path })),
    ...notes.map((note) => ({
      path: `/notes/${encodeURIComponent(note.slug)}`,
      lastModified: note.lastPublishedAt || note.updatedAt,
    })),
    ...books.map((book) => ({
      path: `/library/${book._id}`,
      lastModified: book.lastPublishedAt || book.updatedAt,
    })),
    ...creators.map((creator) => ({
      path: `/creator/${encodeURIComponent(creator.pseudo)}`,
      lastModified: creator.updatedAt,
    })),
  ];

  return buildSitemapXml(entries);
};

module.exports = {
  STATIC_PATHS,
  buildSitemapXml,
  escapeXml,
  generateSitemap,
};
