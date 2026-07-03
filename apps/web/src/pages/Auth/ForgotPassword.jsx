import { useState } from "react";

import { authService } from "../../api/auth.service.js";
import { authContent } from "../../content/auth.content.js";

import PageFooterNavigation from "../../components/navigation/PageFooterNavigation.jsx";

export default function ForgotPassword() {
  const content = authContent.forgotPassword;

  const [email, setEmail] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    try {
      setIsSubmitting(true);

      const response = await authService.forgotPassword({
        email,
        pseudo,
      });

      setMessage(response.message);
    } catch (error) {
      console.error(error);

      setError(content.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="paper-card auth-card">
        <span className="eyebrow">{content.eyebrow}</span>

        <h1 className="auth-title">{content.title}</h1>

        <p className="auth-subtitle text-muted">{content.subtitle}</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">{content.emailLabel}</label>

            <input
              className="form-select"
              type="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">{content.pseudoLabel}</label>

            <input
              className="form-select"
              type="text"
              name="pseudo"
              value={pseudo}
              onChange={(event) => setPseudo(event.target.value)}
              autoComplete="username"
              required
            />
          </div>

          {message && <p className="form-success">{message}</p>}

          {error && <p className="form-error">{error}</p>}

          <button
            className="btn btn-primary"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? content.submittingLabel : content.submitLabel}
          </button>
        </form>

        <PageFooterNavigation />
      </div>
    </section>
  );
}
