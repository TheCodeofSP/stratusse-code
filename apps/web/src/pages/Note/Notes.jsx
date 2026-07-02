import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { noteService } from "../../api/note.service.js";
import { notesContent } from "../../content/notes.content.js";

import LoadingState from "../../components/ui/LoadingState.jsx";
import ErrorState from "../../components/ui/ErrorState.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import PageFooterNavigation from "../../components/navigation/PageFooterNavigation.jsx";
import NoteGrid from "../../components/note/NoteGrid.jsx";

import "../../styles/pages/notes.scss";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await noteService.getAll();

        setNotes(data);
      } catch (error) {
        console.error(error);

        setError(notesContent.states.loadError);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  if (loading) {
    return <LoadingState text={notesContent.states.loading} />;
  }

  if (error) {
    return <ErrorState text={error} />;
  }

  if (!notes.length) {
    return (
      <section className="page-section">
        <EmptyState
          icon={notesContent.emptyState.icon}
          title={notesContent.emptyState.title}
          text={notesContent.emptyState.text}
        />
      </section>
    );
  }

  const categories = [
    { value: "all", label: notesContent.filters.allLabel },
    ...notesContent.filters.categories,
  ];

  const filteredNotes =
    selectedCategory === "all"
      ? notes
      : notes.filter((note) => note.category === selectedCategory);

  const getCategoryLabel = (categoryValue) =>
    categories.find((category) => category.value === categoryValue)?.label ||
    categoryValue;

  return (
    <section className="page-section notes-page">
      <header className="notes-hero">
        <span className="eyebrow">{notesContent.hero.eyebrow}</span>

        <h1 className="notes-title">{notesContent.hero.title}</h1>

        <div className="notes-subtitle text-muted">
          {notesContent.hero.introduction.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <p className="notes-count">
          {notes.length}{" "}
          {notes.length > 1
            ? notesContent.count.plural
            : notesContent.count.singular}
        </p>
      </header>

      <div className="home-interlude--writing" aria-hidden="true">
        <span />
      </div>

      <section className="section-filter">
        <h2 className="filter-title">{notesContent.filters.title}</h2>

        <div className="filter-bar">
          {categories.map((category) => (
            <button
              key={category.value}
              type="button"
              className={`filter-pill ${
                selectedCategory === category.value ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category.value)}
            >
              {category.value === "all" ? (
                category.label
              ) : (
                <>
                  {category.label} (
                  {
                    notes.filter((note) => note.category === category.value)
                      .length
                  }
                  )
                </>
              )}
            </button>
          ))}
        </div>
      </section>

      <NoteGrid notes={filteredNotes} getCategoryLabel={getCategoryLabel} />

      <section className="quote-closing">
        <blockquote>{notesContent.closing.reflection}</blockquote>

        <footer>{notesContent.closing.signature}</footer>
      </section>

      <PageFooterNavigation />
    </section>
  );
}
