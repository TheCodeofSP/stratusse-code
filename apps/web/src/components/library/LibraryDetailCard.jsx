import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import { libraryContent } from "../../content/library.content.js";
import { libraryService } from "../../api/library.service.js";
import { useAuth } from "../../contexts/AuthContext.jsx";

import "../../styles/components/library-detail-card.scss";

import {
  getReadingStatusLabel,
  getBookUniverseLabel,
} from "../../utils/library.utils";

export default function LibraryDetailCard({ book }) {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [likes, setLikes] = useState(book.likedBy?.length || 0);

  const [hasLiked, setHasLiked] = useState(
    book.likedBy?.some((likedUser) => {
      const likedUserId =
        typeof likedUser === "string" ? likedUser : likedUser?._id;

      return likedUserId === user?._id;
    }) || false,
  );

  const publishedDate = new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(book.createdAt));

  const statusPrefix =
    libraryContent.detail.statusLabels[book.readingStatus] ||
    getReadingStatusLabel(book.readingStatus);

  const creatorPseudo = book.recommendedBy?.pseudo;
  const isOwnReading = book.recommendedBy?._id === user?._id;

  const handleLike = async () => {
    if (!isAuthenticated) {
      toast(libraryContent.detail.likeLoginMessage);
      navigate("/login");
      return;
    }

    if (isOwnReading) {
      toast(libraryContent.detail.ownReadingMessage);
      return;
    }

    try {
      if (hasLiked) {
        const data = await libraryService.unlike(book._id);

        setLikes(data.likesCount);
        setHasLiked(false);
      } else {
        const data = await libraryService.like(book._id);

        setLikes(data.likesCount);
        setHasLiked(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <article className="book-detail-page">
      <div className="library-card library-detail-card">
        <header className="library-detail-hero">
          <span className="eyebrow library-detail-status">
            {statusPrefix}{" "}
            {creatorPseudo ? (
              <Link to={`/creator/${creatorPseudo}`}>{creatorPseudo}</Link>
            ) : (
              "un membre"
            )}
          </span>

          <h1 className="library-detail-title">{book.title}</h1>

          <p className="library-detail-author">
            {libraryContent.detail.authorPrefix} {book.author}
          </p>

          {creatorPseudo && (
            <div className="library-detail-reader">
              <div className="library-detail-reader__name">
                <span className="library-detail-reader__prefix">Par </span>

                <Link
                  className="library-detail-reader__link"
                  to={`/creator/${creatorPseudo}`}
                >
                  {creatorPseudo}
                </Link>
              </div>

              <span className="library-detail-reader__date">
                Lecture déposée le {publishedDate}
              </span>
            </div>
          )}
        </header>

        <div className="library-detail-divider" />

        <div className="library-detail-sections">
          <section className="library-detail-section">
            <span className="library-detail-section-label">
              {libraryContent.detail.sectionLabels.subject}
            </span>
            <p>{book.subject}</p>
          </section>

          <section className="library-detail-section">
            <span className="library-detail-section-label">
              {libraryContent.detail.sectionLabels.universe}
            </span>
            <p>{getBookUniverseLabel(book.universe)}</p>
          </section>

          {book.readingStatus === "reading" && (
            <>
              <section className="library-detail-section library-detail-section--main">
                <span className="library-detail-section-label">
                  {libraryContent.detail.sectionLabels.startedBecause}
                </span>
                <p>{book.startedBecause}</p>
              </section>

              <section className="library-detail-section library-detail-section--main">
                <span className="library-detail-section-label">
                  {libraryContent.detail.sectionLabels.readingExpectation}
                </span>
                <p>{book.readingExpectation}</p>
              </section>
            </>
          )}

          {book.readingStatus === "finished" && (
            <>
              <section className="library-detail-section library-detail-section--main">
                <span className="library-detail-section-label">
                  {libraryContent.detail.sectionLabels.opinion}
                </span>
                <p>{book.opinion}</p>
              </section>

              <section className="library-detail-section library-detail-section--main">
                <span className="library-detail-section-label">
                  {libraryContent.detail.sectionLabels.whyRecommend}
                </span>
                <p>{book.whyRecommend}</p>
              </section>
            </>
          )}

          {book.readingStatus === "abandoned" && (
            <>
              <section className="library-detail-section library-detail-section--main">
                <span className="library-detail-section-label">
                  {libraryContent.detail.sectionLabels.abandonedReason}
                </span>
                <p>{book.abandonedReason}</p>
              </section>

              <section className="library-detail-section library-detail-section--main">
                <span className="library-detail-section-label">
                  {libraryContent.detail.sectionLabels.disappointment}
                </span>
                <p>{book.disappointment}</p>
              </section>
            </>
          )}
        </div>

        {creatorPseudo && (
          <footer className="book-detail-footer">
            <div className="library-detail-signature">
              <Link
                className="library-detail-signature__name"
                to={`/creator/${creatorPseudo}`}
              >
                {creatorPseudo}
              </Link>

              <Link
                className="library-detail"
                to={`/creator/${creatorPseudo}`}
              >
                {libraryContent.detail.creatorLinkPrefix} {creatorPseudo}
              </Link>
            </div>
          </footer>
        )}

        <button
          className={`library-detail-like ${hasLiked ? "active" : ""} ${
            isOwnReading ? "disabled" : ""
          }`}
          type="button"
          onClick={handleLike}
        >
          <span className="library-detail-like__icon">
            {hasLiked ? "♥" : "♡"}
          </span>

          <span className="library-detail-like__text">
            {libraryContent.detail.likeLabel} ({likes})
          </span>
        </button>
      </div>
    </article>
  );
}
