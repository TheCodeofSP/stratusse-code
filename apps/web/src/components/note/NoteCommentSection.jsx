import { useEffect, useState } from "react";

import { commentService } from "../../api/comment.service.js";
import { notesContent } from "../../content/notes.content.js";
import { commentContent } from "../../content/comment.content.js";

import EmptyState from "../common/EmptyState.jsx";
import CommentList from "../comment/CommentList.jsx";
import CommentForm from "../comment/CommentForm.jsx";
import LoadingState from "../ui/LoadingState.jsx";
import ErrorState from "../ui/ErrorState.jsx";

import "../../styles/components/comment-section.scss";

export default function NoteCommentSection({ noteId }) {
  const [comments, setComments] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await commentService.getByNote(noteId);

        setComments(data);
      } catch (error) {
        console.error(error);

        setError(notesContent.comments.loadError);
      } finally {
        setLoading(false);
      }
    };

    if (noteId) {
      fetchComments();
    }
  }, [noteId]);

  if (loading) {
    return <LoadingState text={notesContent.comments.loading} />;
  }

  if (error) {
    return <ErrorState text={error} />;
  }

  const handleDelete = async (commentId) => {
    try {
      await commentService.remove(commentId);

      setComments((prev) =>
        prev.filter((comment) => comment._id !== commentId),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleLike = async (commentId) => {
    return commentService.like(commentId);
  };

  const handleUnlike = async (commentId) => {
    return commentService.unlike(commentId);
  };

  return (
    <section className="comment-section">
      <h2 className="comment-section__title">{notesContent.comments.title}</h2>
      <div className="comment-section__invitation">
        <p>{notesContent.comments.invitationText}</p>
      </div>
      {comments.length > 0 ? (
        <CommentList
          comments={comments}
          onDelete={handleDelete}
          onLike={handleLike}
          onUnlike={handleUnlike}
        />
      ) : (
        <EmptyState
          variant="compact"
          icon="☁️"
          title={commentContent.list.emptyTitle}
          text={commentContent.list.emptyText}
        />
      )}

      <CommentForm
        onSubmit={async (payload) => {
          const newComment = await commentService.create(noteId, payload);

          setComments((prev) => [...prev, newComment.comment || newComment]);
        }}
      />
    </section>
  );
}
