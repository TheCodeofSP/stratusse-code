import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../../contexts/AuthContext.jsx";
import { commentContent } from "../../content/comment.content";

import "../../styles/components/comment-form.scss";

export default function CommentForm({ onSubmit }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!content.trim()) {
      return;
    }

    try {
      setIsSubmitting(true);

      await onSubmit({ content });

      setContent("");
    } catch (error) {
      console.error(error);

      setError(commentContent.form.submitError);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="comment-form-disabled info-panel">
        <p className="text-muted">{commentContent.form.loginMessage}</p>

        <button
          className="btn btn-primary"
          type="button"
          onClick={() => {
            toast(commentContent.form.loginMessage);
            navigate("/login");
          }}
        >
          {commentContent.form.loginButtonLabel}
        </button>
      </div>
    );
  }

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <textarea
        className="comment-form__textarea"
        placeholder={commentContent.form.placeholder}
        value={content}
        onChange={(event) => setContent(event.target.value)}
        required
      />

      {error && <p className="form-error">{error}</p>}

      <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? commentContent.form.submittingLabel
          : commentContent.form.submitLabel}
      </button>
    </form>
  );
}
