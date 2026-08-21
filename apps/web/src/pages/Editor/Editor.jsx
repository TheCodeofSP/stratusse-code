import { Link } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext.jsx";
import { editorContent } from "../../content/editor.content.js";

import PageFooterNavigation from "../../components/navigation/PageFooterNavigation.jsx";

import "../../styles/pages/editor.scss";

export default function Editor() {
  const { isAuthenticated, user } = useAuth();

  const canWrite =
    user?.role === "admin" ||
    (user?.role === "creator" && user?.isApprovedCreator === true);
  const writingsContent = editorContent.writings;

  return (
    <section className="page-section editor-page">
      <header className="editor-hero">
        <span className="eyebrow">{writingsContent.hero.eyebrow}</span>

        <h1>{writingsContent.hero.title}</h1>

        <p>{writingsContent.hero.introduction}</p>
      </header>

      {!isAuthenticated && (
        <section className="editor-access editor-access--visitor">
          <div>
            <h2>{writingsContent.visitor.title}</h2>

            {writingsContent.visitor.text.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="editor-access__actions">
            <Link
              className="btn btn-primary"
              to={writingsContent.visitor.primaryTo}
            >
              {writingsContent.visitor.primaryLabel}
            </Link>

            <Link
              className="btn btn-secondary"
              to={writingsContent.visitor.secondaryTo}
            >
              {writingsContent.visitor.secondaryLabel}
            </Link>
          </div>
        </section>
      )}

      {isAuthenticated && !canWrite && (
        <section className="editor-observer-path">
          <div className="editor-observer-path__intro">
            <span className="eyebrow">{writingsContent.observer.eyebrow}</span>

            <h2>{writingsContent.observer.title}</h2>

            {writingsContent.observer.text.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="editor-observer-path__steps">
            {writingsContent.observer.steps.map((step) => (
              <article className="editor-observer-path__step" key={step.title}>
                <span />

                <h3>{step.title}</h3>

                <p>{step.text}</p>
              </article>
            ))}
          </div>

          <Link
            className="btn btn-primary"
            to={writingsContent.observer.buttonTo}
          >
            {writingsContent.observer.buttonLabel}
          </Link>
        </section>
      )}

      {canWrite && (
        <>
          <section className="editor-intro-card">
            <h2>{writingsContent.creator.title}</h2>
            <p>{writingsContent.creator.text}</p>
          </section>

          <div className="editor-section">
            <div className="editor-section__header">
              <span className="eyebrow">
                {writingsContent.sections.createEyebrow}
              </span>

              <h2>{writingsContent.sections.createTitle}</h2>
            </div>

            <div className="editor-choice-grid">
              <Link
                className="note-card editor-choice-card editor-choice-card--note"
                to={writingsContent.createNote.buttonTo}
              >
                <h3>{writingsContent.createNote.title}</h3>
                <p>{writingsContent.createNote.introduction}</p>
              </Link>

              <Link
                className="library-card editor-choice-card editor-choice-card--library"
                to={writingsContent.createReading.buttonTo}
              >
                <h3>{writingsContent.createReading.title}</h3>
                <p>{writingsContent.createReading.introduction}</p>
              </Link>
            </div>
          </div>

          <div className="editor-section">
            <div className="editor-section__header">
              <span className="eyebrow">
                {writingsContent.sections.manageEyebrow}
              </span>

              <h2>{writingsContent.sections.manageTitle}</h2>
            </div>

            <div className="editor-choice-grid">
              <Link
                className="note-card editor-choice-card editor-choice-card--note"
                to="/profile/notes"
              >
                <h3>{writingsContent.notes.title}</h3>
                <p>{writingsContent.notes.introduction}</p>
              </Link>

              <Link
                className="library-card editor-choice-card editor-choice-card--library"
                to="/profile/library"
              >
                <h3>{writingsContent.readings.title}</h3>
                <p>{writingsContent.readings.introduction}</p>
              </Link>
            </div>
          </div>
        </>
      )}

      <section className="quote-closing">
        <blockquote>{writingsContent.closing.reflection}</blockquote>

        <footer>{writingsContent.closing.signature}</footer>
      </section>

      <PageFooterNavigation />
    </section>
  );
}
