import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { services } from "../data/portfolio";
import { scrollToSection } from "../utils/scroll";

export default function Services() {
  return (
    <section className="section" id="services" data-tone="soft" aria-labelledby="services-title">
      <div className="container">
        <SectionHeading
          eyebrow="05 — How I can help"
          aside="Let's make it useful"
          titleId="services-title"
          title={
            <>
              Good ideas deserve
              <br />
              <span className="gradient-text">good execution.</span>
            </>
          }
          intro="From the first sketch to a working experience, I can help shape a clear path from idea to launch."
        />

        <div className="services-grid">
          {services.map(({ Icon, title, desc }, index) => (
            <Reveal
              as="article"
              className="glass-card glass-card--tilt glass-card--sheen service-card"
              key={title}
              delay={index * 80}
              aria-labelledby={`service-title-${index}`}
            >
              <div className="service-top">
                <span className="service-icon" aria-hidden="true">
                  <Icon size={22} />
                </span>
                <span className="service-number">0{index + 1}</span>
              </div>
              <h3 id={`service-title-${index}`}>{title}</h3>
              <p>{desc}</p>
              <a
                className="text-link"
                href="#contact"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection("contact");
                }}
              >
                Let&apos;s discuss <ArrowUpRight size={15} />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
