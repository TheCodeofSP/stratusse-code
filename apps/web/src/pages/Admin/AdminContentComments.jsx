import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import { adminContentService } from "../../api/adminContent.service.js";
import { adminDashboardContent } from "../../content/adminDashboard.content.js";

import ConfirmModal from "../../components/common/ConfirmModal.jsx";
import PageFooterNavigation from "../../components/navigation/PageFooterNavigation.jsx";
import AdminPageHeader from "../../components/admin/AdminPageHeader.jsx";
import AdminLoading from "../../components/admin/AdminLoading.jsx";
import AdminEmptyState from "../../components/admin/AdminEmptyState.jsx";

import "../../styles/pages/admin-content-comments.scss";

export default function AdminContentComments() {
  const [comments, setComments] = useState([]);
  const [selectedComment, setSelectedComment] = useState(null);
  const [dateFilter, setDateFilter] = useState("all");
  const [noteFilter, setNoteFilter] = useState("all");
  const [userFilter, setUserFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

  const content = adminDashboardContent.adminContent.comments;

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const data = await adminContentService.getComments();
      setComments(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const notes = useMemo(() => {
    return [
      ...new Set(
        comments.map((comment) => comment.note?.title).filter(Boolean),
      ),
    ];
  }, [comments]);

  const users = useMemo(() => {
    return [
      ...new Set(
        comments.map((comment) => comment.author?.pseudo).filter(Boolean),
      ),
    ];
  }, [comments]);

  const filteredComments = comments.filter((comment) => {
    const matchesNote =
      noteFilter === "all" || comment.note?.title === noteFilter;

    const matchesUser =
      userFilter === "all" || comment.author?.pseudo === userFilter;

    const commentDate = new Date(comment.createdAt);
    const now = new Date();

    const matchesDate =
      dateFilter === "all" ||
      (dateFilter === "today" &&
        commentDate.toDateString() === now.toDateString()) ||
      (dateFilter === "week" && now - commentDate <= 7 * 24 * 60 * 60 * 1000) ||
      (dateFilter === "month" && now - commentDate <= 30 * 24 * 60 * 60 * 1000);

    return matchesNote && matchesUser && matchesDate;
  });

  const handleDelete = async (commentId) => {
    if (!commentId) return;

    try {
      await adminContentService.deleteComment(commentId);

      setComments((prev) =>
        prev.filter((comment) => comment._id !== commentId),
      );

      setSelectedComment(null);

      toast.success(content.messages.deleteSuccess);
    } catch (error) {
      console.error(error);
      toast.error(content.messages.deleteError);
    }
  };

  if (loading) {
    return <AdminLoading text={content.loading} />;
  }

  return (
    <section className="page-section admin-content-comments-page">
      <AdminPageHeader
        title={content.header.title}
        subtitle={content.header.subtitle}
      />

      <div className="filter-field-bar">
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
          value={noteFilter}
          onChange={(event) => setNoteFilter(event.target.value)}
        >
          <option value="all">{content.filters.notes.all}</option>

          {notes.map((note) => (
            <option key={note} value={note}>
              {note}
            </option>
          ))}
        </select>

        <select
          value={userFilter}
          onChange={(event) => setUserFilter(event.target.value)}
        >
          <option value="all">{content.filters.users.all}</option>

          {users.map((user) => (
            <option key={user} value={user}>
              {user}
            </option>
          ))}
        </select>
      </div>

      <div className="admin-comment-grid">
        {filteredComments.length === 0 ? (
          <AdminEmptyState text="Aucun commentaire à afficher." />
        ) : (
          filteredComments.map((comment) => (
            <article
              key={comment._id}
              className="admin-comment-card admin-card"
            >
              <span className="admin-comment-date">
                {new Date(comment.createdAt).toLocaleDateString("fr-FR")}
              </span>

              <h2>{comment.author?.pseudo || content.card.unknownUser}</h2>

              <p className="admin-comment-context">
                {content.card.notePrefix}{" "}
                {comment.note?.title || content.card.deletedNote}
              </p>

              <p className="admin-comment-excerpt">{comment.content}</p>

              <p className="admin-comment-likes">
                ♥ {comment.likesCount || 0} {content.card.likesSuffix}
              </p>

              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => setSelectedComment(comment)}
              >
                {content.card.viewAction}
              </button>
            </article>
          ))
        )}
      </div>

      {selectedComment && (
        <div className="admin-comment-detail admin-card-detail">
          <div className="stack-sm">
            <h2>
              {content.detail.titlePrefix} {selectedComment.author?.pseudo}
            </h2>

            <p className="text-muted">
              {content.detail.linkedNotePrefix}{" "}
              {selectedComment.note?.title || content.detail.deletedNote}
            </p>
          </div>

          <div className="admin-comment-context-box admin-card-context">
            <p>
              ♥ {selectedComment.likesCount || 0} {content.detail.likesSuffix}
            </p>

            <p>
              {content.detail.datePrefix}{" "}
              {new Date(selectedComment.createdAt).toLocaleDateString("fr-FR")}
            </p>
          </div>

          <div className="admin-comment-content">{selectedComment.content}</div>

          <button
            className="btn btn-ghost"
            type="button"
            onClick={() => {
              setCommentToDelete(selectedComment._id);
              setIsModalOpen(true);
            }}
          >
            {content.detail.deleteAction}
          </button>
        </div>
      )}

      <ConfirmModal
        isOpen={isModalOpen}
        title={content.modal.title}
        text={content.modal.text}
        confirmLabel={content.modal.confirmLabel}
        onClose={() => {
          setIsModalOpen(false);
          setCommentToDelete(null);
        }}
        onConfirm={() => {
          handleDelete(commentToDelete);
          setIsModalOpen(false);
          setCommentToDelete(null);
        }}
      />

      <PageFooterNavigation
        backTo={content.footer.backTo}
        backLabel={content.footer.backLabel}
      />
    </section>
  );
}
