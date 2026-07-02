import { Link } from "react-router-dom";

import { notesContent } from "../../content/notes.content.js";

export default function NoteCard({ note, categoryLabel }) {
  return (
    <article className="note-card note-list-card">
      <span className="note-category">
        {categoryLabel}
        {note.hasBeenModifiedAfterPublication && " · Modifié"}
      </span>

      <h2 className="note-title">{note.title}</h2>

      <p className="note-author">
        {notesContent.card.authorPrefix} {note.author?.pseudo}
      </p>

      <p className="note-excerpt">{note.excerpt}</p>

      <Link className="btn btn-primary" to={`/notes/${note.slug}`}>
        {notesContent.card.actionLabel}
      </Link>
    </article>
  );
}
