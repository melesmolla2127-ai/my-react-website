import { ArrowUpRight } from "lucide-react";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { profile } from "../data/portfolio";

const details = [
  ["Location", profile.location],
  ["Phone", profile.phone],
  ["Working style", "Remote · Flexible collaboration"],
  ["Response time", "Usually within 1–2 business days"],
];

export default function Contact() {
  return (
    <section className="section" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <SectionHeading eyebrow="08 — Your turn" aside="Have a good one in mind?" />

        <div className="contact-heading">
          <Reveal>
            <h2 className="section-title" id="contact-title">
              Let&apos;s build
              <br />
              <span className="gradient-text">what&apos;s next.</span>
            </h2>
          </Reveal>
          <Reveal delay={90}>
            <p>
              Have an idea, a project, or just want to connect? Send a message. I&apos;ll be glad to
              hear what you&apos;re working on.
            </p>
          </Reveal>
        </div>

        <div className="contact-grid">
          <Reveal className="contact-info" variant="left">
            <p className="eyebrow">Get in touch</p>
            <a
              className="email-link"
              href={`mailto:${profile.email}?subject=${encodeURIComponent("Project enquiry")}`}
            >
              {profile.email} <ArrowUpRight size={18} aria-hidden="true" />
            </a>

            <dl>
              {details.map(([label, value]) => (
                <div className="contact-detail" key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>

            <div className="glass-card availability-card">
              <p className="availability-heading">
                <span className="status-dot" aria-hidden="true" /> Availability
              </p>
              <p>Open to discussing suitable projects and collaborations.</p>
              <div className="availability-weeks">
                <span className="is-open">
                  This month <b>Open to discuss</b>
                </span>
                <span>
                  Next month <b>Plannable</b>
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <ContactForm />
          </Reveal>
        </div>

        <Reveal className="contact-channels" variant="scale">
          <p className="eyebrow">Choose a channel</p>
          <ContactInfo />
        </Reveal>
      </div>
    </section>
  );
}
