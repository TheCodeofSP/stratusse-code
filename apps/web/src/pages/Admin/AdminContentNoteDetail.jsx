import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { adminContentService } from "../../api/adminContent.service.js";
import { adminDashboardContent } from "../../content/adminDashboard.content.js";

import ConfirmModal from "../../components/common/ConfirmModal.jsx";
import PageFooterNavigation from "../../components/navigation/PageFooterNavigation.jsx";
import StatusBadge from "../../components/common/StatusBadge.jsx";
import AdminPageHeader from "../../components/admin/AdminPageHeader.jsx";
import AdminLoading from "../../components/admin/AdminLoading.jsx";

import "../../styles/pages/admin-content-detail.scss";

export default function AdminContentNoteDetail() {
  const { id } = useParams();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const content = adminDashboardContent.contentDetail.note;
  const categories = adminDashboardContent.contentDetail.categories;

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const data = await adminContentService.getNoteById(id);
        setNote(data);
      } catch (error) {
        console.error(error);
        toast.error(content.messages.loadError);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [content.messages.loadError, id]);

  const handleDelete = async () => {
    try {
      await adminContentService.deleteNote(id);

      toast.success(content.messages.deleteSuccess);

      setNote((prev) => ({
        ...prev,
        isDeleted: true,
      }));

      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error(content.messages.deleteError);
    }
  };

  if (loading) {
    return <AdminLoading text={content.loading} />;
  }

  if (!note) {
    return <p>{content.notFound}</p>;
  }

  return (
    <section className="page-section admin-content-detail-page">
      <AdminPageHeader
        eyebrow={content.header.eyebrow}
        title={note.title}
        subtitle={`Par ${
          note.author?.pseudo || content.header.unknownUser
        } · ${new Date(note.createdAt).toLocaleDateString("fr-FR")}`}
      />

      <div className="admin-content-detail-grid">
        <article className="paper-card admin-content-detail-card">
          <h2>{content.sections.information}</h2>

          <dl className="admin-content-detail-list">
            <div>
              <dt>{content.fields.category}</dt>
              <dd>{categories[note.category] || note.category}</dd>
            </div>

            <div>
              <StatusBadge
                label={content.status[note.status]?.label}
                variant={content.status[note.status]?.variant}
              />
            </div>

            <div>
              <dt>{content.fields.moderationState}</dt>
              <dd>
                {note.isDeleted
                  ? content.status.deleted
                  : content.status.active}
              </dd>
            </div>

            <div>
              <dt>{content.fields.likes}</dt>
              <dd>{note.likedBy?.length || 0}</dd>
            </div>
          </dl>
        </article>

        <article className="paper-card admin-content-detail-card">
          <h2>{content.sections.author}</h2>

          <p>{note.author?.pseudo || content.header.unknownUser}</p>

          {note.author?.email && (
            <p className="text-muted">{note.author.email}</p>
          )}

          {note.author?.role && (
            <p className="text-muted">{note.author.role}</p>
          )}
        </article>

        <article className="paper-card admin-content-detail-card admin-content-detail-card--wide">
          <h2>{content.sections.excerpt}</h2>
          <p>{note.excerpt}</p>
        </article>

        <article className="paper-card admin-content-detail-card admin-content-detail-card--wide">
          <h2>{content.sections.content}</h2>
          <div className="admin-content-detail-text">{note.content}</div>
        </article>

        {note.isDeleted && note.moderation && (
          <article className="paper-card admin-content-detail-card admin-content-detail-card--wide">
            <h2>{content.sections.moderation}</h2>

            <dl className="admin-content-detail-list">
              <div>
                <dt>{content.fields.reason}</dt>
                <dd>{note.moderation.reason || content.moderation.fallback}</dd>
              </div>

              <div>
                <dt>{content.fields.publicMessage}</dt>
                <dd>
                  {note.moderation.publicMessage || content.moderation.fallback}
                </dd>
              </div>

              <div>
                <dt>{content.fields.adminComment}</dt>
                <dd>
                  {note.moderation.adminComment || content.moderation.fallback}
                </dd>
              </div>

              {note.moderation.moderatedAt && (
                <div>
                  <dt>{content.fields.date}</dt>
                  <dd>
                    {new Date(note.moderation.moderatedAt).toLocaleDateString(
                      "fr-FR",
                    )}
                  </dd>
                </div>
              )}

              {note.moderation.moderatedBy && (
                <div>
                  <dt>{content.fields.moderatedBy}</dt>
                  <dd>{note.moderation.moderatedBy.pseudo}</dd>
                </div>
              )}
            </dl>
          </article>
        )}

        {!note.isDeleted && (
          <article className="paper-card admin-content-detail-card admin-content-detail-card--wide">
            <h2>{content.sections.actions}</h2>

            <button
              className="btn btn-ghost"
              type="button"
              onClick={() => setIsModalOpen(true)}
            >
              {content.moderation.deleteAction}
            </button>
          </article>
        )}
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        title={content.moderation.deleteTitle}
        text={content.moderation.deleteText}
        confirmLabel={content.moderation.confirmLabel}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
      />

      <PageFooterNavigation
        backTo={content.footer.backTo}
        backLabel={content.footer.backLabel}
      />
    </section>
  );
}
