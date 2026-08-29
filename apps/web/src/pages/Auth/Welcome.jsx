import { Link } from "react-router-dom";

import { authContent } from "../../content/auth.content.js";

import "../../styles/components/page-footer-navigation.scss";

export default function Welcome() {
  return (
    <section className="page-section">
      <header className="page-header">
        <span className="eyebrow">{authContent.welcome.eyebrow}</span>

        <h1>{authContent.welcome.title}</h1>

        {authContent.welcome.text.map((paragraph) => (
          <p key={paragraph} className="text-muted">
            {paragraph}
          </p>
        ))}
      </header>

      <div className="page-actions">
        <Link className="btn btn-primary" to={authContent.welcome.primaryTo}>
          {authContent.welcome.primaryAction}
        </Link>

        <Link className="btn btn-secondary" to={authContent.welcome.homeTo}>
          {authContent.welcome.homeAction}
        </Link>

        <Link
          className="btn btn-secondary"
          to={authContent.welcome.secondaryTo}
        >
          {authContent.welcome.secondaryAction}
        </Link>
      </div>
    </section>
  );
}
