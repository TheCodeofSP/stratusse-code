import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";

import { homeContent } from "../../content/home.content.js";
import { notesContent } from "../../content/notes.content.js";
import { seoContent } from "../../content/seo.content.js";

import { noteService } from "../../api/note.service.js";

import NoteCard from "../../components/note/NoteCard.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import SEO from "../../components/seo/SEO.jsx";

import "../../styles/pages/home.scss";

export default function Home() {
  const { user } = useAuth();

  const [latestNote, setLatestNote] = useState(null);
  useEffect(() => {
    const fetchLatestContent = async () => {
      try {
        const notes = await noteService.getAll();

        setLatestNote(notes?.[0] || null);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLatestContent();
  }, []);

  const noteCategoryLabels = Object.fromEntries(
    notesContent.filters.categories.map((category) => [
      category.value,
      category.label,
    ]),
  );

  return (
    <>
      <SEO
        title={seoContent.pages.home.title}
        description={seoContent.pages.home.description}
        image={seoContent.pages.home.image}
        url={seoContent.site.url}
      />

      <section className="home">
        {" "}
        <header className="home-hero">
          <span className="home-hero__badge">{homeContent.hero.badge}</span>

          {user?.pseudo && (
            <p className="hero-welcome">
              {`${user.pseudo.charAt(0).toUpperCase()}${user.pseudo.slice(1)}, ${homeContent.hero.userWelcomeSuffix}`}
            </p>
          )}

          <h1
            className={
              user?.pseudo ? "home-hero__title--with-welcome" : undefined
            }
          >
            {homeContent.hero.title}
          </h1>

          <p className="home-hero__subtitle">{homeContent.hero.subtitle}</p>
          <div className="home-hero__intro">
            {homeContent.hero.introduction.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="home-hero__actions">
            <Link
              to={homeContent.hero.primaryAction.to}
              className="btn btn-primary"
            >
              {homeContent.hero.primaryAction.label}
            </Link>
            <Link
              to={homeContent.hero.secondaryAction.to}
              className="btn btn-secondary"
            >
              {homeContent.hero.secondaryAction.label}
            </Link>
          </div>
        </header>
        <div className="home-interlude" aria-hidden="true">
          <span />
        </div>
        <section className="home-spotlight">
          <header className="home-spotlight__header">
            <span className="home-spotlight__eyebrow">
              {homeContent.spotlight.eyebrow}
            </span>
          </header>

          {latestNote ? (
            <NoteCard
              note={latestNote}
              categoryLabel={
                noteCategoryLabels[latestNote.category] || latestNote.category
              }
            />
          ) : (
            <EmptyState
              variant="compact"
              icon="✦"
              title={homeContent.spotlight.emptyTitle}
              text={homeContent.spotlight.emptyText}
            />
          )}

          <Link
            to={homeContent.spotlight.buttonTo}
            className="home-spotlight__link"
          >
            {homeContent.spotlight.buttonLabel}
          </Link>
        </section>
        <section className="home-invitation">
          <span className="home-invitation__eyebrow">
            {homeContent.invitation.eyebrow}
          </span>
          <h2>{homeContent.invitation.title}</h2>

          <ul className="home-invitation__prompts">
            {homeContent.invitation.prompts.map((prompt) => (
              <li key={prompt}>{prompt}</li>
            ))}
          </ul>

          <p>{homeContent.invitation.text}</p>

          <Link
            to={homeContent.invitation.buttonTo}
            className="btn btn-primary"
          >
            {homeContent.invitation.buttonLabel}
          </Link>
        </section>
        <section className="home-worlds">
          <article className="home-world home-world--notes">
            <div className="home-world__content">
              <span className="home-world__eyebrow">
                {homeContent.writing.title}
              </span>

              <h2>{homeContent.writing.quote}</h2>

              {homeContent.writing.text.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="home-interlude--writing" aria-hidden="true">
              <span />
            </div>

            <Link
              to={homeContent.writing.buttonTo}
              className="home-world__link"
            >
              {homeContent.writing.buttonLabel}
            </Link>
          </article>

          <article className="home-world home-world--library">
            <div className="home-world__content">
              <span className="home-world__eyebrow">
                {homeContent.reading.title}
              </span>

              <h2>{homeContent.reading.quote}</h2>

              {homeContent.reading.text.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <Link
              to={homeContent.reading.buttonTo}
              className="home-world__link"
            >
              {homeContent.reading.buttonLabel}
            </Link>
          </article>
        </section>
        <div className="home-interlude" aria-hidden="true">
          <span />
        </div>
        <section className="home-participation">
          <header className="home-participation__header">
            <span className="home-participation__eyebrow">
              {homeContent.participation.eyebrow}
            </span>

            <h2>{homeContent.participation.title}</h2>

            <p className="home-participation__subtitle">
              {homeContent.participation.subtitle}
            </p>

            <div className="home-participation__intro">
              {homeContent.participation.introduction.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </header>

          <div className="home-participation__journey">
            <article className="home-participation__card home-participation__card--observer">
              <span className="home-participation__icon">
                {homeContent.participation.observer.icon}
              </span>

              <h3>{homeContent.participation.observer.title}</h3>

              <p className="home-participation__card-subtitle">
                {homeContent.participation.observer.subtitle}
              </p>

              <p>{homeContent.participation.observer.text}</p>

              <ul>
                {homeContent.participation.observer.actions.map((action) => (
                  <li key={action}>{action}</li>
                ))}
              </ul>
            </article>

            <div className="home-participation__timeline">
              {homeContent.participation.journey.map((step) => (
                <div className="home-participation__step" key={step.title}>
                  <span className="home-participation__step-dot" />

                  <div className="home-participation__step-content">
                    <h4>{step.title}</h4>
                    <p>{step.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <article className="home-participation__card home-participation__card--creator">
              <span className="home-participation__icon">
                {homeContent.participation.creator.icon}
              </span>

              <h3>{homeContent.participation.creator.title}</h3>

              <p className="home-participation__card-subtitle">
                {homeContent.participation.creator.subtitle}
              </p>

              <p>{homeContent.participation.creator.text}</p>

              <ul>
                {homeContent.participation.creator.actions.map((action) => (
                  <li key={action}>{action}</li>
                ))}
              </ul>
            </article>
          </div>

          <article className="home-participation__philosophy">
            <div className="home-participation__philosophy-description">
              <h3>{homeContent.participation.philosophy.title}</h3>

              {homeContent.participation.philosophy.text.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <Link
                to={homeContent.participation.philosophy.buttonTo}
                className="btn btn-primary"
              >
                {homeContent.participation.philosophy.buttonLabel}
              </Link>
            </div>
          </article>
        </section>
        <section className="quote-closing">
          <blockquote>{homeContent.closing.quote}</blockquote>

          <p>{homeContent.closing.reflection}</p>

          <footer>{homeContent.closing.signature}</footer>

          <Link to={homeContent.closing.buttonTo} className="btn btn-primary">
            {homeContent.closing.buttonLabel}
          </Link>
        </section>
      </section>
    </>
  );
}
