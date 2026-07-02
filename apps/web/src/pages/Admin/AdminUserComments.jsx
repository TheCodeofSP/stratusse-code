import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { adminUserService } from "../../api/adminUser.service.js";
import { adminDashboardContent } from "../../content/adminDashboard.content.js";

import PageFooterNavigation from "../../components/navigation/PageFooterNavigation.jsx";
import AdminPageHeader from "../../components/admin/AdminPageHeader.jsx";
import AdminFilterBar from "../../components/admin/AdminFilterBar.jsx";
import AdminLoading from "../../components/admin/AdminLoading.jsx";
import AdminEmptyState from "../../components/admin/AdminEmptyState.jsx";

export default function AdminUserComments() {
  const { id } = useParams();

  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const content = adminDashboardContent.userActivity;
  const pageContent = content.comments;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await adminUserService.getComments(id);
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
      return !comment.note?.isDeleted;
    }

    if (filter === "deleted") {
      return comment.note?.isDeleted;
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
        filters={content.commentFilters}
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
                {pageContent.notePrefix}{" "}
                {comment.note?.title || pageContent.unavailableNote}
              </p>

              {comment.note?.isDeleted && (
                <p className="form-error">{pageContent.deletedNote}</p>
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
