import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { adminUserService } from "../../api/adminUser.service.js";
import { adminDashboardContent } from "../../content/adminDashboard.content.js";

import PageFooterNavigation from "../../components/navigation/PageFooterNavigation.jsx";
import AdminPageHeader from "../../components/admin/AdminPageHeader.jsx";
import AdminFilterBar from "../../components/admin/AdminFilterBar.jsx";
import AdminLoading from "../../components/admin/AdminLoading.jsx";
import AdminEmptyState from "../../components/admin/AdminEmptyState.jsx";

export default function AdminUserLibraryComments() {
  const { id } = useParams();

  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const content = adminDashboardContent.userActivity;
  const pageContent = content.libraryComments;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await adminUserService.getLibraryComments(id);
        setComments(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [id]);

  const filteredComments = comments.filter((comment) => {
    if (filter === "active") {
      return !comment.book?.isDeleted;
    }

    if (filter === "deleted") {
      return comment.book?.isDeleted;
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
        filters={content.libraryCommentFilters}
        value={filter}
        onChange={setFilter}
      />

      <div className="stack-md">
        {filteredComments.length === 0 ? (
          <AdminEmptyState text={pageContent.empty} />
        ) : (
          filteredComments.map((comment) => (
            <article key={comment._id} className="paper-card">
              <p>{comment.content}</p>

              <p className="text-muted">
                {pageContent.bookPrefix}{" "}
                {comment.book?.title || pageContent.unavailableBook}
              </p>

              {comment.book?.author && (
                <p className="text-muted">
                  {pageContent.authorPrefix} {comment.book.author}
                </p>
              )}

              {comment.book?.isDeleted && (
                <p className="form-error">{pageContent.deletedBook}</p>
              )}

              <p className="text-muted">
                {pageContent.createdAtPrefix}{" "}
                {new Date(comment.createdAt).toLocaleDateString("fr-FR")}
              </p>
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
