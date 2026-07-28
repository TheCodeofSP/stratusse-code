import { useLocation } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

import { authService } from "../../api/auth.service.js";
import { authContent } from "../../content/auth.content.js";

import PageFooterNavigation from "../../components/navigation/PageFooterNavigation.jsx";
import TurnstileField from "../../components/security/TurnstileField.jsx";

export default function RegisterSuccess() {
  const location = useLocation();

  const email = location.state?.email;
  const content = authContent.registerSuccess;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaResetKey, setCaptchaResetKey] = useState(0);

  const handleResend = async () => {
    if (!email) return;

    try {
      setIsSubmitting(true);

      await authService.resendVerificationEmail(email, captchaToken);

      toast.success(content.resendSuccess);
      setCaptchaToken("");
      setCaptchaResetKey((value) => value + 1);
    } catch (error) {
      console.error(error);

      toast.error(content.resendError);
      setCaptchaToken("");
      setCaptchaResetKey((value) => value + 1);
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
        <>
          <TurnstileField
            resetKey={captchaResetKey}
            onTokenChange={setCaptchaToken}
          />
          <button
            className="btn btn-secondary"
            type="button"
            onClick={handleResend}
            disabled={isSubmitting || !captchaToken}
          >
            {isSubmitting ? content.resendingLabel : content.resendLabel}
          </button>
        </>
      )}

      <PageFooterNavigation />
    </section>
  );
}
