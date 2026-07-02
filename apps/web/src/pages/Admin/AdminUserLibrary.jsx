import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { adminUserService } from "../../api/adminUser.service.js";
import { adminDashboardContent } from "../../content/adminDashboard.content.js";

import PageFooterNavigation from "../../components/navigation/PageFooterNavigation.jsx";
import StatusBadge from "../../components/common/StatusBadge.jsx";
import AdminPageHeader from "../../components/admin/AdminPageHeader.jsx";
import AdminFilterBar from "../../components/admin/AdminFilterBar.jsx";
import AdminLoading from "../../components/admin/AdminLoading.jsx";
import AdminEmptyState from "../../components/admin/AdminEmptyState.jsx";

export default function AdminUserLibrary() {
  const { id } = useParams();

  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const content = adminDashboardContent.userActivity;
  const pageContent = content.library;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await adminUserService.getLibrary(id);
        setBooks(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [id]);

  const filteredBooks = books.filter((book) => {
    if (filter === "published") {
      return book.status === "published" && !book.isDeleted;
    }

    if (filter === "draft") {
      return book.status === "draft" && !book.isDeleted;
    }

    if (filter === "reading") {
      return book.readingStatus === "reading" && !book.isDeleted;
    }

    if (filter === "finished") {
      return book.readingStatus === "finished" && !book.isDeleted;
    }

    if (filter === "abandoned") {
      return book.readingStatus === "abandoned" && !book.isDeleted;
    }

    if (filter === "deleted") {
      return book.isDeleted;
    }

    return true;
  });

  if (loading) {
    return <AdminLoading text={pageContent.loading} />;
  }

  return (
    <section className="page-section">
      <AdminPageHeader
        eyebrow={pageContent.eyebrow}
        title={pageContent.title}
        subtitle={pageContent.subtitle}
      />

      <AdminFilterBar
        filters={content.libraryFilters}
        value={filter}
        onChange={setFilter}
      />

      <div className="stack-md">
        {filteredBooks.length === 0 ? (
          <AdminEmptyState text={pageContent.empty} />
        ) : (
          filteredBooks.map((book) => (
            <article key={book._id} className="paper-card">
              <h2>{book.title}</h2>

              {book.isDeleted && (
                <p className="form-error">{content.moderationState.deleted}</p>
              )}

              <p className="text-muted">
                {pageContent.createdAtPrefix}{" "}
                {new Date(book.createdAt).toLocaleDateString("fr-FR")}
              </p>

              <StatusBadge
                label={
                  content.readingStatus[book.readingStatus]?.label ||
                  book.readingStatus
                }
                variant={content.readingStatus[book.readingStatus]?.variant}
              />

              <StatusBadge
                label={
                  content.publicationStatus[book.status]?.label || book.status
                }
                variant={content.publicationStatus[book.status]?.variant}
              />

              <Link
                className="btn btn-secondary"
                to={`/admin/content/library/${book._id}`}
              >
                {pageContent.moderationAction}
              </Link>
            </article>
          ))
        )}
      </div>

      <PageFooterNavigation
        backTo={`/admin/users/${id}`}
        backLabel={content.footer.backLabel}
      />
    </section>
  );
}
