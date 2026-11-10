import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Moon, Sun } from "lucide-react";
import { languages, navSections } from "../data/portfolio";
import useLanguage from "../hooks/useLanguage";
import useMediaQuery from "../hooks/useMediaQuery";
import useScrollSpy from "../hooks/useScrollSpy";
import useTheme from "../hooks/useTheme";
import { scrollToSection } from "../utils/scroll";

const SPY_IDS = navSections.map((section) => section.id);
const HEADER_THRESHOLD = 24;

function LanguageSelect({ className, language, setLanguage }) {
  return (
    <select
      className={className}
      value={language}
      onChange={(event) => setLanguage(event.target.value)}
      aria-label="Choose document language and text direction"
      title="Sets the document language and direction. Full translations are not published yet."
    >
      {languages.map((code) => (
        <option key={code} value={code}>
          {code}
        </option>
      ))}
    </select>
  );
}

function ThemeToggle({ theme, toggleTheme }) {
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      className="icon-btn"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {isDark ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const isCompact = useMediaQuery("(max-width: 850px)");
  const activeId = useScrollSpy(SPY_IDS);
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    let frame = 0;
    let raised = false;
    const paint = () => {
      frame = 0;
      const next = window.scrollY > HEADER_THRESHOLD;
      if (next !== raised) {
        raised = next;
        setScrolled(next);
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    paint();
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  /* Growing past the mobile breakpoint must not leave a stale open panel. */
  useEffect(() => {
    if (!isCompact) setMenuOpen(false);
  }, [isCompact]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const goTo = (id) => (event) => {
    event.preventDefault();
    setMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <nav className="nav-wrap container" aria-label="Main navigation">
        <a className="brand" href="#home" onClick={goTo("home")}>
          <span className="brand-mark" aria-hidden="true">
            M<span>.</span>
          </span>
          <span className="brand-name">
            MELES<em> MOLLA</em>
          </span>
        </a>

        {!isCompact && (
          <ul className="nav-links">
            {navSections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  onClick={goTo(section.id)}
                  className={`nav-link${activeId === section.id ? " is-active" : ""}`}
                  aria-current={activeId === section.id ? "true" : undefined}
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        )}

        <div className="nav-actions">
          {!isCompact && (
            <>
              <LanguageSelect className="lang-select" language={language} setLanguage={setLanguage} />
              <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            </>
          )}
          <a className="nav-cta" href="#contact" onClick={goTo("contact")}>
            Let&apos;s talk <ArrowUpRight size={15} />
          </a>
          {isCompact && (
            <button
              type="button"
              ref={menuButtonRef}
              className="menu-toggle"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              <span className="burger" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
            </button>
          )}
        </div>
      </nav>

      {isCompact && (
        <div className={`mobile-panel${menuOpen ? " is-open" : ""}`} id="mobile-navigation" aria-hidden={!menuOpen}>
          <nav className="container" aria-label="Mobile navigation">
            <ul>
              {navSections.map((section, index) => (
                <li key={section.id} style={{ "--i": index }}>
                  <a
                    href={`#${section.id}`}
                    onClick={goTo(section.id)}
                    className={activeId === section.id ? "is-active" : undefined}
                  >
                    {section.label}
                    <small>{String(index + 1).padStart(2, "0")}</small>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mobile-panel-controls">
              <LanguageSelect className="lang-select" language={language} setLanguage={setLanguage} />
              <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
              <a className="nav-cta" href="#contact" onClick={goTo("contact")}>
                Let&apos;s talk <ArrowUpRight size={15} />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
