import { Link } from "react-router-dom";

import { libraryContent } from "../../content/library.content.js";
import { createBookSlug } from "../../utils/bookSlug.utils.js";
import { getBookUniverseLabel } from "../../utils/library.utils.js";

import "../../styles/components/library-card.scss";

export default function LibraryBookGroupCard({ group }) {
  const slug = createBookSlug(group.title, group.author);
  const count = group.readings.length;

  return (
    <article className="library-card book-card book-card--group">
      <div className="book-card__content">
        <span className="book-card__status">
          {count} {count > 1 ? "ressentis" : "ressenti"}
        </span>

        <span className="book-card__universe">
          {getBookUniverseLabel(group.universe)}
        </span>

        <h2 className="book-card__title">{group.title}</h2>

        <p className="book-card__author">
          {libraryContent.card.authorPrefix} {group.author}
        </p>

        <p className="book-card__subject">{group.subject}</p>
      </div>

      <Link className="btn btn-secondary" to={`/library/books/${slug}`}>
        Voir les {count} expériences
      </Link>
    </article>
  );
}
