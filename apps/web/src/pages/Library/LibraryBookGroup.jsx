import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { libraryService } from "../../api/library.service.js";
import { libraryContent } from "../../content/library.content.js";
import { createBookSlug } from "../../utils/bookSlug.utils.js";

import LoadingState from "../../components/ui/LoadingState.jsx";
import ErrorState from "../../components/ui/ErrorState.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import PageFooterNavigation from "../../components/navigation/PageFooterNavigation.jsx";

import "../../styles/pages/library-book-group.scss";

export default function LibraryBookGroup() {
  const { bookSlug } = useParams();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await libraryService.getAll();
        setBooks(data);
      } catch (error) {
        console.error(error);
        setError(libraryContent.states.loadError);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const matchingBooks = useMemo(
    () =>
      books.filter(
        (book) => createBookSlug(book.title, book.author) === bookSlug,
      ),
    [books, bookSlug],
  );

  const mainBook = matchingBooks[0];

  if (loading) {
    return <LoadingState text={libraryContent.states.loading} />;
  }

  if (error) {
    return <ErrorState text={error} />;
  }

  if (!mainBook) {
    return (
      <section className="page-section">
        <EmptyState
          icon="📖"
          title="Livre introuvable"
          text="Aucune expérience de lecture ne correspond à ce livre."
        />
      </section>
    );
  }

  return (
    <section className="page-section library-book-group-page">
      <header className="library-book-group-hero">
        <span className="eyebrow">Livre partagé</span>

        <h1>{mainBook.title}</h1>

        <p className="library-book-group-author">
          {libraryContent.card.authorPrefix} {mainBook.author}
        </p>

        <p className="text-muted">
          {matchingBooks.length}{" "}
          {matchingBooks.length > 1 ? "expériences" : "expérience"} autour de ce
          livre.
        </p>
        <div className="library-book-group-stats">
          <span>
            {
              matchingBooks.filter((book) => book.readingStatus === "finished")
                .length
            }{" "}
            terminée(s)
          </span>

          <span>
            {
              matchingBooks.filter((book) => book.readingStatus === "reading")
                .length
            }{" "}
            en cours
          </span>

          <span>
            {
              matchingBooks.filter((book) => book.readingStatus === "abandoned")
                .length
            }{" "}
            abandonnée(s)
          </span>
        </div>
      </header>

      <div className="library-book-group-list">
        {matchingBooks.map((book) => (
          <article className="library-book-feeling-card" key={book._id}>
            <span className="eyebrow">
              {book.recommendedBy?.pseudo
                ? `Le regard de ${book.recommendedBy.pseudo}`
                : "Un regard partagé"}
            </span>

            <h2>
              {book.opinion
                ? `“${book.opinion.slice(0, 120)}${book.opinion.length > 120 ? "..." : ""}”`
                : book.subject}
            </h2>

            <p>{book.whyRecommend || book.subject}</p>
            <Link className="btn btn-secondary" to={`/library/${book._id}`}>
              Lire cette expérience
            </Link>
          </article>
        ))}
      </div>

      <PageFooterNavigation
        backTo="/library"
        backLabel="Retour à la Bibliothèque"
      />
    </section>
  );
}
