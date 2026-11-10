import Reveal from "./Reveal";

/* Every section opens with the same two-part header: a numbered eyebrow
   strip, then the title row. Content strings stay in the sections. */
export default function SectionHeading({ eyebrow, aside, title, intro, titleId }) {
  return (
    <>
      <Reveal className="section-top" as="div">
        <span className="eyebrow">{eyebrow}</span>
        {aside ? <span className="section-aside">{aside}</span> : null}
      </Reveal>
      {title || intro ? (
        <Reveal className="section-heading-row" delay={90}>
          {title ? <h2 className="section-title" id={titleId}>{title}</h2> : null}
          {intro ? <p className="section-intro">{intro}</p> : null}
        </Reveal>
      ) : null}
    </>
  );
}
