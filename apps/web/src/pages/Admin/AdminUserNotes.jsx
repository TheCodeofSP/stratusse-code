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

export default function AdminUserNotes() {
  const { id } = useParams();

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const content = adminDashboardContent.userActivity;
  const pageContent = content.notes;

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await adminUserService.getNotes(id);
        setNotes(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [id]);

  const filteredNotes = notes.filter((note) => {
    if (filter === "published") {
      return note.status === "published" && !note.isDeleted;
    }

    if (filter === "draft") {
      return note.status === "draft" && !note.isDeleted;
    }

    if (filter === "deleted") {
      return note.isDeleted;
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
        filters={content.filters}
        value={filter}
        onChange={setFilter}
      />

      <div className="stack-md">
        {filteredNotes.length === 0 ? (
          <AdminEmptyState text={pageContent.empty} />
        ) : (
          filteredNotes.map((note) => (
            <article key={note._id} className="paper-card">
              <h2>{note.title}</h2>

              <p className="text-muted">
                {pageContent.createdAtPrefix}{" "}
                {new Date(note.createdAt).toLocaleDateString("fr-FR")}
              </p>

              <StatusBadge
                label={
                  note.isDeleted
                    ? content.status.deleted.label
                    : content.status[note.status]?.label
                }
                variant={
                  note.isDeleted
                    ? content.status.deleted.variant
                    : content.status[note.status]?.variant
                }
              />

              <Link
                className="btn btn-secondary"
                to={`/admin/content/notes/${note._id}`}
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
