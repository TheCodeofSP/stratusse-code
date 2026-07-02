import { Link } from "react-router-dom";

import { libraryContent } from "../../content/library.content.js";

import {
  getReadingStatusLabel,
  getBookUniverseLabel,
  formatBookText,
} from "../../utils/library.utils";

import "../../styles/components/library-card.scss";

export default function LibraryCard({ book }) {
  const statusPrefix =
    libraryContent.card.statusLabels[book.readingStatus] ||
    getReadingStatusLabel(book.readingStatus);

  return (
    <article className="library-card book-card">
      <div className="book-card__content">
        <span className="book-card__status">
          {statusPrefix}{" "}
          {book.recommendedBy?.pseudo ? (
            <Link
              className="book-card__creator-link"
              to={`/creator/${book.recommendedBy.pseudo}`}
            >
              {book.recommendedBy.pseudo}
            </Link>
          ) : (
            "un membre"
          )}
          {book.hasBeenModifiedAfterPublication && " · Modifié"}
        </span>

        <span className="book-card__universe">
          {getBookUniverseLabel(book.universe)}
        </span>

        <h2 className="book-card__title">{formatBookText(book.title)}</h2>

        <p className="book-card__author">
          {libraryContent.card.authorPrefix} {formatBookText(book.author)}
        </p>

        <p className="book-card__subject">{book.subject}</p>
      </div>

      <Link className="btn btn-secondary" to={`/library/${book._id}`}>
        {libraryContent.card.actionLabel}
      </Link>
    </article>
  );
}
