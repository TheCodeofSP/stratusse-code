import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { libraryCommentService } from "../../api/libraryComment.service.js";

import CommentList from "../comment/CommentList.jsx";
import CommentForm from "../comment/CommentForm.jsx";

import LoadingState from "../ui/LoadingState.jsx";
import ErrorState from "../ui/ErrorState.jsx";
import ConfirmModal from "../common/ConfirmModal.jsx";

export default function LibraryCommentSection({ bookId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await libraryCommentService.getByBook(bookId);

        setComments(data.comments || data);
      } catch (error) {
        console.error(error);

        setError("Impossible de charger les échanges de la Bibliothèque.");
      } finally {
        setLoading(false);
      }
    };

    if (bookId) {
      fetchComments();
    }
  }, [bookId]);

  const handleCreate = async (payload) => {
    try {
      const response = await libraryCommentService.create(bookId, payload);

      setComments((prev) => [...prev, response.comment || response]);

      toast.success("Réponse publiée.");
    } catch (error) {
      console.error(error);

      toast.error("Impossible de publier la réponse.");
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await libraryCommentService.remove(commentId);

      setComments((prev) =>
        prev.filter((comment) => comment._id !== commentId),
      );

      toast.success("Réponse supprimée.");
    } catch (error) {
      console.error(error);
      toast.error("Impossible de supprimer la réponse.");
    }
  };

  if (loading) {
    return (
      <LoadingState text="Les réactions autour du livre prennent place..." />
    );
  }

  if (error) {
    return <ErrorState text={error} />;
  }

  const handleLike = async (commentId) => {
    return libraryCommentService.like(commentId);
  };

  const handleUnlike = async (commentId) => {
    return libraryCommentService.unlike(commentId);
  };

  return (
    <section className="comment-section stack-md">
      <h2 className="comment-section__title">
        Échanges autour de cette lecture
      </h2>
      <p className="comment-section__invitation">
        Si cette lecture fait écho à quelque chose en toi, tu peux laisser une
        réponse.
      </p>

      <CommentList
        comments={comments}
        onDelete={handleDelete}
        onLike={handleLike}
        onUnlike={handleUnlike}
      />

      <CommentForm onSubmit={handleCreate} />
    </section>
  );
}
