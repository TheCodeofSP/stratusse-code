import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { authContent } from "../../content/auth.content.js";
import { seoContent } from "../../content/seo.content.js";

import { useAuth } from "../../contexts/AuthContext.jsx";
import { Link } from "react-router-dom";

import toast from "react-hot-toast";

import PageFooterNavigation from "../../components/navigation/PageFooterNavigation.jsx";
import SEO from "../../components/seo/SEO.jsx";

import "../../styles/pages/login.scss";

export default function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsSubmitting(true);

      await login(formData);
      setError("");
      toast.success(authContent.login.successMessage);
      navigate(authContent.login.redirectTo);
    } catch (error) {
      console.error(error);

      setError(authContent.login.errorMessage);
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
          <span className="eyebrow">{authContent.login.eyebrow}</span>
          <h1 className="auth-title">{authContent.login.title}</h1>

          <p className="auth-subtitle text-muted">
            {authContent.login.subtitle}
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">
                {authContent.login.emailLabel}
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
                {authContent.login.passwordLabel}
              </label>

              <input
                className="form-select"
                type="password"
                name="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <Link
              className="auth-forgot-link"
              to={authContent.login.forgotPasswordTo}
            >
              {authContent.login.forgotPasswordLabel}
            </Link>

            {error && <p className="form-error">{error}</p>}

            <button
              className="btn btn-primary"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? authContent.login.submittingLabel
                : authContent.login.submitLabel}
            </button>
          </form>
          <p className="auth-switch">
            {authContent.login.noAccountText}{" "}
            <Link to={authContent.login.registerTo}>
              {authContent.login.registerLink}
            </Link>
          </p>
        </div>
        <PageFooterNavigation />
      </section>
    </>
  );
}
