import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "portfolio-theme";

const read = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) || "dark";
  } catch {
    return "dark";
  }
};

export default function useTheme() {
  const [theme, setTheme] = useState(read);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* private mode — the theme still applies for this session */
    }
  }, [theme]);

  const toggleTheme = useCallback(
    () => setTheme((current) => (current === "dark" ? "light" : "dark")),
    [],
  );

  return { theme, toggleTheme };
}
