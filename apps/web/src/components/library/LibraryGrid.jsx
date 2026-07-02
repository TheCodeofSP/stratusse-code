import LibraryCard from "./LibraryCard.jsx";
import LibraryBookGroupCard from "./LibraryBookGroupCard.jsx";

export default function LibraryGrid({ books, groupedBooks, viewMode }) {
  if (viewMode === "books") {
    return (
      <div className="flex-wrap-md">
        {groupedBooks.map((group) => (
          <LibraryBookGroupCard
            key={`${group.title}-${group.author}`}
            group={group}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex-wrap-md">
      {books.map((book) => (
        <LibraryCard key={book._id} book={book} />
      ))}
    </div>
  );
}