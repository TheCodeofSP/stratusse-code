import EmptyState from "../common/EmptyState.jsx";

import ProfileNoteCard from "./ProfileNoteCard.jsx";

export default function ProfileNotesActions({
  title,
  notes,
  onDelete,
  onPublish,
  onUnpublish,
  cardClassName = "paper-card",
}) {
  return (
    <section className="stack-md">
      <h2>{title}</h2>

      {notes.length === 0 ? (
        <EmptyState
          title={`Aucun ${title.toLowerCase()}`}
          text="L’écriture prend parfois son temps."
        />
      ) : (
        notes.map((note) => (
          <ProfileNoteCard
            key={note._id}
            note={note}
            onDelete={onDelete}
            onPublish={onPublish}
            onUnpublish={onUnpublish}
            cardClassName={cardClassName}
          />
        ))
      )}
    </section>
  );
}
