import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { adminDashboardContent } from "../../content/adminDashboard.content.js";
import { adminContentService } from "../../api/adminContent.service.js";

import PageFooterNavigation from "../../components/navigation/PageFooterNavigation.jsx";
import StatusBadge from "../../components/common/StatusBadge.jsx";
import AdminPageHeader from "../../components/admin/AdminPageHeader.jsx";
import AdminLoading from "../../components/admin/AdminLoading.jsx";
import AdminEmptyState from "../../components/admin/AdminEmptyState.jsx";

import "../../styles/pages/admin-content-library.scss";

export default function AdminContentLibrary() {
  const [libraryBooks, setLibraryBooks] = useState([]);
  const [creatorFilter, setCreatorFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [titleFilter, setTitleFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [reasonFilter, setReasonFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const content = adminDashboardContent.adminContent.library;

  const fetchLibraryBooks = useCallback(async () => {
    try {
      const data = await adminContentService.getLibrary();
      setLibraryBooks(data);
    } catch (error) {
      console.error(error);
      toast.error(content.messages.loadError);
    } finally {
      setLoading(false);
    }
  }, [content.messages.loadError]);

  useEffect(() => {
    fetchLibraryBooks();
  }, [fetchLibraryBooks]);

  const creators = useMemo(() => {
    return [
      ...new Set(
        libraryBooks.map((book) => book.recommendedBy?.pseudo).filter(Boolean),
      ),
    ];
  }, [libraryBooks]);

  const subjects = useMemo(() => {
    return [
      ...new Set(libraryBooks.map((book) => book.subject).filter(Boolean)),
    ];
  }, [libraryBooks]);

  const reasons = useMemo(() => {
    return [
      ...new Set(libraryBooks.map((book) => book.whyRecommend).filter(Boolean)),
    ];
  }, [libraryBooks]);

  const filteredLibraryBooks = libraryBooks.filter((book) => {
    const matchesCreator =
      creatorFilter === "all" || book.recommendedBy?.pseudo === creatorFilter;

    const matchesTitle =
      !titleFilter ||
      book.title?.toLowerCase().includes(titleFilter.toLowerCase());

    const matchesSubject =
      subjectFilter === "all" || book.subject === subjectFilter;

    const matchesReason =
      reasonFilter === "all" || book.whyRecommend === reasonFilter;

    const bookDate = new Date(book.createdAt);
    const now = new Date();

    const matchesDate =
      dateFilter === "all" ||
      (dateFilter === "today" &&
        bookDate.toDateString() === now.toDateString()) ||
      (dateFilter === "week" && now - bookDate <= 7 * 24 * 60 * 60 * 1000) ||
      (dateFilter === "month" && now - bookDate <= 30 * 24 * 60 * 60 * 1000);

    const matchesSearch =
      !search ||
      book.title?.toLowerCase().includes(search.toLowerCase()) ||
      book.author?.toLowerCase().includes(search.toLowerCase()) ||
      book.subject?.toLowerCase().includes(search.toLowerCase()) ||
      book.recommendedBy?.pseudo?.toLowerCase().includes(search.toLowerCase());

    return (
      matchesCreator &&
      matchesTitle &&
      matchesSubject &&
      matchesReason &&
      matchesDate &&
      matchesSearch
    );
  });

  if (loading) {
    return <AdminLoading text={content.loading} />;
  }

  return (
    <section className="page-section admin-content-books-page">
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

        <input
          type="text"
          placeholder={content.search.titlePlaceholder}
          value={titleFilter}
          onChange={(event) => setTitleFilter(event.target.value)}
        />

        <select
          value={subjectFilter}
          onChange={(event) => setSubjectFilter(event.target.value)}
        >
          <option value="all">{content.filters.subjects.all}</option>

          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>

        <select
          value={reasonFilter}
          onChange={(event) => setReasonFilter(event.target.value)}
        >
          <option value="all">{content.filters.reasons.all}</option>

          {reasons.map((reason) => (
            <option key={reason} value={reason}>
              {reason}
            </option>
          ))}
        </select>
      </div>

      <div className="admin-book-grid">
        {filteredLibraryBooks.length === 0 ? (
          <AdminEmptyState text="Aucune Lecture à afficher." />
        ) : (
          filteredLibraryBooks.map((book) => (
            <article key={book._id} className="admin-book-card admin-card">
              <span className="admin-book-subject">{book.subject}</span>

              <h2>{book.title}</h2>

              <p className="admin-book-author">
                {content.card.authorPrefix} {book.author}
              </p>

              <p className="admin-book-recommender">
                {content.card.sharedByPrefix}{" "}
                {book.recommendedBy?.pseudo || content.card.unknownUser}
              </p>

              <StatusBadge
                label={
                  content.readingStatus[book.readingStatus]?.label ||
                  book.readingStatus
                }
                variant={content.readingStatus[book.readingStatus]?.variant}
              />

              {book.status && (
                <StatusBadge
                  label={
                    content.publicationStatus[book.status]?.label || book.status
                  }
                  variant={content.publicationStatus[book.status]?.variant}
                />
              )}

              <p className="admin-book-reason">{book.whyRecommend}</p>

              <Link
                className="btn btn-secondary"
                to={`/admin/content/library/${book._id}`}
              >
                {content.card.viewAction}
              </Link>
            </article>
          ))
        )}
      </div>

      <PageFooterNavigation
        backTo={content.footer.backTo}
        backLabel={content.footer.backLabel}
      />
    </section>
  );
}
