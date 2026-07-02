import { Link } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext.jsx";
import { profileContent } from "../../content/profile.content.js";

import EmptyState from "../../components/common/EmptyState.jsx";
import PageFooterNavigation from "../../components/navigation/PageFooterNavigation.jsx";

import "../../styles/pages/profile-writings.scss";

export default function ProfileWritings() {
  const { user } = useAuth();

  const canWrite = user?.role === "creator" || user?.role === "admin";
  const content = profileContent.writings;

  if (!canWrite) {
    return (
      <section className="page-section">
        <EmptyState
          icon={content.accessDenied.icon}
          title={content.accessDenied.title}
          text={content.accessDenied.text}
          buttonLabel={content.accessDenied.buttonLabel}
          buttonTo={content.accessDenied.buttonTo}
        />
      </section>
    );
  }

  return (
    <section className="page-section profile-writings-page">
      <header className="page-header">
        <span className="eyebrow">{content.header.eyebrow}</span>
        <h1>{content.header.title}</h1>
        <p className="text-muted">{content.header.subtitle}</p>
      </header>

      <div className="profile-writings-choices">
        <Link
          className="note-card profile-writing-choice"
          to={content.notes.to}
        >
          <span className="profile-writing-choice__icon">
            {content.notes.icon}
          </span>
          <span className="eyebrow">{content.notes.eyebrow}</span>
          <h2>{content.notes.title}</h2>
          <p>{content.notes.text}</p>
          <span className="profile-writing-choice__link">
            {content.notes.linkLabel}
          </span>
        </Link>

        <Link
          className="library-card profile-writing-choice"
          to={content.library.to}
        >
          <span className="profile-writing-choice__icon">
            {content.library.icon}
          </span>
          <span className="eyebrow">{content.library.eyebrow}</span>
          <h2>{content.library.title}</h2>
          <p>{content.library.text}</p>
          <span className="profile-writing-choice__link">
            {content.library.linkLabel}
          </span>
        </Link>
      </div>
      <PageFooterNavigation />
    </section>
  );
}
