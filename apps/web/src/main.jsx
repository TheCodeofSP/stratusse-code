import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";

import App from "./App.jsx";
import ErrorBoundary from "./components/common/ErrorBoundary.jsx";

import "./styles/main.scss";

import { AuthProvider } from "./contexts/AuthContext";
import { CookieConsentProvider } from "./contexts/CookieConsentContext.jsx";

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
