import { publicContent } from "../../content/public.content.js";

import PageFooterNavigation from "../../components/navigation/PageFooterNavigation.jsx";

import "../../styles/pages/about.scss";

export default function About() {
  const content = publicContent.about;

  return (
    <section className="about-page">
      <header className="about-hero">
        <span className="about-hero__badge">{content.hero.eyebrow}</span>

        <h1 className="about-hero__title">{content.hero.title}</h1>
        <p className="about-hero__subtitle">{content.hero.subtitle}</p>

        <div className="about-hero__intro">
          {content.hero.introduction.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </header>

      <div className="home-interlude" aria-hidden="true">
        <span />
      </div>

      <section className="about-note paper-card">
        {content.sections.map((section) => (
          <section className="about-section" key={section.title}>
            <h2>{section.title}</h2>

            <div className="about-section__content">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
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
