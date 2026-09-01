function stratusseEmailLayout({
  title,
  paragraphs = [],
  buttonLabel,
  buttonUrl,
  secondaryText,
}) {
  const frontendUrl = (
    process.env.FRONTEND_URL || "https://www.stratusse.fr"
  ).replace(/\/$/, "");
  const logoUrl = `${frontendUrl}/images/brand/LogoStratusse.png`;

  const paragraphsHtml = paragraphs
    .map((paragraph) => `<p>${paragraph}</p>`)
    .join("");

  const buttonHtml =
    buttonLabel && buttonUrl
      ? `
        <div class="button-wrapper">
          <a href="${buttonUrl}" class="button">${buttonLabel}</a>
        </div>

        <p class="fallback-link">
          Si le bouton ne fonctionne pas, copie ce lien dans ton navigateur :<br />
          <a href="${buttonUrl}">${buttonUrl}</a>
        </p>
      `
      : "";

  const secondaryHtml = secondaryText
    ? `<p class="secondary">${secondaryText}</p>`
    : "";

  const html = `
    <!doctype html>
    <html lang="fr">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <style>
          body {
            margin: 0;
            padding: 0;
            background: #f7f1e7;
            color: #211c17;
            font-family: Inter, sans-serif;
          }

          .wrapper {
            width: 100%;
            padding: 32px 16px;
            background: #f7f1e7;
          }

          .card {
            max-width: 620px;
            margin: 0 auto;
            background: #fffaf1;
            border: 1px solid rgba(40, 80, 71, 0.14);
            border-radius: 12px;
            overflow: hidden;
          }

          .header {
            padding: 32px 28px;
            text-align: center;
            background: #285047;
            color: #fffaf1;
          }

          .brand {
            margin: 0;
          }

          .brand-logo {
            display: block;
            width: 190px;
            max-width: 72%;
            height: auto;
            margin: 0 auto;
          }

          .tagline {
            margin: 12px 0 0;
            color: white;
            font-size: 14px;
            line-height: 1.35;
            font-style: italic;
          }

          .content {
            padding: 36px 28px;
          }

          h1 {
            margin: 0 0 22px;
            color: #285047;
            font-family: Cormorant Garamond, serif;
            font-size: clamp(3rem, 8vw, 6rem);
            line-height: 1.05;
            letter-spacing: -0.03em;
          }

          p {
            margin: 0 0 16px;
            color: #211c17;
            font-size: 16px;
            line-height: 1.75;
          }

          .button-wrapper {
            margin: 30px 0;
            text-align: center;
          }

          .button {
            display: inline-block;
            padding: 14px 22px;
            border-radius: 8px;
            background: #285047;
            color: #fffaf1 !important;
            font-weight: 700;
            text-decoration: none;
          }

          .fallback-link {
            color: #874a11;
            font-size: 13px;
            line-height: 1.6;
            word-break: break-word;
          }

          .fallback-link a {
            color: #9c7a3d;
          }

          .secondary {
            margin-top: 24px;
            color: #874a11;
            font-size: 14px;
          }

          .footer {
            padding: 26px 28px;
            border-top: 1px solid rgba(40, 80, 71, 0.1);
            text-align: center;
          }

          .footer p {
            margin: 0;
            color: #874a11;
            font-size: 13px;
            line-height: 1.7;
          }
        </style>
      </head>

      <body>
        <div class="wrapper">
          <div class="card">
            <header class="header">
              <p class="brand">
                <img
                  class="brand-logo"
                  src="${logoUrl}"
                  width="190"
                  alt="Stratusse"
                />
              </p>
              <p class="tagline">
                Une Safe Place où les pensées peuvent respirer.
              </p>
            </header>

            <main class="content">
              <h1>${title}</h1>
              ${paragraphsHtml}
              ${buttonHtml}
              ${secondaryHtml}
            </main>

            <footer class="footer">
              <p>
                Merci de contribuer à faire vivre une Safe Place où les pensées peuvent respirer.
                <br />
                — Stratusse
              </p>
            </footer>
          </div>
        </div>
      </body>
    </html>
  `;

  const text = [
    title,
    "",
    ...paragraphs,
    buttonUrl ? `Lien : ${buttonUrl}` : "",
    secondaryText || "",
    "",
    "— Stratusse",
  ]
    .filter(Boolean)
    .join("\n");

  return {
    html,
    text,
  };
}

module.exports = {
  stratusseEmailLayout,
};
