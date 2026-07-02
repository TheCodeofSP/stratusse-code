import { Link } from "react-router-dom";

import { publicContent } from "../../content/public.content.js";

import "../../styles/pages/not-found.scss";

export default function NotFound() {
  const content = publicContent.notFound;

  return (
    <section className="page-section not-found-page">
      <div className="paper-card not-found-card">
        <span className="eyebrow">{content.eyebrow}</span>

        <h1>{content.title}</h1>

        <p className="text-muted">{content.text}</p>

        <Link className="btn btn-primary" to={content.buttonTo}>
          {content.buttonLabel}
        </Link>

        <p className="not-found-reflection">{content.reflection}</p>
      </div>
    </section>
  );
}
