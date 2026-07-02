import { useEffect, useMemo, useState } from "react";

import { libraryService } from "../../api/library.service.js";
import { libraryContent } from "../../content/library.content.js";

import LibraryGrid from "../../components/library/LibraryGrid.jsx";
import LoadingState from "../../components/ui/LoadingState.jsx";
import ErrorState from "../../components/ui/ErrorState.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import PageFooterNavigation from "../../components/navigation/PageFooterNavigation.jsx";

import "../../styles/pages/library.scss";

export default function Library() {
  const [books, setBooks] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedUniverse, setSelectedUniverse] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("feelings");
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

  const readingStatuses = [
    { value: "all", label: libraryContent.filters.allLabel },
    ...libraryContent.filters.statuses,
  ];

  const universes = [
    { value: "all", label: libraryContent.filters.allLabel },
    ...libraryContent.filters.universes,
  ];

  const filteredBooks = books.filter((book) => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    const matchesSearch =
      !normalizedSearch ||
      book.title?.toLowerCase().includes(normalizedSearch) ||
      book.author?.toLowerCase().includes(normalizedSearch) ||
      book.subject?.toLowerCase().includes(normalizedSearch);

    const matchesStatus =
      selectedStatus === "all" || book.readingStatus === selectedStatus;

    const matchesUniverse =
      selectedUniverse === "all" || book.universe === selectedUniverse;

    return matchesSearch && matchesStatus && matchesUniverse;
  });

  const groupedBooks = useMemo(() => {
    const groups = {};

    filteredBooks.forEach((book) => {
      const key = `${book.title?.trim().toLowerCase()}-${book.author
        ?.trim()
        .toLowerCase()}`;

      if (!groups[key]) {
        groups[key] = {
          title: book.title,
          author: book.author,
          subject: book.subject,
          universe: book.universe,
          readings: [],
        };
      }

      groups[key].readings.push(book);
    });

    return Object.values(groups);
  }, [filteredBooks]);

  if (loading) {
    return <LoadingState text={libraryContent.states.loading} />;
  }

  if (error) {
    return <ErrorState text={error} />;
  }

  if (!books.length) {
    return (
      <section className="page-section">
        <EmptyState
          icon={libraryContent.emptyState.icon}
          title={libraryContent.emptyState.title}
          text={libraryContent.emptyState.text}
        />
      </section>
    );
  }

  return (
    <section className="page-section library-page">
      <header className="library-hero">
        <span className="eyebrow">{libraryContent.hero.eyebrow}</span>

        <h1 className="library-title">{libraryContent.hero.title}</h1>

        <div className="library-subtitle text-muted">
          {libraryContent.hero.introduction.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <p className="library-count">
          {filteredBooks.length}{" "}
          {filteredBooks.length > 1
            ? libraryContent.count.plural
            : libraryContent.count.singular}
        </p>
      </header>

      <div className="home-interlude--library" aria-hidden="true">
        <span />
      </div>

      <section className="section-filter">
        <h2 className="filter-title">{libraryContent.filters.title}</h2>

        <div className="filter-group">
          <div className="filter-cattegory-bar">
            <span className="filter-title">
              {libraryContent.filters.viewTitle}
            </span>
            <div className="filter-bar">
              <button
                type="button"
                className={`filter-pill ${viewMode === "feelings" ? "active" : ""}`}
                onClick={() => setViewMode("feelings")}
              >
                {libraryContent.filters.views.feelings}
              </button>

              <button
                type="button"
                className={`filter-pill ${viewMode === "books" ? "active" : ""}`}
                onClick={() => setViewMode("books")}
              >
                {libraryContent.filters.views.books}
              </button>
            </div>
          </div>

          <div className="library-search">
            <label className="form-label" htmlFor="library-search">
              {libraryContent.search.label}
            </label>

            <input
              id="library-search"
              className="form-input"
              type="search"
              placeholder={libraryContent.search.placeholder}
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </div>

          <div className="filter-bar">
            <span className="filter-title">Statut</span>

            {readingStatuses.map((status) => (
              <button
                key={status.value}
                type="button"
                className={`filter-pill ${
                  selectedStatus === status.value ? "active" : ""
                }`}
                onClick={() => setSelectedStatus(status.value)}
              >
                {status.value === "all"
                  ? status.label
                  : `${status.label} (${
                      books.filter(
                        (book) => book.readingStatus === status.value,
                      ).length
                    })`}
              </button>
            ))}
          </div>

          <div className="filter-bar">
            <span className="filter-title">Univers</span>

            {universes.map((universe) => (
              <button
                key={universe.value}
                type="button"
                className={`filter-pill ${
                  selectedUniverse === universe.value ? "active" : ""
                }`}
                onClick={() => setSelectedUniverse(universe.value)}
              >
                {universe.value === "all"
                  ? universe.label
                  : `${universe.label} (${
                      books.filter((book) => book.universe === universe.value)
                        .length
                    })`}
              </button>
            ))}
          </div>
        </div>
      </section>

      <LibraryGrid
        books={filteredBooks}
        groupedBooks={groupedBooks}
        viewMode={viewMode}
      />

      <section className="quote-closing">
        <blockquote>{libraryContent.closing.reflection}</blockquote>

        <footer>{libraryContent.closing.signature}</footer>
      </section>

      <PageFooterNavigation />
    </section>
  );
}
