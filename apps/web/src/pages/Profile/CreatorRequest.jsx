import { useEffect, useState } from "react";

import { profileContent } from "../../content/profile.content.js";
import { creatorRequestService } from "../../api/creatorRequest.service";

import PageFooterNavigation from "../../components/navigation/PageFooterNavigation.jsx";

import "../../styles/pages/creatorRequest.scss";

export default function CreatorRequest() {
  const creatorRequestContent = profileContent.creatorRequest;

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
      setRequest(response.request);

      setSuccess("Ta demande a été envoyée 🌿");
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message || "Impossible d’envoyer la demande.",
      );
    }
  };

  if (loading) {
    return <p>Chargement...</p>;
  }

  return (
    <section className="page-section creator-request-page">
      <header className="page-header">
        <h1>{profileContent.creatorRequest.hero.title}</h1>

        {profileContent.creatorRequest.hero.introduction.map((paragraph) => (
          <p className="text-muted" key={paragraph}>
            {paragraph}
          </p>
        ))}
      </header>

      {!request && (
        <div className="creator-request-intro info-panel info-panel--warning">
          <section>
            <h2>{profileContent.creatorRequest.observer.title}</h2>
            <p className="text-muted">
              {profileContent.creatorRequest.observer.introduction}
            </p>

            <ul>
              {profileContent.creatorRequest.observer.actions.map((action) => (
                <li key={action}>{action}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2>{profileContent.creatorRequest.creator.title}</h2>
            <p className="text-muted">
              {profileContent.creatorRequest.creator.introduction}
            </p>

            <ul>
              {profileContent.creatorRequest.creator.actions.map((action) => (
                <li key={action}>{action}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2>{profileContent.creatorRequest.philosophy.title}</h2>
            <p className="text-muted">
              {profileContent.creatorRequest.philosophy.introduction}
            </p>
          </section>
        </div>
      )}

      {request?.status === "pending" && (
        <div className="paper-card creator-request-status creator-request-status--pending">
          <h2>{creatorRequestContent.statuses.pending.title}</h2>

          <p>{creatorRequestContent.statuses.pending.text}</p>
        </div>
      )}

      {request?.status === "approved" && (
        <div className="paper-card creator-request-status creator-request-status--approved">
          {" "}
          <h2>{creatorRequestContent.statuses.approved.title}</h2>
          <p>{creatorRequestContent.statuses.approved.text}</p>{" "}
        </div>
      )}

      {request?.status === "rejected" && (
        <div className="paper-card creator-request-status creator-request-status--rejected">
          {" "}
          <h2>{creatorRequestContent.statuses.rejected.title}</h2>
          <p>{creatorRequestContent.statuses.rejected.text}</p>
        </div>
      )}

      {!request && (
        <form
          className="editor-form paper-card creator-request-card"
          onSubmit={handleSubmit}
        >
          {" "}
          <div className="form-group">
            <label className="form-label">
              {profileContent.creatorRequest.form.motivationLabel}
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
              {profileContent.creatorRequest.form.contributionLabel}
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
              placeholder="Titre (optionnel)"
              value={formData.firstContribution.title}
              onChange={handleContributionChange}
            />
          </div>
          <div className="form-group">
            <textarea
              className="form-textarea"
              name="content"
              placeholder="Partage une idée, un début de Note, une réflexion..."
              value={formData.firstContribution.content}
              onChange={handleContributionChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">
              {profileContent.creatorRequest.form.improvementIdeasLabel}
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
            {profileContent.creatorRequest.form.submitLabel}
          </button>
        </form>
      )}
      <section className="quote-closing">
        <blockquote>
          {profileContent.creatorRequest.closing.reflection}
        </blockquote>

        <footer>{profileContent.creatorRequest.closing.signature}</footer>
      </section>

      <PageFooterNavigation backTo="/profile" backLabel="Retour à mon profil" />
    </section>
  );
}
