import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { testimonials } from "../data/portfolio";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;
  const current = testimonials[index];
  const move = (step) => setIndex((value) => (value + step + total) % total);

  return (
    <section className="section" id="testimonials" aria-labelledby="testimonials-title">
      <div className="container">
        <SectionHeading
          eyebrow="06 — Kind words & collaboration"
          aside="Trust is built together"
        />

        <div className="voices-layout">
          <Reveal>
            <h2 className="section-title" id="testimonials-title">
              Good work
              <br />
              is <span className="gradient-text">shared.</span>
            </h2>
            <p className="section-intro">
              The strongest projects come from open communication, shared goals, and a willingness to
              improve together.
            </p>

            <div className="carousel-controls">
              <button type="button" className="carousel-btn" onClick={() => move(-1)} aria-label="Previous testimonial">
                <ArrowLeft size={17} />
              </button>
              <button type="button" className="carousel-btn" onClick={() => move(1)} aria-label="Next testimonial">
                <ArrowRight size={17} />
              </button>
              <p className="carousel-index">
                {String(index + 1).padStart(2, "0")} <i>/</i> {String(total).padStart(2, "0")}
              </p>
            </div>
          </Reveal>

          <Reveal
            className="glass-card glass-card--tilt quote-card"
            delay={90}
            role="group"
            aria-roledescription="slide"
            aria-label={`Testimonial ${index + 1} of ${total}`}
          >
            <span className="quote-mark" aria-hidden="true">
              &ldquo;
            </span>
            <p className="quote-stars" aria-label="Five out of five">
              ★★★★★
            </p>
            <blockquote>{current.quote}</blockquote>
            <div className="quote-person">
              <span className="quote-avatar" aria-hidden="true">
                {current.name.slice(0, 1)}
              </span>
              <div>
                <p>
                  <strong>
                    {current.name} <span aria-hidden="true">{current.country}</span>
                  </strong>
                  <small>
                    {current.role} · {current.company}
                  </small>
                </p>
              </div>
            </div>
            <p className="quote-note">
              Illustrative sample content — replace with verified client testimonials before
              publishing.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
