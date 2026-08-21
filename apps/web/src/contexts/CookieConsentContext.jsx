import { createContext, useContext, useState } from "react";

import {
  disableAnalytics,
  initializeAnalytics,
} from "../services/analytics.service.js";

const STORAGE_KEY = "stratusse_cookie_consent_v1";
const CONSENT_DURATION_MS = 180 * 24 * 60 * 60 * 1000;

const CookieConsentContext = createContext(null);

function readStoredConsent() {
  try {
    const storedConsent = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const decidedAt = new Date(storedConsent?.decidedAt).getTime();

    if (
      !["accepted", "refused"].includes(storedConsent?.choice) ||
      !Number.isFinite(decidedAt) ||
      Date.now() - decidedAt > CONSENT_DURATION_MS
    ) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    if (storedConsent.choice === "accepted") initializeAnalytics();

    return storedConsent.choice;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function CookieConsentProvider({ children }) {
  const [choice, setChoice] = useState(readStoredConsent);
  const [arePreferencesOpen, setArePreferencesOpen] = useState(false);

  const saveChoice = (nextChoice) => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ choice: nextChoice, decidedAt: new Date().toISOString() }),
    );
    setChoice(nextChoice);
    setArePreferencesOpen(false);

    if (nextChoice === "accepted") initializeAnalytics();
    else disableAnalytics();
  };

  const value = {
    acceptAnalytics: () => saveChoice("accepted"),
    analyticsConsent: choice === "accepted",
    closePreferences: () => setArePreferencesOpen(false),
    hasMadeChoice: choice !== null,
    isBannerVisible: choice === null || arePreferencesOpen,
    openPreferences: () => setArePreferencesOpen(true),
    refuseAnalytics: () => saveChoice("refused"),
  };

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);

  if (!context) {
    throw new Error(
      "useCookieConsent doit être utilisé dans CookieConsentProvider.",
    );
  }

  return context;
}
