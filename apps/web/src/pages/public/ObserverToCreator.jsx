import { Link } from "react-router-dom";

import { observerToCreatorContent } from "../../content/observerToCreator.content.js";
import PageFooterNavigation from "../../components/navigation/PageFooterNavigation.jsx";

import "../../styles/pages/observer-to-creator.scss";

export default function ObserverToCreator() {
  const content = observerToCreatorContent;
  return (
    <section className="observer-to-creator">
      <header className="observer-to-creator__hero">
        <span className="observer-to-creator__eyebrow">
          {content.hero.eyebrow}
        </span>

        <h1>{content.hero.title}</h1>

        <div className="observer-to-creator__intro">
          {content.hero.introduction.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </header>

      <div className="observer-to-creator__interlude" aria-hidden="true">
        <span />
      </div>

      <section className="observer-to-creator__journey">
        <article className="observer-to-creator__card observer-to-creator__card--member">
          <span className="observer-to-creator__icon">
            {content.journey.member.icon}
          </span>

          <h2>{content.journey.member.title}</h2>

          <p className="observer-to-creator__card-subtitle">
            {content.journey.member.subtitle}
          </p>

          <p>{content.journey.member.text}</p>

          <ul>
            {content.journey.member.actions.map((action) => (
              <li key={action}>{action}</li>
            ))}
          </ul>
        </article>

        <div className="observer-to-creator__timeline">
          {content.journey.steps.map((step) => (
            <div className="observer-to-creator__step" key={step.title}>
              <span className="observer-to-creator__step-dot" />

              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </div>
          ))}
        </div>

        <article className="observer-to-creator__card observer-to-creator__card--voice">
          <span className="observer-to-creator__icon">
            {content.journey.voice.icon}
          </span>

          <h2>{content.journey.voice.title}</h2>

          <p className="observer-to-creator__card-subtitle">
            {content.journey.voice.subtitle}
          </p>

          <p>{content.journey.voice.text}</p>

          <ul>
            {content.journey.voice.actions.map((action) => (
              <li key={action}>{action}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="observer-to-creator__why">
        <h2>{content.why.title}</h2>

        {content.why.text.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="observer-to-creator__review">
        <h2>{content.review.title}</h2>

        {content.review.text.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="observer-to-creator__intentions">
        <header className="observer-to-creator__section-header">
          <h2>{content.intentions.title}</h2>
          <p>{content.intentions.introduction}</p>
        </header>

        <div className="observer-to-creator__intention-grid">
          {content.intentions.cards.map((card) => (
            <article
              className="observer-to-creator__intention-card"
              key={card.title}
            >
              <span className="observer-to-creator__small-icon">
                {card.icon}
              </span>

              <h3>{card.title}</h3>

              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="observer-to-creator__answers">
        <article>
          <h2>{content.answers.accepted.title}</h2>
          <p>{content.answers.accepted.text}</p>
        </article>

        <article>
          <h2>{content.answers.rejected.title}</h2>
          <p>{content.answers.rejected.text}</p>
        </article>
      </section>

      <section className="observer-to-creator__closing">
        <blockquote>{content.closing.quote}</blockquote>

        <p>{content.closing.text}</p>

        <Link to={content.closing.buttonTo} className="btn btn-primary">
          {content.closing.buttonLabel}
        </Link>
      </section>
      <PageFooterNavigation />
    </section>
  );
}
