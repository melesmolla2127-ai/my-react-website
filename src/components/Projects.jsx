import { useMemo, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { projectFilters, projects } from "../data/portfolio";

const INITIAL_VISIBLE = 6;

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const openerRef = useRef(null);

  const openProject = (project, trigger) => {
    openerRef.current = trigger;
    setActiveProject(project);
  };

  const filtered = useMemo(
    () => projects.filter((project) => filter === "All" || project.type === filter),
    [filter],
  );
  const visible = showAll ? filtered : filtered.slice(0, INITIAL_VISIBLE);

  const countFor = (value) =>
    value === "All" ? projects.length : projects.filter((project) => project.type === value).length;

  return (
    <section className="section" id="projects" data-tone="soft" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeading
          eyebrow="03 — Things I've made"
          aside="Selected work · 2025—2026"
          titleId="projects-title"
          title={
            <>
              Selected <span className="gradient-text">work.</span>
            </>
          }
          intro="A mix of shipped experiments, active builds, and product ideas. Each one is a chance to learn by making."
        />

        <Reveal className="filter-row" as="div" role="group" aria-label="Filter projects by type">
          {projectFilters.map((value) => (
            <button
              type="button"
              key={value}
              className={`filter-btn${filter === value ? " is-active" : ""}`}
              aria-pressed={filter === value}
              onClick={() => {
                setFilter(value);
                setShowAll(false);
              }}
            >
              {value}
              <b>{countFor(value)}</b>
            </button>
          ))}
        </Reveal>

        <p className="sr-only" role="status">
          Showing {visible.length} of {filtered.length} {filter === "All" ? "projects" : `${filter} projects`}.
        </p>

        <div className="projects-grid">
          {visible.map((project, index) => (
            <ProjectCard project={project} index={index} key={project.id} onOpen={openProject} />
          ))}
        </div>

        {filtered.length > INITIAL_VISIBLE && (
          <button type="button" className="btn btn-ghost load-more" onClick={() => setShowAll((value) => !value)}>
            {showAll ? "Show less" : "Load more"} <ArrowDown size={15} />
          </button>
        )}
      </div>

      {activeProject && (
        <ProjectModal
          project={activeProject}
          opener={openerRef.current}
          onClose={() => setActiveProject(null)}
        />
      )}
    </section>
  );
}
