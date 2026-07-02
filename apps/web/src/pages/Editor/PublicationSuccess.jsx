import { Link, useSearchParams } from "react-router-dom";

import { editorContent } from "../../content/editor.content.js";

import "../../styles/pages/publication-success.scss";

export default function PublicationSuccess() {
  const [searchParams] = useSearchParams();

  const type = searchParams.get("type");
  const id = searchParams.get("id");
  const slug = searchParams.get("slug");

  const isLibrary = type === "library";

  const publicationSuccessContent = editorContent.publicationSuccess;

  const content = isLibrary
    ? publicationSuccessContent.library
    : publicationSuccessContent.note;

  const primaryTo = isLibrary ? `/library/${id}` : `/notes/${slug}`;
  const secondaryTo = isLibrary ? "/profile/library" : "/profile/notes";

  return (
    <section className="page-section publication-success-page">
      <div className="paper-card publication-success-card">
        <span className="eyebrow">{content.eyebrow}</span>

        <h1>{content.title}</h1>

        {content.text.map((paragraph) => (
          <p className="text-muted" key={paragraph}>
            {paragraph}
          </p>
        ))}

        <div className="publication-success-actions">
          <Link className="btn btn-primary" to={primaryTo}>
            {content.primaryAction}
          </Link>

          <Link className="btn btn-secondary" to={secondaryTo}>
            {content.secondaryAction}
          </Link>

          <Link className="btn btn-ghost" to="/">
            {content.homeAction}
          </Link>
        </div>
      </div>
    </section>
  );
}
