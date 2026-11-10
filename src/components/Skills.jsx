import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { skillGroups, skillSymbols, softSkills } from "../data/portfolio";

const TABS = Object.keys(skillGroups);
const TAB_KEYS = ["ArrowRight", "ArrowLeft", "Home", "End"];

export default function Skills() {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const tabRefs = useRef([]);

  /* Roving tabindex: the tablist stays a single stop for the Tab key and
     arrows move between categories, as the ARIA pattern expects. */
  const onTabKeyDown = (event) => {
    if (!TAB_KEYS.includes(event.key)) return;
    event.preventDefault();
    const current = TABS.indexOf(activeTab);
    let next = current;
    if (event.key === "ArrowRight") next = (current + 1) % TABS.length;
    if (event.key === "ArrowLeft") next = (current - 1 + TABS.length) % TABS.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = TABS.length - 1;
    setActiveTab(TABS[next]);
    tabRefs.current[next]?.focus();
  };

  return (
    <section className="section" id="skills" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeading
          eyebrow="02 — What I work with"
          aside="Tools are means, not the end"
          titleId="skills-title"
          title={
            <>
              My technical
              <br />
              <span className="gradient-text">toolkit.</span>
            </>
          }
          intro="A growing set of technologies I use to design, build, test, and ship digital experiences."
        />

        <Reveal className="glass-card skill-panel" delay={60}>
          <div className="skill-tabs" role="tablist" aria-label="Skill categories">
            {TABS.map((tab, index) => (
              <button
                type="button"
                role="tab"
                key={tab}
                id={`skill-tab-${index}`}
                className="skill-tab"
                aria-selected={activeTab === tab}
                aria-controls={`skill-panel-${index}`}
                tabIndex={activeTab === tab ? 0 : -1}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                onClick={() => setActiveTab(tab)}
                onKeyDown={onTabKeyDown}
              >
                {tab}
                <ArrowUpRight size={14} aria-hidden="true" />
              </button>
            ))}
          </div>

          <div
            className="skills-grid"
            role="tabpanel"
            id={`skill-panel-${TABS.indexOf(activeTab)}`}
            aria-labelledby={`skill-tab-${TABS.indexOf(activeTab)}`}
            key={activeTab}
          >
            {skillGroups[activeTab].map(([name, level], index) => (
              <div className="skill-item" key={name}>
                <div className="skill-item-top">
                  <span className="skill-symbol" aria-hidden="true">
                    {skillSymbols[index]}
                  </span>
                  <span className="skill-name" id={`skill-name-${index}`}>
                    {name}
                  </span>
                  <span className="skill-level" aria-hidden="true">
                    {level}%
                  </span>
                </div>
                <div
                  className="skill-track"
                  role="progressbar"
                  aria-labelledby={`skill-name-${index}`}
                  aria-valuenow={level}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuetext={`${name}: ${level} percent`}
                >
                  <span style={{ "--skill": `${level}%` }} />
                </div>
              </div>
            ))}
          </div>

          <p className="skill-foot">
            <span>Always in progress</span>
            <span>Curiosity → Practice → Improvement</span>
          </p>
        </Reveal>

        <Reveal className="soft-skills" delay={120}>
          <p className="eyebrow">Beyond the code</p>
          <ul className="tag-list">
            {softSkills.map((skill) => (
              <li className="tag" key={skill}>
                {skill}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
