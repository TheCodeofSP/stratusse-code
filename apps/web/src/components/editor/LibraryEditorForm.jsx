import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { libraryService } from "../../api/library.service.js";
import { editorContent } from "../../content/editor.content.js";

import PageFooterNavigation from "../navigation/PageFooterNavigation.jsx";

import "../../styles/components/note-editor-form.scss";

export default function LibraryEditorForm({ bookId }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    coverImageUrl: "",
    subject: "",
    universe: "",
    opinion: "",
    whyRecommend: "",
    readingStatus: "",
    startedBecause: "",
    readingExpectation: "",
    abandonedReason: "",
    disappointment: "",
  });

  const [currentStatus, setCurrentStatus] = useState("draft");
  const [hasBeenPublished, setHasBeenPublished] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const libraryEditorContent = editorContent.libraryEditor;

  useEffect(() => {
    const fetchBook = async () => {
      if (!bookId) return;

      try {
        const response = await libraryService.getById(bookId);
        const book = response.book || response;

        setFormData({
          title: book.title || "",
          author: book.author || "",
          coverImageUrl: book.coverImageUrl || "",
          subject: book.subject || "",
          universe: book.universe || "",
          opinion: book.opinion || "",
          whyRecommend: book.whyRecommend || "",
          readingStatus: book.readingStatus || "",
          startedBecause: book.startedBecause || "",
          readingExpectation: book.readingExpectation || "",
          abandonedReason: book.abandonedReason || "",
          disappointment: book.disappointment || "",
        });

        setCurrentStatus(book.status || "draft");
        setHasBeenPublished(Boolean(book.hasBeenPublished));
      } catch (error) {
        console.error(error);
      }
    };

    fetchBook();
  }, [bookId]);

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const submitBook = async (status) => {
    setError("");

    try {
      setIsSubmitting(true);

      const payload = {
        ...formData,
        status,
      };

      let savedBook;

      if (bookId) {
        savedBook = await libraryService.update(bookId, payload);
      } else {
        savedBook = await libraryService.create(payload);
      }

      const book = savedBook.book || savedBook;

      setCurrentStatus(status);
      setHasBeenPublished(Boolean(book.hasBeenPublished));

      if (status === "published") {
        navigate(`/shared?type=library&id=${book._id || bookId}`);
        return;
      }

      toast.success(libraryEditorContent.form.draftSuccess);
      navigate("/profile/writings");

      if (!bookId) {
        setFormData({
          title: "",
          author: "",
          coverImageUrl: "",
          subject: "",
          universe: "",
          opinion: "",
          whyRecommend: "",
          readingStatus: "",
          startedBecause: "",
          readingExpectation: "",
          abandonedReason: "",
          disappointment: "",
        });

        setCurrentStatus("draft");
        setHasBeenPublished(false);
      }
    } catch (error) {
      console.error(error);

      const apiMessage =
        error.response?.data?.message || libraryEditorContent.form.submitError;

      toast.error(apiMessage);
      setError(apiMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="editor-header">
      <form className="editor-form paper-card">
        <div className="form-group">
          <label className="form-label">
            {libraryEditorContent.form.readingStatusLabel}
          </label>

          <select
            className="form-select"
            name="readingStatus"
            value={formData.readingStatus}
            onChange={handleChange}
            required
          >
            <option value="">
              {libraryEditorContent.form.readingStatusPlaceholder}
            </option>

            {libraryEditorContent.readingStatuses.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>

        <div className="stack-sm">
          <label className="form-label">
            {libraryEditorContent.form.titleLabel}
          </label>

          <input
            className="editor-title-input"
            type="text"
            name="title"
            disabled={hasBeenPublished}
            placeholder={libraryEditorContent.form.titlePlaceholder}
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            {libraryEditorContent.form.authorLabel}
          </label>

          <input
            className="form-select"
            type="text"
            name="author"
            disabled={hasBeenPublished}
            placeholder={libraryEditorContent.form.authorPlaceholder}
            value={formData.author}
            onChange={handleChange}
            required
          />

          {!hasBeenPublished && (
            <p className="form-help">
              Après la première publication, le titre et l’auteur ne pourront
              plus être modifiés.
            </p>
          )}

          {hasBeenPublished && (
            <p className="form-help">
              Le titre et l’auteur sont verrouillés car cette recommandation a
              déjà été publiée.
            </p>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">
            {libraryEditorContent.form.subjectLabel}
          </label>

          <textarea
            className="comment-form__textarea"
            name="subject"
            placeholder={libraryEditorContent.form.subjectPlaceholder}
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            {libraryEditorContent.form.universeLabel}
          </label>

          <select
            className="form-select"
            name="universe"
            value={formData.universe}
            onChange={handleChange}
            required
          >
            <option value="">
              {libraryEditorContent.form.universePlaceholderSelect}
            </option>

            {libraryEditorContent.universes.map((universe) => (
              <option key={universe.value} value={universe.value}>
                {universe.label}
              </option>
            ))}
          </select>
        </div>

        {formData.readingStatus === "reading" && (
          <>
            <div className="form-group">
              <label className="form-label">
                {libraryEditorContent.form.startedBecauseLabel}
              </label>

              <textarea
                className="comment-form__textarea"
                name="startedBecause"
                placeholder={
                  libraryEditorContent.form.startedBecausePlaceholder
                }
                value={formData.startedBecause}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                {libraryEditorContent.form.readingExpectationLabel}
              </label>

              <textarea
                className="comment-form__textarea"
                name="readingExpectation"
                placeholder={
                  libraryEditorContent.form.readingExpectationPlaceholder
                }
                value={formData.readingExpectation}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}

        {formData.readingStatus === "finished" && (
          <>
            <div className="form-group">
              <label className="form-label">
                {libraryEditorContent.form.opinionLabel}
              </label>

              <textarea
                className="comment-form__textarea"
                name="opinion"
                placeholder={libraryEditorContent.form.opinionPlaceholder}
                value={formData.opinion}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                {libraryEditorContent.form.whyRecommendLabel}
              </label>

              <textarea
                className="form-textarea"
                name="whyRecommend"
                placeholder={libraryEditorContent.form.whyRecommendPlaceholder}
                value={formData.whyRecommend}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}

        {formData.readingStatus === "abandoned" && (
          <>
            <div className="form-group">
              <label className="form-label">
                {libraryEditorContent.form.abandonedReasonLabel}
              </label>

              <textarea
                className="comment-form__textarea"
                name="abandonedReason"
                placeholder={
                  libraryEditorContent.form.abandonedReasonPlaceholder
                }
                value={formData.abandonedReason}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                {libraryEditorContent.form.disappointmentLabel}
              </label>

              <textarea
                className="comment-form__textarea"
                name="disappointment"
                placeholder={
                  libraryEditorContent.form.disappointmentPlaceholder
                }
                value={formData.disappointment}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}

        {error && <p className="form-error">{error}</p>}

        <div className="editor-actions">
          {currentStatus === "draft" && (
            <button
              className="btn btn-ghost"
              type="button"
              disabled={isSubmitting}
              onClick={() => submitBook("draft")}
            >
              {libraryEditorContent.form.draftButtonLabel}
            </button>
          )}

          <button
            className="btn btn-primary"
            type="button"
            disabled={isSubmitting}
            onClick={() => submitBook("published")}
          >
            {isSubmitting
              ? libraryEditorContent.form.submittingLabel
              : currentStatus === "published"
                ? libraryEditorContent.form.publishedUpdateLabel
                : libraryEditorContent.form.publishButtonLabel}
          </button>
        </div>
      </form>

      <PageFooterNavigation
        backTo={libraryEditorContent.form.backTo}
        backLabel={libraryEditorContent.form.backLabel}
      />
    </section>
  );
}
