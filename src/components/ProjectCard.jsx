import { ArrowRight, ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import { scrollToSection } from "../utils/scroll";

export default function ProjectCard({ project, index, onOpen }) {
  const isExternal = project.link.startsWith("http");

  const openLink = (event) => {
    if (isExternal) return;
    event.preventDefault();
    scrollToSection(project.link.replace("#", ""));
  };

  return (
    <Reveal
      as="article"
      className={`glass-card glass-card--tilt glass-card--sheen project-card project--${project.tone}`}
      delay={index * 70}
      aria-labelledby={`project-title-${project.id}`}
    >
      <button
        type="button"
        className="project-art"
        onClick={(event) => onOpen(project, event.currentTarget)}
        aria-label={`Open details for ${project.title}`}
      >
        <span className="project-art-grid" aria-hidden="true" />
        <span className="project-art-icon" aria-hidden="true">
          {project.icon}
        </span>
        <span className="project-art-label">{project.tag}</span>
        <span className="project-art-open" aria-hidden="true">
          <ArrowUpRight size={19} />
        </span>
      </button>

      <p className="project-meta">
        <span>{project.type}</span>
        <span>{project.year}</span>
      </p>
      <h3 id={`project-title-${project.id}`}>{project.title}</h3>
      <p className="project-desc">{project.desc}</p>

      <ul className="project-tags">
        {project.stack.map((tech) => (
          <li className="tag" key={tech}>
            {tech}
          </li>
        ))}
      </ul>

      <div className="project-actions">
        <a
          href={project.link}
          onClick={openLink}
          {...(isExternal ? { target: "_blank", rel: "noreferrer noopener" } : {})}
        >
          View project <ArrowUpRight size={14} />
        </a>
        <button type="button" onClick={(event) => onOpen(project, event.currentTarget)}>
          Details <ArrowRight size={14} />
        </button>
      </div>
    </Reveal>
  );
}
