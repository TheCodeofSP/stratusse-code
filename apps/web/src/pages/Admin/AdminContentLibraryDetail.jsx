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

import { getBookUniverseLabel } from "../../utils/library.utils.js";

import "../../styles/pages/admin-content-detail.scss";

export default function AdminContentLibraryDetail() {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const content = adminDashboardContent.contentDetail.library;

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await adminContentService.getLibraryById(id);
        setBook(data);
      } catch (error) {
        console.error(error);
        toast.error(content.messages.loadError);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleDelete = async () => {
    try {
      await adminContentService.deleteLibrary(id);

      toast.success(content.messages.deleteSuccess);

      setBook((prev) => ({
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

  if (!book) {
    return <p>{content.notFound}</p>;
  }

  return (
    <section className="page-section admin-content-detail-page">
      <AdminPageHeader
        eyebrow={content.header.eyebrow}
        title={book.title}
        subtitle={`${book.author} · ${content.header.recommendedByPrefix} ${
          book.recommendedBy?.pseudo || content.header.unknownUser
        }`}
      />

      <div className="admin-content-detail-grid">
        <article className="paper-card admin-content-detail-card">
          <h2>{content.sections.information}</h2>

          <dl className="admin-content-detail-list">
            <div>
              <dt>{content.fields.subject}</dt>
              <dd>{book.subject}</dd>
            </div>

            <div>
              <dt>{content.fields.universe}</dt>
              <dd>{getBookUniverseLabel(book.universe)}</dd>
            </div>

            <div>
              <dt>{content.fields.readingState}</dt>
              <StatusBadge
                label={
                  content.readingStatus[book.readingStatus]?.label ||
                  book.readingStatus
                }
                variant={content.readingStatus[book.readingStatus]?.variant}
              />
            </div>

            <div>
              <dt>{content.fields.publicationState}</dt>
              <StatusBadge
                label={content.publicationStatus[book.status]?.label}
                variant={content.publicationStatus[book.status]?.variant}
              />
            </div>

            <div>
              <dt>{content.fields.moderationState}</dt>
              <dd>
                {book.isDeleted
                  ? content.moderationState.deleted
                  : content.moderationState.active}
              </dd>
            </div>

            <div>
              <dt>{content.fields.likes}</dt>
              <dd>{book.likedBy?.length || 0}</dd>
            </div>

            <div>
              <dt>{content.fields.createdAt}</dt>
              <dd>{new Date(book.createdAt).toLocaleDateString("fr-FR")}</dd>
            </div>
          </dl>
        </article>

        <article className="paper-card admin-content-detail-card">
          <h2>{content.sections.creator}</h2>

          <p>{book.recommendedBy?.pseudo || content.header.unknownUser}</p>

          {book.recommendedBy?.email && (
            <p className="text-muted">{book.recommendedBy.email}</p>
          )}

          {book.recommendedBy?.role && (
            <p className="text-muted">{book.recommendedBy.role}</p>
          )}
        </article>

        <article className="paper-card admin-content-detail-card admin-content-detail-card--wide">
          <h2>{content.sections.content}</h2>

          <div className="admin-content-detail-text">
            {book.startedBecause && (
              <section>
                <h3>{content.textSections.startedBecause}</h3>
                <p>{book.startedBecause}</p>
              </section>
            )}

            {book.readingExpectation && (
              <section>
                <h3>{content.textSections.readingExpectation}</h3>
                <p>{book.readingExpectation}</p>
              </section>
            )}

            {book.opinion && (
              <section>
                <h3>{content.textSections.opinion}</h3>
                <p>{book.opinion}</p>
              </section>
            )}

            {book.whyRecommend && (
              <section>
                <h3>{content.textSections.whyRecommend}</h3>
                <p>{book.whyRecommend}</p>
              </section>
            )}

            {book.abandonedReason && (
              <section>
                <h3>{content.textSections.abandonedReason}</h3>
                <p>{book.abandonedReason}</p>
              </section>
            )}

            {book.disappointment && (
              <section>
                <h3>{content.textSections.disappointment}</h3>
                <p>{book.disappointment}</p>
              </section>
            )}
          </div>
        </article>

        {book.isDeleted && book.moderation && (
          <article className="paper-card admin-content-detail-card admin-content-detail-card--wide">
            <h2>{content.sections.moderation}</h2>

            <dl className="admin-content-detail-list">
              <div>
                <dt>{content.fields.reason}</dt>
                <dd>{book.moderation.reason || content.moderation.fallback}</dd>
              </div>

              <div>
                <dt>{content.fields.adminComment}</dt>
                <dd>
                  {book.moderation.adminComment || content.moderation.fallback}
                </dd>
              </div>

              {book.moderation.moderatedAt && (
                <div>
                  <dt>{content.fields.date}</dt>
                  <dd>
                    {new Date(book.moderation.moderatedAt).toLocaleDateString(
                      "fr-FR",
                    )}
                  </dd>
                </div>
              )}

              {book.moderation.moderatedBy && (
                <div>
                  <dt>{content.fields.moderatedBy}</dt>
                  <dd>{book.moderation.moderatedBy.pseudo}</dd>
                </div>
              )}
            </dl>
          </article>
        )}

        {!book.isDeleted && (
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
