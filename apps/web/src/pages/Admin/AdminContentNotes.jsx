import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { adminContentService } from "../../api/adminContent.service.js";
import { adminDashboardContent } from "../../content/adminDashboard.content.js";

import ConfirmModal from "../../components/common/ConfirmModal.jsx";
import PageFooterNavigation from "../../components/navigation/PageFooterNavigation.jsx";
import StatusBadge from "../../components/common/StatusBadge.jsx";
import AdminPageHeader from "../../components/admin/AdminPageHeader.jsx";
import AdminLoading from "../../components/admin/AdminLoading.jsx";
import AdminEmptyState from "../../components/admin/AdminEmptyState.jsx";

import "../../styles/pages/admin-content-notes.scss";

export default function AdminContentNotes() {
  const [notes, setNotes] = useState([]);
  const [creatorFilter, setCreatorFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [search, setSearch] = useState("");

  const content = adminDashboardContent.adminContent.notes;
  const categories = adminDashboardContent.contentDetail.categories;

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const data = await adminContentService.getNotes();
      setNotes(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const creators = useMemo(() => {
    return [
      ...new Set(notes.map((note) => note.author?.pseudo).filter(Boolean)),
    ];
  }, [notes]);

  const filteredNotes = notes.filter((note) => {
    const matchesCreator =
      creatorFilter === "all" || note.author?.pseudo === creatorFilter;

    const matchesCategory =
      categoryFilter === "all" || note.category === categoryFilter;

    const noteDate = new Date(note.createdAt);
    const now = new Date();

    const matchesDate =
      dateFilter === "all" ||
      (dateFilter === "today" &&
        noteDate.toDateString() === now.toDateString()) ||
      (dateFilter === "week" && now - noteDate <= 7 * 24 * 60 * 60 * 1000) ||
      (dateFilter === "month" && now - noteDate <= 30 * 24 * 60 * 60 * 1000);

    const matchesSearch =
      !search ||
      note.title?.toLowerCase().includes(search.toLowerCase()) ||
      note.excerpt?.toLowerCase().includes(search.toLowerCase()) ||
      note.author?.pseudo?.toLowerCase().includes(search.toLowerCase());

    return matchesCreator && matchesCategory && matchesDate && matchesSearch;
  });

  const handleDelete = async (noteId) => {
    if (!noteId) return;

    try {
      await adminContentService.deleteNote(noteId);

      setNotes((prev) => prev.filter((note) => note._id !== noteId));

      toast.success(content.messages.deleteSuccess);
    } catch (error) {
      console.error(error);
      toast.error(content.messages.deleteError);
    }
  };

  if (loading) {
    return <AdminLoading text="Chargement des Notes..." />;
  }

  return (
    <section className="page-section admin-content-notes-page">
      <AdminPageHeader
        title={content.header.title}
        subtitle={content.header.subtitle}
      />

      <div className="form-group">
        <input
          className="form-select"
          type="text"
          placeholder={content.search.placeholder}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className="filter-field-bar">
        <select
          value={creatorFilter}
          onChange={(event) => setCreatorFilter(event.target.value)}
        >
          <option value="all">{content.filters.creators.all}</option>

          {creators.map((creator) => (
            <option key={creator} value={creator}>
              {creator}
            </option>
          ))}
        </select>

        <select
          value={dateFilter}
          onChange={(event) => setDateFilter(event.target.value)}
        >
          <option value="all">{content.filters.dates.all}</option>
          <option value="today">{content.filters.dates.today}</option>
          <option value="week">{content.filters.dates.week}</option>
          <option value="month">{content.filters.dates.month}</option>
        </select>

        <select
          value={categoryFilter}
          onChange={(event) => setCategoryFilter(event.target.value)}
        >
          <option value="all">{content.filters.categories.all}</option>

          {Object.entries(categories).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="admin-note-grid">
        {filteredNotes.length === 0 ? (
          <AdminEmptyState text="Aucune Note à afficher." />
        ) : (
          filteredNotes.map((note) => (
            <article
              key={note._id}
              className="admin-note-card admin-card admin-card-hover"
            >
              <span className={`admin-note-category ${note.category}`}>
                {categories[note.category] || note.category}
              </span>

              <StatusBadge
                label={content.status[note.status]?.label}
                variant={content.status[note.status]?.variant}
              />

              <h2>{note.title}</h2>

              <p className="admin-note-author">
                {content.card.authorPrefix}{" "}
                {note.author?.pseudo || content.card.unknownUser}
              </p>

              <p className="admin-note-date">
                {new Date(note.createdAt).toLocaleDateString("fr-FR")}
              </p>

              <p className="admin-note-excerpt">{note.excerpt}</p>

              <Link
                className="btn btn-secondary"
                to={`/admin/content/notes/${note._id}`}
              >
                {content.card.viewAction}
              </Link>

              <button
                className="btn btn-ghost"
                type="button"
                onClick={() => {
                  setNoteToDelete(note);
                  setIsModalOpen(true);
                }}
              >
                {content.card.moderateAction}
              </button>
            </article>
          ))
        )}
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        title={content.modal.title}
        text={content.modal.text}
        confirmLabel={content.modal.confirmLabel}
        onClose={() => {
          setIsModalOpen(false);
          setNoteToDelete(null);
        }}
        onConfirm={() => {
          handleDelete(noteToDelete?._id);
          setIsModalOpen(false);
          setNoteToDelete(null);
        }}
      />

      <PageFooterNavigation
        backTo={content.footer.backTo}
        backLabel={content.footer.backLabel}
      />
    </section>
  );
}
