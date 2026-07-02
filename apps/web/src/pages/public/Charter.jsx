import { publicContent } from "../../content/public.content.js";

import PageFooterNavigation from "../../components/navigation/PageFooterNavigation.jsx";

import "../../styles/pages/charter.scss";

export default function Charter() {
  const content = publicContent.charter;

  return (
    <section className="charter-page">
      <header className="charter-hero">
        <span className="charter-hero__badge">{content.hero.eyebrow}</span>

        <h1 className="charter-hero__title">{content.hero.title}</h1>
        <p className="charter-hero__subtitle">{content.hero.subtitle}</p>

        <div className="charter-hero__intro">
          {content.hero.introduction.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </header>
      <div className="home-interlude" aria-hidden="true">
        <span />
      </div>

      <section className="charter-document paper-card">
        {content.sections.map((section) => (
          <section className="charter-section" key={section.title}>
            <h2>{section.title}</h2>

            {section.text?.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            {section.list && (
              <ul>
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </section>

      <section className="quote-closing">
        <blockquote>{content.closing.reflection}</blockquote>

        <footer>{content.closing.signature}</footer>
      </section>

      <PageFooterNavigation />
    </section>
  );
}
