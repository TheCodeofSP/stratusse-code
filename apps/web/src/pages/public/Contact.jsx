import { useEffect, useState } from "react";

import api from "../../api/api.js";
import { publicContent } from "../../content/public.content.js";
import { seoContent } from "../../content/seo.content.js";

import PageFooterNavigation from "../../components/navigation/PageFooterNavigation.jsx";
import SEO from "../../components/seo/SEO.jsx";
import TurnstileField from "../../components/security/TurnstileField.jsx";

import "../../styles/pages/contact.scss";

export default function Contact() {
  const content = publicContent.contact;

  const [formData, setFormData] = useState({
    email: "",
    message: "",
    website: "",
    captchaToken: "",
    formStartedAt: 0,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [captchaResetKey, setCaptchaResetKey] = useState(0);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      formStartedAt: Date.now(),
    }));
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setFeedback("");
    setIsSubmitting(true);

    try {
      await api.post("/contact", formData);

      setFeedback(content.form.successMessage);
      setFormData({
        email: "",
        message: "",
        website: "",
        captchaToken: "",
        formStartedAt: Date.now(),
      });
      setCaptchaResetKey((value) => value + 1);
    } catch (error) {
      console.error(error);
      setFeedback(content.form.errorMessage);
      setFormData((prev) => ({ ...prev, captchaToken: "" }));
      setCaptchaResetKey((value) => value + 1);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title={seoContent.pages.contact.title}
        description={seoContent.pages.contact.description}
        image={seoContent.pages.contact.image}
        url={`${seoContent.site.url}/contact`}
      />

      <section className="contact-page">
        <header className="contact-hero">
          <span className="contact-hero__badge">{content.hero.eyebrow}</span>

          <h1 className="contact-hero__title">{content.hero.title}</h1>
          <p className="contact-hero__subtitle">{content.hero.subtitle}</p>

          <div className="contact-hero__intro">
            {content.hero.introduction.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </header>

        <div className="home-interlude" aria-hidden="true">
          <span />
        </div>

        <section className="contact-content">
          <section className="paper-card contact-section">
            <h2>{content.whyContact.title}</h2>

            {content.whyContact.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>

          <section className="paper-card contact-section">
            <h2>{content.response.title}</h2>

            {content.response.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>

          <section className="paper-card contact-section">
            <h2>{content.topics.title}</h2>

            <ul>
              {content.topics.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="paper-card contact-form-card">
            <h2>{content.form.messageLabel}</h2>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">{content.form.emailLabel}</label>
                <input
                  className="form-select"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={content.form.emailPlaceholder}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  {content.form.messageLabel}
                </label>

                <textarea
                  className="form-textarea"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={content.form.messagePlaceholder}
                  rows={8}
                  required
                  minLength={10}
                />
              </div>

              <div className="contact-honeypot" aria-hidden="true">
                <label htmlFor="contact-website">
                  Ne pas remplir ce champ
                </label>
                <input
                  id="contact-website"
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <TurnstileField
                resetKey={captchaResetKey}
                onTokenChange={(captchaToken) =>
                  setFormData((prev) => ({ ...prev, captchaToken }))
                }
              />

              {feedback && <p className="form-help">{feedback}</p>}

              <button
                className="btn btn-primary"
                type="submit"
                disabled={isSubmitting || !formData.captchaToken}
              >
                {isSubmitting
                  ? content.form.submittingLabel
                  : content.form.submitLabel}{" "}
              </button>
            </form>
          </section>
        </section>

        <section className="quote-closing">
          <blockquote>{content.closing.reflection}</blockquote>

          <footer>{content.closing.signature}</footer>
        </section>

        <PageFooterNavigation />
      </section>
    </>
  );
}
