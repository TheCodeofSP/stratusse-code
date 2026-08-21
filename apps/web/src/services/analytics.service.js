const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();

let isInitialized = false;
let lastTrackedLocation = "";

function getGtag() {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer.push(arguments);
    };

  return window.gtag;
}

function removeAnalyticsCookie(name) {
  const expiration = "expires=Thu, 01 Jan 1970 00:00:00 GMT";

  document.cookie = `${name}=; ${expiration}; path=/; SameSite=Lax`;
  document.cookie = `${name}=; ${expiration}; path=/; domain=.stratusse.fr; SameSite=Lax`;
}

export function initializeAnalytics() {
  if (!measurementId) return;

  if (isInitialized) {
    window.gtag?.("consent", "update", { analytics_storage: "granted" });
    return;
  }

  const gtag = getGtag();

  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
  });
  gtag("set", "ads_data_redaction", true);
  gtag("consent", "update", { analytics_storage: "granted" });
  gtag("js", new Date());
  gtag("config", measurementId, {
    allow_ad_personalization_signals: false,
    allow_google_signals: false,
    cookie_expires: 34128000,
    cookie_update: false,
    send_page_view: false,
  });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  script.dataset.stratusseAnalytics = "true";
  document.head.appendChild(script);

  isInitialized = true;
}

export function disableAnalytics() {
  if (window.gtag) {
    window.gtag("consent", "update", { analytics_storage: "denied" });
  }

  document.cookie
    .split(";")
    .map((cookie) => cookie.trim().split("=")[0])
    .filter((name) => name === "_ga" || name.startsWith("_ga_"))
    .forEach(removeAnalyticsCookie);

  lastTrackedLocation = "";
}

export function trackPageView(location) {
  if (!measurementId || !isInitialized || !window.gtag) return;
  if (location === lastTrackedLocation) return;

  lastTrackedLocation = location;
  window.gtag("event", "page_view", {
    page_location: window.location.href,
    page_path: location,
    page_title: document.title,
  });
}

export function isAnalyticsConfigured() {
  return Boolean(measurementId);
}
