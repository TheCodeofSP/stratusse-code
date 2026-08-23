import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";

import App from "./App.jsx";
import ErrorBoundary from "./components/common/ErrorBoundary.jsx";

import "./styles/main.scss";

import { AuthProvider } from "./contexts/AuthContext";
import { CookieConsentProvider } from "./contexts/CookieConsentContext.jsx";

const PRELOAD_RELOAD_KEY = "stratusse_preload_reload_attempted";

window.addEventListener("vite:preloadError", (event) => {
  event.preventDefault();

  if (sessionStorage.getItem(PRELOAD_RELOAD_KEY) === "true") {
    sessionStorage.removeItem(PRELOAD_RELOAD_KEY);
    console.error("Impossible de charger la dernière version de Stratusse.");
    return;
  }

  sessionStorage.setItem(PRELOAD_RELOAD_KEY, "true");
  window.location.reload();
});

window.addEventListener(
  "load",
  () => {
    sessionStorage.removeItem(PRELOAD_RELOAD_KEY);
  },
  { once: true },
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CookieConsentProvider>
      <AuthProvider>
        <HelmetProvider>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </HelmetProvider>
      </AuthProvider>
    </CookieConsentProvider>
  </React.StrictMode>,
);
