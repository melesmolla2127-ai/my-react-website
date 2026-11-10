import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { journalPosts } from "../data/portfolio";
import { scrollToSection } from "../utils/scroll";

export default function Journal() {
  return (
    <section className="section" id="blog" data-tone="soft" aria-labelledby="journal-title">
      <div className="container">
        <SectionHeading
          eyebrow="07 — Notes from the process"
          aside="Ideas, learnings, curiosity"
          titleId="journal-title"
          title={
            <>
              The learning
              <br />
              <span className="muted-title">never stops.</span>
            </>
          }
          intro="A journal for practical lessons, useful discoveries, and ideas worth sharing. Add your own articles as you publish them."
        />

        <div className="journal-grid">
          {journalPosts.map((post, index) => (
            <Reveal
              as="article"
              className={`glass-card glass-card--tilt journal-card journal--${post.tone}`}
              key={post.n}
              delay={index * 90}
              aria-labelledby={`journal-title-${post.n}`}
            >
              <div className="journal-cover" aria-hidden="true">
                <span className="journal-cover-no">{post.n}</span>
                <span className="journal-cover-shape">✳</span>
                <span className="journal-cover-label">Field notes / 2026</span>
              </div>
              <p className="journal-meta">
                <span>{post.cat}</span>
                <span>{post.time}</span>
              </p>
              <h3 id={`journal-title-${post.n}`}>{post.title}</h3>
              <p className="journal-desc">{post.desc}</p>
              <a
                className="text-link"
                href="#contact"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection("contact");
                }}
              >
                Discuss this topic <ArrowUpRight size={14} />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
