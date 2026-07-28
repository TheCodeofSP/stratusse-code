import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";

import App from "./App.jsx";
import ErrorBoundary from "./components/common/ErrorBoundary.jsx";

import "./styles/main.scss";

import { AuthProvider } from "./contexts/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <HelmetProvider>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </HelmetProvider>
    </AuthProvider>
  </React.StrictMode>,
);
