const assert = require("node:assert/strict");
const { describe, it } = require("node:test");

const {
  STATIC_PATHS,
  buildSitemapXml,
  escapeXml,
} = require("../src/services/sitemap.service");

describe("génération du sitemap", () => {
  it("contient uniquement les pages statiques publiques retenues", () => {
    assert.deepEqual(STATIC_PATHS, [
      "/",
      "/notes",
      "/library",
      "/about",
      "/care",
      "/charter",
      "/observer-to-creator",
      "/contact",
    ]);

    assert.equal(STATIC_PATHS.includes("/login"), false);
    assert.equal(STATIC_PATHS.includes("/profile"), false);
    assert.equal(STATIC_PATHS.includes("/admin"), false);
  });

  it("produit un document XML avec une date ISO valide", () => {
    const sitemap = buildSitemapXml([
      {
        path: "/notes/une-note",
        lastModified: new Date("2026-07-28T12:00:00.000Z"),
      },
    ]);

    assert.match(sitemap, /^<\?xml version="1.0" encoding="UTF-8"\?>/);
    assert.match(
      sitemap,
      /<loc>https:\/\/www\.stratusse\.fr\/notes\/une-note<\/loc>/,
    );
    assert.match(
      sitemap,
      /<lastmod>2026-07-28T12:00:00\.000Z<\/lastmod>/,
    );
  });

  it("échappe les caractères réservés du XML", () => {
    assert.equal(
      escapeXml(`/creator/une&voix<"'>`),
      "/creator/une&amp;voix&lt;&quot;&apos;&gt;",
    );
  });

  it("ignore une date invalide", () => {
    const sitemap = buildSitemapXml([
      {
        path: "/notes/une-note",
        lastModified: "date-invalide",
      },
    ]);

    assert.equal(sitemap.includes("<lastmod>"), false);
  });
});
