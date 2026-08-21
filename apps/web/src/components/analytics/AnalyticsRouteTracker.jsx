import { useEffect } from "react";

import { useCookieConsent } from "../../contexts/CookieConsentContext.jsx";
import { router } from "../../router/router.jsx";
import { trackPageView } from "../../services/analytics.service.js";

const getTrackedLocation = (location) =>
  `${location.pathname}${location.search}`;

export default function AnalyticsRouteTracker() {
  const { analyticsConsent } = useCookieConsent();

  useEffect(() => {
    if (!analyticsConsent) return undefined;

    trackPageView(getTrackedLocation(router.state.location));

    return router.subscribe((state) => {
      window.setTimeout(() => {
        trackPageView(getTrackedLocation(state.location));
      }, 0);
    });
  }, [analyticsConsent]);

  return null;
}
