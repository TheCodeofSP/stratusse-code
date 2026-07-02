import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { authService } from "../../api/auth.service.js";
import { authContent } from "../../content/auth.content.js";

import PageFooterNavigation from "../../components/navigation/PageFooterNavigation.jsx";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");
  const content = authContent.resetPassword;

  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    if (!token) {
      setError(content.invalidTokenError);
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await authService.resetPassword(token, password);

      setMessage(response.message);
      setPassword("");
    } catch (error) {
      console.error(error);

      setError(error.response?.data?.message || content.submitError);
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
            <label className="form-label">{content.passwordLabel}</label>

            <input
              className="form-select"
              type="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="new-password"
              minLength={8}
              required
            />
          </div>

          {message && (
            <div className="stack-sm">
              <p className="form-success">{message}</p>

              <Link className="btn btn-secondary" to={content.loginTo}>
                {content.loginLabel}
              </Link>
            </div>
          )}

          {error && <p className="form-error">{error}</p>}

          {!message && (
            <button
              className="btn btn-primary"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? content.submittingLabel : content.submitLabel}
            </button>
          )}
        </form>

        <PageFooterNavigation />
      </div>
    </section>
  );
}
