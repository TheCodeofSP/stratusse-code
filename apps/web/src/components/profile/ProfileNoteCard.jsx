import { Link } from "react-router-dom";

import "../../styles/pages/profile-notes.scss";

export default function ProfileNoteCard({
  note,
  onDelete,
  onPublish,
  onUnpublish,
  cardClassName = "paper-card",
}) {
  return (
    <article className={`note-card profile-note-card ${cardClassName}`}>
      <div className="stack-sm">
        <span className="profile-note-status">
          {note.status === "draft" ? "📝 Brouillon" : "🌿 Publié"}
        </span>

        <h3>{note.title}</h3>

        <p className="text-muted">{note.excerpt}</p>
      </div>

      <div className="profile-note-actions">
        {note.status === "draft" && (
          <>
            <Link className="btn btn-secondary" to={`/editor/note/${note._id}`}>
              Voir
            </Link>

            <Link className="btn btn-secondary" to={`/editor/note/${note._id}`}>
              Modifier
            </Link>

            <button
              className="btn btn-primary"
              onClick={() => onPublish(note._id)}
            >
              Déposer
            </button>
          </>
        )}

        {note.status === "published" && (
          <>
            <Link className="btn btn-secondary" to={`/notes/${note.slug}`}>
              Voir
            </Link>

            <button
              className="btn btn-primary"
              onClick={() => onUnpublish(note._id)}
            >
              Remettre en brouillon
            </button>
          </>
        )}

        <button className="btn btn-ghost" onClick={() => onDelete(note._id)}>
          Supprimer
        </button>
      </div>
    </article>
  );
}
