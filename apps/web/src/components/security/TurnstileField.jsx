import { Turnstile } from "@marsidev/react-turnstile";

import "../../styles/components/turnstile-field.scss";

const siteKey =
  import.meta.env.VITE_TURNSTILE_SITE_KEY ||
  (import.meta.env.DEV ? "1x00000000000000000000AA" : "");

export default function TurnstileField({
  onTokenChange,
  resetKey,
  label = "Vérification de sécurité",
}) {
  if (!siteKey) {
    return (
      <p className="form-error">
        La vérification de sécurité n’est pas configurée.
      </p>
    );
  }

  return (
    <div className="turnstile-field">
      <span className="turnstile-field__label">{label}</span>

      <Turnstile
        key={resetKey}
        siteKey={siteKey}
        onSuccess={(token) => onTokenChange(token)}
        onExpire={() => onTokenChange("")}
        onError={() => onTokenChange("")}
        options={{
          appearance: "interaction-only",
          language: "fr",
          size: "flexible",
          theme: "light",
        }}
      />
    </div>
  );
}
