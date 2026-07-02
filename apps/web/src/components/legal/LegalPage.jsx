import "../../styles/components/legal-page.scss";

export default function LegalPage({ title, intro, sections }) {
  return (
    <section className="legal-page">
      <header className="legal-page__header">
        <span className="eyebrow">Confiance & transparence</span>
        <h1>{title}</h1>
        {intro && <p>{intro}</p>}
      </header>

      <div className="legal-page__content">
        {sections.map((section) => (
          <article className="legal-page__section" key={section.title}>
            <h2>{section.title}</h2>

            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
        ))}
      </div>
    </section>
  );
}