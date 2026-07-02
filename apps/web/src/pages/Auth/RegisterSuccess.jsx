import { useLocation } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

import { authService } from "../../api/auth.service.js";
import { authContent } from "../../content/auth.content.js";

import PageFooterNavigation from "../../components/navigation/PageFooterNavigation.jsx";

export default function RegisterSuccess() {
  const location = useLocation();

  const email = location.state?.email;
  const content = authContent.registerSuccess;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleResend = async () => {
    if (!email) return;

    try {
      setIsSubmitting(true);

      await authService.resendVerificationEmail(email);

      toast.success(content.resendSuccess);
    } catch (error) {
      console.error(error);

      toast.error(content.resendError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="page-section">
      <header className="page-header">
        <span className="eyebrow">{content.eyebrow}</span>

        <h1>{content.title}</h1>

        {content.text.map((paragraph) => (
          <p className="text-muted" key={paragraph}>
            {paragraph}
          </p>
        ))}
      </header>

      {email && (
        <button
          className="btn btn-secondary"
          type="button"
          onClick={handleResend}
          disabled={isSubmitting}
        >
          {isSubmitting ? content.resendingLabel : content.resendLabel}
        </button>
      )}

      <PageFooterNavigation />
    </section>
  );
}
