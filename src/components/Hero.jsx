import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, Download, Mail } from "lucide-react";
import ParticleField from "./ParticleField";
import SocialLinks from "./SocialLinks";
import { greetings, heroIntro, profile, roles } from "../data/portfolio";
import { useReducedMotion } from "../hooks/useMotionPreference";
import useTypewriter from "../hooks/useTypewriter";
import { scrollToSection } from "../utils/scroll";

const SECTION_COUNT = 7;
const GREETING_INTERVAL = 2600;

export default function Hero() {
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [visitorPlace, setVisitorPlace] = useState("");
  const reducedMotion = useReducedMotion();
  const typedRole = useTypewriter(roles, !reducedMotion);

  /* Rotating copy is skipped for reduced-motion visitors: the first greeting
     simply stays put, and useTypewriter shows the first role in full. */
  useEffect(() => {
    if (reducedMotion) return undefined;
    const greetingTimer = setInterval(
      () => setGreetingIndex((value) => (value + 1) % greetings.length),
      GREETING_INTERVAL,
    );
    return () => clearInterval(greetingTimer);
  }, [reducedMotion]);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    fetch("https://ipapi.co/json/", { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error("unavailable"))))
      .then((data) => {
        if (!cancelled) setVisitorPlace([data.city, data.country_name].filter(Boolean).join(", "));
      })
      .catch(() => {
        if (!cancelled) setVisitorPlace("");
      });
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  return (
    <section className="hero-section" id="home" aria-labelledby="hero-title">
      {/* Stacked background: tech image, black scrim for readability, gold
          glow, then particles. Everything renders below .hero-content. */}
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-scrim" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />
      <ParticleField />
      <div className="hero-orb hero-orb--one" aria-hidden="true" />
      <div className="hero-orb hero-orb--two" aria-hidden="true" />

      <div className="container hero-content">
        <p className="hero-kicker animate-in" style={{ "--in-delay": "60ms" }}>
          <span className="status-dot" aria-hidden="true" />
          Independent developer · open to opportunities
        </p>

        <p className="hero-greeting animate-in" style={{ "--in-delay": "180ms" }}>
          <span className="greeting-word" key={greetingIndex}>
            {greetings[greetingIndex]}
          </span>
          , I&apos;m <span className="hero-name">{profile.name}</span>.
          <span className="hero-where">
            {visitorPlace
              ? `Greetings from ${visitorPlace}`
              : "Building from Ethiopia, collaborating everywhere."}
          </span>
        </p>

        <h1 className="hero-title animate-in" id="hero-title" style={{ "--in-delay": "320ms" }}>
          Ideas into
          <br />
          <span className="gradient-text">digital impact.</span>
        </h1>

        <p className="role-line animate-in" style={{ "--in-delay": "440ms" }}>
          <span>I&apos;m a</span>
          <span className="role-text" aria-hidden="true">
            {typedRole}
          </span>
          <span className="sr-only">{profile.title}</span>
          <span className="typing-caret" aria-hidden="true" />
        </p>

        <div className="hero-description animate-in" style={{ "--in-delay": "540ms" }}>
          {heroIntro.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <div className="hero-buttons animate-in" style={{ "--in-delay": "640ms" }}>
          <a
            className="btn btn-primary"
            href="#projects"
            onClick={(event) => {
              event.preventDefault();
              scrollToSection("projects");
            }}
          >
            Explore my projects <ArrowUpRight size={17} />
          </a>
          <a
            className="btn btn-ghost"
            href="#contact"
            onClick={(event) => {
              event.preventDefault();
              scrollToSection("contact");
            }}
          >
            Contact me <ArrowDown size={16} />
          </a>
        </div>

        <div className="hero-social animate-in" style={{ "--in-delay": "700ms" }}>
          <SocialLinks size={17} label="Meles Molla on TikTok, Instagram, Telegram, LinkedIn and GitHub" />
          {profile.cv.published ? (
            <a className="btn btn-ghost btn-mini" href={profile.cv.href} download>
              <Download size={15} /> Download my CV
            </a>
          ) : (
            <a
              className="btn btn-ghost btn-mini"
              href={`mailto:${profile.email}?subject=${encodeURIComponent("CV request — Meles Molla")}`}
            >
              <Mail size={15} /> Request my CV
            </a>
          )}
        </div>

        <div className="hero-bottom animate-in" style={{ "--in-delay": "760ms" }}>
          <span className="hero-location">
            <span className="status-dot" aria-hidden="true" /> {profile.location}
          </span>
          <a
            className="scroll-cue"
            href="#about"
            onClick={(event) => {
              event.preventDefault();
              scrollToSection("about");
            }}
          >
            Scroll to explore <ArrowDown size={14} />
          </a>
          <span className="hero-index">
            01 / {String(SECTION_COUNT).padStart(2, "0")}
          </span>
        </div>
      </div>

      <p className="hero-side-note" aria-hidden="true">
        Creative technology <span>2026</span>
      </p>
    </section>
  );
}
