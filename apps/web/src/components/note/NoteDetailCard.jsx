import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

import { noteService } from "../../api/note.service.js";
import { notesContent } from "../../content/notes.content.js";
import { useAuth } from "../../contexts/AuthContext.jsx";

export default function NoteDetailCard({ note }) {
  const navigate = useNavigate();

  const { user, isAuthenticated } = useAuth();

  const [likes, setLikes] = useState(note.likedBy?.length || 0);
  const publishedDate = new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(note.firstPublishedAt || note.createdAt));

  const [hasLiked, setHasLiked] = useState(
    note.likedBy?.some((likedUser) => {
      const likedUserId =
        typeof likedUser === "string" ? likedUser : likedUser?._id;

      return likedUserId === user?._id;
    }) || false,
  );

  const isOwnNote = note.author?._id === user?._id;

  const handleLike = async () => {
    if (!isAuthenticated) {
      toast(notesContent.detail.likeLoginMessage);
      navigate("/login");
      return;
    }

    if (isOwnNote) {
      toast(notesContent.detail.ownNoteMessage);
      return;
    }

    try {
      if (hasLiked) {
        await noteService.unlike(note._id);

        setLikes((prev) => prev - 1);
        setHasLiked(false);
      } else {
        await noteService.like(note._id);

        setLikes((prev) => prev + 1);
        setHasLiked(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const noteCategoryLabels = Object.fromEntries(
    notesContent.filters.categories.map((category) => [
      category.value,
      category.label,
    ]),
  );

  return (
    <article className="note-detail-page">
      <div className="note-card note-detail-card">
        <header className="note-detail-hero">
          <span className="eyebrow note-detail-category">
            {noteCategoryLabels[note.category] || note.category}
            {note.hasBeenModifiedAfterPublication && " · Modifié"}
          </span>

          <h1 className="note-detail-title">{note.title}</h1>

          {note.author?.pseudo && (
            <div className="note-detail-author">
              <div className="note-detail-author__name">
                <span className="note-detail-author__prename">Par </span>
                <Link
                  className="note-detail-author__name"
                  to={`/creator/${note.author.pseudo}`}
                >
                  {note.author.pseudo}
                </Link>
              </div>

              <span className="note-detail-author__date">
                , le {publishedDate}
              </span>
            </div>
          )}

          <p className="note-detail-excerpt">{note.excerpt}</p>
        </header>

        <div className="note-detail-content">{note.content}</div>
        {note.author?.pseudo && (
          <div className="note-detail-author">
            <div className="note-detail-author__name">
              <Link
                className="note-detail-author__name"
                to={`/creator/${note.author.pseudo}`}
              >
                {note.author.pseudo}
              </Link>
            </div>
            {note.author?.pseudo && (
              <Link
                className="note-detail-author-link"
                to={`/creator/${note.author.pseudo}`}
              >
                {notesContent.detail.creatorLinkPrefix}
              </Link>
            )}
          </div>
        )}

        <button
          className={`note-like ${hasLiked ? "active" : ""} ${
            isOwnNote ? "disabled" : ""
          }`}
          type="button"
          onClick={handleLike}
        >
          <span className="note-like__icon">{hasLiked ? "♥" : "♡"}</span>

          <span className="note-like__text">
            {notesContent.detail.likeLabel} ({likes})
          </span>
        </button>
      </div>
    </article>
  );
}
