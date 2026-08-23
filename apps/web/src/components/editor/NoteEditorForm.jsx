import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { noteService } from "../../api/note.service.js";
import { editorContent } from "../../content/editor.content.js";

import PageFooterNavigation from "../navigation/PageFooterNavigation.jsx";

import "../../styles/components/note-editor-form.scss";

export default function NoteEditorForm({ noteId }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    excerpt: "",
    content: "",
  });

  const [currentStatus, setCurrentStatus] = useState("draft");
  const [hasBeenPublished, setHasBeenPublished] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const noteEditorContent = editorContent.noteEditor;

  useEffect(() => {
    const fetchNote = async () => {
      if (!noteId) return;

      try {
        const response = await noteService.getById(noteId);
        const note = response.note || response;

        setFormData({
          title: note.title || "",
          category: note.category || "",
          excerpt: note.excerpt || "",
          content: note.content || "",
        });

        setCurrentStatus(note.status || "draft");
        setHasBeenPublished(Boolean(note.hasBeenPublished));
      } catch (error) {
        console.error(error);
      }
    };

    fetchNote();
  }, [noteId]);

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await submitNote("published");
  };

  const submitNote = async (status) => {
    setError("");

    try {
      setIsSubmitting(true);

      const payload = {
        ...formData,
        status,
        cloudColor: noteEditorContent.form.cloudColor,
      };

      let savedNote;

      if (noteId) {
        savedNote = await noteService.update(noteId, payload);
      } else {
        savedNote = await noteService.create(payload);
      }

      const note = savedNote.note || savedNote;

      setCurrentStatus(status);
      setHasBeenPublished(Boolean(note.hasBeenPublished));

      if (status === "published") {
        navigate(`/shared?type=note&slug=${note.slug}`);
        return;
      }

      toast.success(noteEditorContent.form.draftSuccess);
      navigate("/profile/writings");
    } catch (error) {
      console.error(error);

      const apiMessage =
        error.response?.data?.message ||
        (status === "published"
          ? noteEditorContent.form.publishError
          : noteEditorContent.form.draftError);

      toast.error(apiMessage);
      setError(apiMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="page-section">
      <form className="editor-form paper-card" onSubmit={handleSubmit}>
        <div className="stack-sm">
          <label className="form-label">
            {noteEditorContent.form.titleLabel}
          </label>

          <input
            className="editor-title-input"
            type="text"
            name="title"
            disabled={hasBeenPublished}
            placeholder={noteEditorContent.form.titlePlaceholder}
            value={formData.title}
            onChange={handleChange}
            required
          />

          {!hasBeenPublished && (
            <p className="form-help">
              Après la première publication, le titre ne pourra plus être
              modifié.
            </p>
          )}

          {hasBeenPublished && (
            <p className="form-help">
              Ce titre est verrouillé car cette note a déjà été publiée.
            </p>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">
            {noteEditorContent.form.categoryLabel}
          </label>

          <select
            className="form-select"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">
              {noteEditorContent.form.categoryPlaceholder}
            </option>

            {noteEditorContent.categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">
            {noteEditorContent.form.excerptLabel}
          </label>

          <textarea
            className="form-textarea editor-textarea--compact"
            name="excerpt"
            placeholder={noteEditorContent.form.excerptPlaceholder}
            value={formData.excerpt}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            {noteEditorContent.form.contentLabel}
          </label>

          <textarea
            className="form-textarea"
            name="content"
            placeholder={noteEditorContent.form.contentPlaceholder}
            value={formData.content}
            onChange={handleChange}
            required
          />
        </div>

        {error && <p className="form-error">{error}</p>}

        <div className="editor-actions">
          {currentStatus === "draft" && (
            <button
              className="btn btn-ghost"
              type="button"
              disabled={isSubmitting}
              onClick={() => submitNote("draft")}
            >
              {noteEditorContent.form.draftButtonLabel}
            </button>
          )}

          <button
            className="btn btn-primary"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? noteEditorContent.form.submittingLabel
              : currentStatus === "published"
                ? noteEditorContent.form.publishedUpdateLabel
                : noteEditorContent.form.publishButtonLabel}
          </button>
        </div>
      </form>

      <PageFooterNavigation
        backTo={noteEditorContent.form.backTo}
        backLabel={noteEditorContent.form.backLabel}
      />
    </section>
  );
}
