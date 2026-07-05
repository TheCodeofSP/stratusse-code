import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { authContent } from "../../content/auth.content.js";
import { seoContent } from "../../content/seo.content.js";

import { useAuth } from "../../contexts/AuthContext.jsx";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import PageFooterNavigation from "../../components/navigation/PageFooterNavigation.jsx";
import SEO from "../../components/seo/SEO.jsx";

import "../../styles/pages/register.scss";

export default function Register() {
  const navigate = useNavigate();

  const { register } = useAuth();

  const [formData, setFormData] = useState({
    pseudo: "",
    email: "",
    password: "",
    hasAcceptedCharter: false,
    hasAcceptedTerms: false,
    hasAcceptedPrivacy: false,
  });

  const [error, setError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    try {
      setIsSubmitting(true);

      await register(formData);

      navigate(authContent.register.successTo, {
        state: {
          email: formData.email,
        },
      });
    } catch (error) {
      console.error(error);

      const apiMessage =
        error.response?.data?.message || authContent.register.errorMessage;

      setError(apiMessage);
      toast.error(apiMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title={seoContent.pages.login.title}
        description={seoContent.pages.login.description}
        robots={seoContent.pages.login.robots}
        url={`${seoContent.site.url}/login`}
      />
      <section className="auth-page">
        <div className="paper-card auth-card">
          <span className="eyebrow">{authContent.register.eyebrow}</span>
          <h1 className="auth-title">{authContent.register.title}</h1>

          <p className="auth-subtitle text-muted">
            {authContent.register.subtitle}
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">
                {authContent.register.pseudoLabel}
              </label>

              <input
                className="form-select"
                type="text"
                name="pseudo"
                autoComplete="username"
                value={formData.pseudo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                {authContent.register.emailLabel}
              </label>

              <input
                className="form-select"
                type="email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                {authContent.register.passwordLabel}
              </label>

              <input
                className="form-select"
                type="password"
                name="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
              />
              <p className="form-help">
                8 caractères minimum, une majuscule, un chiffre et un caractère
                spécial.
              </p>
            </div>

            <label className="checkbox-group info-panel">
              <input
                className="register-charter__checkbox"
                type="checkbox"
                name="hasAcceptedCharter"
                checked={formData.hasAcceptedCharter}
                onChange={handleChange}
                required
              />

              <span>
                {authContent.register.charterLabel}{" "}
                <Link to="/charter" target="_blank" rel="noreferrer">
                  Lire la Charte
                </Link>
              </span>
            </label>
            <label className="checkbox-group info-panel">
              <input
                className="register-charter__checkbox"
                type="checkbox"
                name="hasAcceptedTerms"
                checked={formData.hasAcceptedTerms}
                onChange={handleChange}
                required
              />

              <span>
                {authContent.register.termsLabel}{" "}
                <Link to="/terms-of-use" target="_blank" rel="noreferrer">
                  Lire les Conditions d’utilisation
                </Link>
              </span>
            </label>

            <label className="checkbox-group info-panel">
              <input
                className="register-charter__checkbox"
                type="checkbox"
                name="hasAcceptedPrivacy"
                checked={formData.hasAcceptedPrivacy}
                onChange={handleChange}
                required
              />

              <span>
                {authContent.register.privacyLabel}{" "}
                <Link to="/privacy-policy" target="_blank" rel="noreferrer">
                  Lire la Politique de confidentialité
                </Link>
              </span>
            </label>

            {error && <p className="form-error">{error}</p>}

            <button
              className="btn btn-primary"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? authContent.register.submittingLabel
                : authContent.register.submitLabel}
            </button>
          </form>
          <p className="auth-switch">
            {authContent.register.alreadyAccountText}{" "}
            <Link to={authContent.register.loginTo}>
              {authContent.register.loginLink}
            </Link>
          </p>
        </div>
        <PageFooterNavigation />
      </section>
    </>
  );
}
