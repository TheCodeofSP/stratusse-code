import CommentCard from "./CommentCard.jsx";
import EmptyState from "../common/EmptyState.jsx";

import { commentContent } from "../../content/comment.content.js";

export default function CommentList({ comments, onDelete, onLike, onUnlike }) {
  if (comments.length === 0) {
    return (
      <EmptyState
        title={commentContent.list.emptyTitle}
        text={commentContent.list.emptyText}
      />
    );
  }

  return (
    <>
      {comments.map((comment, index) => (
        <CommentCard
          key={comment._id || comment.id || `${comment.content}-${index}`}
          comment={comment}
          onDelete={onDelete}
          onLike={onLike}
          onUnlike={onUnlike}
        />
      ))}
    </>
  );
}