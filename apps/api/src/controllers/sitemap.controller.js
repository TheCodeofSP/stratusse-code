const { generateSitemap } = require("../services/sitemap.service");

const getSitemap = async (req, res, next) => {
  try {
    const sitemap = await generateSitemap();

    res.set({
      "Cache-Control":
        "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
      "Content-Type": "application/xml; charset=utf-8",
    });

    return res.status(200).send(sitemap);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getSitemap,
};
