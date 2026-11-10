import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "portfolio-language";

const read = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) || "EN";
  } catch {
    return "EN";
  }
};

/* Switches document language and writing direction only — the copy itself
   is still English, so the selection is honest about what it changes. */
export default function useLanguage() {
  const [language, setLanguageState] = useState(read);

  useEffect(() => {
    document.documentElement.lang = language.toLowerCase();
    document.documentElement.dir = language === "AR" ? "rtl" : "ltr";
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      /* private mode — the choice still applies for this session */
    }
  }, [language]);

  const setLanguage = useCallback((next) => setLanguageState(next), []);

  return { language, setLanguage };
}
