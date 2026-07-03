import { useEffect, useState } from "react";

import { creatorRequestContent } from "../../content/creatorRequest.content.js";
import { creatorRequestService } from "../../api/creatorRequest.service";

import PageFooterNavigation from "../../components/navigation/PageFooterNavigation.jsx";

import "../../styles/pages/creatorRequest.scss";

export default function CreatorRequest() {
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    motivation: "",
    firstContribution: {
      type: "note",
      title: "",
      content: "",
    },
    improvementIdeas: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const requestStatusContent = request
    ? creatorRequestContent.statuses?.[request.status]
    : null;

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const data = await creatorRequestService.getMine();

        setRequest(data?.status ? data : null);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequest();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContributionChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      firstContribution: {
        ...prev.firstContribution,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    try {
      const payload = {
        ...formData,
        writingIntent: {
          notes: formData.firstContribution.type === "note",
          books: formData.firstContribution.type === "book",
        },
      };

      const response = await creatorRequestService.create(payload);

      setRequest(response?.request || null);
      setSuccess(creatorRequestContent.form.successMessage);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message || creatorRequestContent.form.errorMessage,
      );
    }
  };

  if (loading) {
    return <p>Chargement...</p>;
  }

  return (
    <section className="page-section creator-request-page">
      <header className="page-header">
        <h1>{creatorRequestContent.hero.title}</h1>

        {creatorRequestContent.hero.introduction.map((paragraph) => (
          <p className="text-muted" key={paragraph}>
            {paragraph}
          </p>
        ))}
      </header>

      {!request && (
        <div className="creator-request-intro info-panel info-panel--warning">
          <section>
            <h2>{creatorRequestContent.observer.title}</h2>
            <p className="text-muted">
              {creatorRequestContent.observer.introduction}
            </p>

            <ul>
              {creatorRequestContent.observer.actions.map((action) => (
                <li key={action}>{action}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2>{creatorRequestContent.creator.title}</h2>
            <p className="text-muted">
              {creatorRequestContent.creator.introduction}
            </p>

            <ul>
              {creatorRequestContent.creator.actions.map((action) => (
                <li key={action}>{action}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2>{creatorRequestContent.philosophy.title}</h2>
            <p className="text-muted">
              {creatorRequestContent.philosophy.introduction}
            </p>
          </section>
        </div>
      )}

      {request && requestStatusContent && (
        <div
          className={`paper-card creator-request-status creator-request-status--${request.status}`}
        >
          <h2>{requestStatusContent.title}</h2>
          <p>{requestStatusContent.text}</p>
        </div>
      )}

      {!request && (
        <form
          className="editor-form paper-card creator-request-card"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label className="form-label">
              {creatorRequestContent.form.motivationLabel}
            </label>

            <textarea
              className="form-textarea"
              name="motivation"
              value={formData.motivation}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              {creatorRequestContent.form.contributionLabel}
            </label>

            <select
              className="form-select"
              name="type"
              value={formData.firstContribution.type}
              onChange={handleContributionChange}
            >
              <option value="note">Note</option>
              <option value="book">Lecture</option>
            </select>
          </div>

          <div className="form-group">
            <input
              className="form-select"
              type="text"
              name="title"
              placeholder={creatorRequestContent.form.titlePlaceholder}
              value={formData.firstContribution.title}
              onChange={handleContributionChange}
            />
          </div>

          <div className="form-group">
            <textarea
              className="form-textarea"
              name="content"
              placeholder={creatorRequestContent.form.contentPlaceholder}
              value={formData.firstContribution.content}
              onChange={handleContributionChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              {creatorRequestContent.form.improvementIdeasLabel}
            </label>

            <textarea
              className="form-textarea"
              name="improvementIdeas"
              value={formData.improvementIdeas}
              onChange={handleChange}
            />
          </div>

          {success && <p className="editor-success">{success}</p>}
          {error && <p className="form-error">{error}</p>}

          <button className="btn btn-primary" type="submit">
            {creatorRequestContent.form.submitLabel}
          </button>
        </form>
      )}

      <section className="quote-closing">
        <blockquote>{creatorRequestContent.closing.reflection}</blockquote>
        <footer>{creatorRequestContent.closing.signature}</footer>
      </section>

      <PageFooterNavigation backTo="/profile" backLabel="Retour à mon profil" />
    </section>
  );
}