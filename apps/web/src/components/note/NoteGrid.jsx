import NoteCard from "./NoteCard.jsx";

export default function NoteGrid({
  notes,
  getCategoryLabel,
}) {
  return (
    <div className="notes-grid">
      {notes.map((note) => (
        <NoteCard
          key={note._id}
          note={note}
          categoryLabel={getCategoryLabel(
            note.category,
          )}
        />
      ))}
    </div>
  );
}