import { Command, Sparkles } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { education, journey } from "../data/portfolio";

const educationIcons = { command: Command, sparkles: Sparkles };

export default function Journey() {
  return (
    <section className="section" id="journey" aria-labelledby="journey-title">
      <div className="container">
        <SectionHeading
          eyebrow="04 — The journey so far"
          aside="Learning in public"
          titleId="journey-title"
          title={
            <>
              Built one step
              <br />
              <span className="muted-title">at a time.</span>
            </>
          }
          intro="A developing journey shaped by study, self-directed practice, and the process of bringing ideas to life."
        />

        <ol className="timeline">
          {journey.map((entry, index) => (
            <Reveal as="li" className="timeline-item" key={entry.date} delay={index * 110}>
              <span className="timeline-dot" aria-hidden="true" />
              <p className="timeline-date">{entry.date}</p>
              <div className="timeline-content">
                <p className="timeline-type">{entry.type}</p>
                <h3>{entry.title}</h3>
                <h4>{entry.org}</h4>
                {entry.points ? (
                  <ul>
                    {entry.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{entry.note}</p>
                )}
              </div>
            </Reveal>
          ))}
        </ol>

        <div className="education-row">
          {education.map((card, index) => {
            const Icon = educationIcons[card.icon];
            return (
              <Reveal
                as="article"
                className="glass-card glass-card--tilt education-card"
                key={card.title}
                delay={index * 90}
              >
                <span className="edu-icon" aria-hidden="true">
                  <Icon size={20} />
                </span>
                <div>
                  <p className="eyebrow">{card.eyebrow}</p>
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                </div>
                <p className="edu-year">{card.year}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
