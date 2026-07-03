import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";

import { homeContent } from "../../content/home.content.js";
import { notesContent } from "../../content/notes.content.js";

import { noteService } from "../../api/note.service.js";
import { libraryService } from "../../api/library.service.js";

import NoteCard from "../../components/note/NoteCard.jsx";
import LibraryCard from "../../components/library/LibraryCard.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";

import "../../styles/pages/home.scss";

export default function Home() {
  const { user } = useAuth();

  const [latestNote, setLatestNote] = useState(null);
  const [latestReading, setLatestReading] = useState(null);

  useEffect(() => {
    const fetchLatestContent = async () => {
      try {
        const [notes, readings] = await Promise.all([
          noteService.getAll(),
          libraryService.getAll(),
        ]);

        setLatestNote(notes?.[0] || null);
        setLatestReading(readings?.[0] || null);
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
    <section className="home">
      <header className="home-hero">
        <span className="home-hero__badge">{homeContent.hero.badge}</span>

        <h1>
          {user?.pseudo
            ? `${user.pseudo.charAt(0).toUpperCase()}${user.pseudo.slice(1)}, ${homeContent.hero.userWelcomeSuffix}`
            : homeContent.hero.title}
        </h1>

        <p className="home-hero__subtitle">{homeContent.hero.subtitle}</p>

        <div className="home-hero__intro">
          {homeContent.hero.introduction.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </header>

      <div className="home-interlude" aria-hidden="true">
        <span />
      </div>

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

          <div className="home-world__preview">
            <span className="home-world__preview-label">
              {homeContent.latestNotes.title}
            </span>

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
                icon="🌿"
                title="Aucune Note déposée pour le moment"
                text={homeContent.latestNotes.placeholder}
              />
            )}
          </div>
          <Link to={homeContent.writing.buttonTo} className="home-world__link">
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

          <div className="home-world__preview">
            <div className="home-interlude--library" aria-hidden="true">
              <span />
            </div>
            <span className="home-world__preview-label">
              {homeContent.latestReadings.title}
            </span>

            {latestReading ? (
              <LibraryCard book={latestReading} />
            ) : (
              <EmptyState
                variant="compact"
                icon="📚"
                title="Aucune Lecture partagée pour le moment"
                text={homeContent.latestReadings.placeholder}
              />
            )}
          </div>
          <Link to={homeContent.reading.buttonTo} className="home-world__link">
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

        <footer>{homeContent.closing.signature}</footer>
      </section>
    </section>
  );
}
