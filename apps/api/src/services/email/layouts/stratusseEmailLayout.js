function stratusseEmailLayout({
  title,
  paragraphs = [],
  buttonLabel,
  buttonUrl,
  secondaryText,
}) {
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
            font-family: Arial, sans-serif;
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
            border: 1px solid rgba(22, 56, 47, 0.14);
            border-radius: 12px;
            overflow: hidden;
          }

          .header {
            padding: 32px 28px;
            text-align: center;
            background: #16382f;
            color: #fffaf1;
          }

          .brand {
            margin: 0;
            font-size: 34px;
            line-height: 1;
            letter-spacing: -0.04em;
            font-family: Georgia, serif;
          }

          .tagline {
            margin: 12px 0 0;
            color: rgba(255, 250, 241, 0.82);
            font-size: 14px;
            line-height: 1.6;
          }

          .content {
            padding: 36px 28px;
          }

          h1 {
            margin: 0 0 22px;
            color: #16382f;
            font-family: Georgia, serif;
            font-size: 32px;
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
            background: #16382f;
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
            border-top: 1px solid rgba(22, 56, 47, 0.1);
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
              <p class="brand">Stratusse</p>
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