import { Link } from "react-router-dom";

import { useCookieConsent } from "../../contexts/CookieConsentContext.jsx";
import { isAnalyticsConfigured } from "../../services/analytics.service.js";

import "../../styles/components/cookie-consent.scss";

export default function CookieConsentBanner() {
  const {
    acceptAnalytics,
    closePreferences,
    hasMadeChoice,
    isBannerVisible,
    refuseAnalytics,
  } = useCookieConsent();

  if (!isBannerVisible || !isAnalyticsConfigured()) return null;

  return (
    <section
      className="cookie-consent"
      aria-labelledby="cookie-consent-title"
      role="region"
    >
      <div className="cookie-consent__content">
        <div>
          <h2 id="cookie-consent-title">Vos choix concernant les cookies</h2>
          <p>
            Stratusse utilise des cookies nécessaires à son fonctionnement. Avec
            votre accord, Google Analytics nous aide aussi à comprendre quelles
            pages sont consultées. Aucun cookie publicitaire n’est utilisé.
          </p>
          <Link to="/cookie-policy">Consulter la politique de cookies</Link>
        </div>

        <div className="cookie-consent__actions">
          <button
            className="btn btn-secondary"
            type="button"
            onClick={refuseAnalytics}
          >
            Refuser
          </button>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={acceptAnalytics}
          >
            Accepter
          </button>
          {hasMadeChoice && (
            <button
              className="cookie-consent__close"
              type="button"
              onClick={closePreferences}
            >
              Fermer sans modifier
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
