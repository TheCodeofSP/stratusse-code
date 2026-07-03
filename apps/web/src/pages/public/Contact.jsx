import { useState } from "react";

import api from "../../api/api.js";
import { publicContent } from "../../content/public.content.js";

import PageFooterNavigation from "../../components/navigation/PageFooterNavigation.jsx";

import "../../styles/pages/contact.scss";

export default function Contact() {
  const content = publicContent.contact;

  const [formData, setFormData] = useState({
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");

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
      });
    } catch (error) {
      console.error(error);
      setFeedback(content.form.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
              <label className="form-label">{content.form.messageLabel}</label>

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

            {feedback && <p className="form-help">{feedback}</p>}

            <button
              className="btn btn-primary"
              type="submit"
              disabled={isSubmitting}
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
  );
}
