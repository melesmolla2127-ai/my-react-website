import { useRef } from "react";
import {
  ArrowUpRight, AtSign, BriefcaseBusiness, Command, Globe2, Sparkles,
} from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { profile, stats } from "../data/portfolio";
import useCountUp from "../hooks/useCountUp";
import useInView from "../hooks/useInView";
import { scrollToSection } from "../utils/scroll";

const statTargets = stats.map((stat) => stat.value);

export default function About() {
  const statsRef = useRef(null);
  const statsVisible = useInView(statsRef, { threshold: 0.25 });
  const counts = useCountUp(statTargets, statsVisible);

  return (
    <section className="section" id="about" data-tone="soft" aria-labelledby="about-title">
      <div className="container">
        <SectionHeading
          eyebrow="01 — A little about me"
          aside="The person behind the pixels"
        />

        <div className="about-grid">
          <Reveal className="about-visual" variant="left">
            <div className="portrait-frame">
              <img
                className="portrait-photo"
                src="/images/mele.jpg"
                alt="Portrait photo of Meles Molla"
                width="1195"
                height="896"
                loading="lazy"
                decoding="async"
              />
              <div className="portrait-grid" aria-hidden="true" />
              <div className="portrait-fade" aria-hidden="true" />
              <p className="portrait-caption">
                <span>Curious mind</span>
                <b aria-hidden="true">✳</b>
              </p>
            </div>
            <p className="floating-note">
              <Sparkles size={16} aria-hidden="true" />
              <span>
                Learning by
                <br />
                building.
              </span>
            </p>
            <p className="visual-index">{profile.location}</p>
          </Reveal>

          <div className="about-copy">
            <Reveal delay={80}>
              <p className="eyebrow">Hello, I&apos;m Meles</p>
              <h2 className="section-title" id="about-title">
                Developer by craft.
                <br />
                <span className="muted-title">Problem solver by nature.</span>
              </h2>
              <p className="body-copy">
                I&apos;m a developer from Ethiopia who enjoys turning ideas into useful digital
                experiences. I work across interface design and full-stack development, learning
                through real projects and experimenting with technologies that make the web more
                accessible and effective.
              </p>
              <p className="body-copy">
                My approach is simple: understand the problem, keep the experience clear, and build
                with care. I&apos;m excited to collaborate with people and teams wherever good ideas
                are taking shape.
              </p>

              <ul className="info-chips">
                <li>
                  <Globe2 size={14} aria-hidden="true" /> {profile.location}
                </li>
                <li>
                  <Command size={14} aria-hidden="true" /> English · Amharic
                </li>
                <li>
                  <BriefcaseBusiness size={14} aria-hidden="true" /> Open to collaboration
                </li>
                <li>
                  <AtSign size={14} aria-hidden="true" /> Remote-friendly
                </li>
              </ul>

              <a
                className="text-link"
                href="#contact"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection("contact");
                }}
              >
                A little more about working together <ArrowUpRight size={16} />
              </a>
            </Reveal>
          </div>
        </div>

        <Reveal
          className="stats-grid"
          delay={120}
          ref={statsRef}
          role="list"
          aria-label="Career numbers at a glance"
        >
          {stats.map((stat, index) => (
            <div className="stat-item" role="listitem" key={stat.label}>
              <p className="stat-number">
                {counts[index]}
                {stat.suffix}
              </p>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
