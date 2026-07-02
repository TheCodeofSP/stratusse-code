import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../../contexts/AuthContext.jsx";
import { commentContent } from "../../content/comment.content";

import ConfirmModal from "../common/ConfirmModal.jsx";

import "../../styles/components/comment-card.scss";

export default function CommentCard({ comment, onDelete, onLike, onUnlike }) {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [likes, setLikes] = useState(comment.likedBy?.length || 0);

  const [hasLiked, setHasLiked] = useState(
    comment.likedBy?.some((likedUser) => {
      const likedUserId =
        typeof likedUser === "string" ? likedUser : likedUser?._id;

      return likedUserId === user?._id;
    }) || false,
  );

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const isAuthor = user?._id === comment.author?._id;
  const isAdmin = user?.role === "admin";
  const canDelete = isAuthor || isAdmin;

  const handleLike = async () => {
    if (!isAuthenticated) {
      toast(commentContent.card.likeLoginMessage);
      navigate("/login");
      return;
    }

    if (isAuthor) {
      toast(commentContent.card.ownCommentMessage);
      return;
    }

    try {
      if (hasLiked) {
        await onUnlike(comment._id);

        setLikes((prev) => prev - 1);
        setHasLiked(false);
      } else {
        await onLike(comment._id);

        setLikes((prev) => prev + 1);
        setHasLiked(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <article className="comment-card">
      <p className="comment-card__content">
        <span className="comment-card__quote-inline" aria-hidden="true">
          “
        </span>
        {comment.content}
        <span className="comment-card__quote-inline" aria-hidden="true">
          ”
        </span>
      </p>

      <div className="comment-card__signature">
        <span />

        <strong>
          {comment.author?.pseudo || commentContent.card.anonymousAuthor}
        </strong>
      </div>

      <div className="comment-card__footer">
        <button
          className={`comment-card__like ${hasLiked ? "active" : ""}`}
          type="button"
          onClick={handleLike}
        >
          {hasLiked ? "♥" : "♡"} {commentContent.card.likeLabel} ({likes})
        </button>

        {canDelete && (
          <button
            className="comment-card__delete"
            type="button"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            {commentContent.card.deleteLabel}
          </button>
        )}
      </div>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title={commentContent.card.deleteModal.title}
        text={commentContent.card.deleteModal.text}
        confirmLabel={commentContent.card.deleteModal.confirmLabel}
        cancelLabel={commentContent.card.deleteModal.cancelLabel}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={async () => {
          await onDelete(comment._id);
          setIsDeleteModalOpen(false);
        }}
      />
    </article>
  );
}
