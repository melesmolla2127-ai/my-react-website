import { useEffect, useRef } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { scrollToSection } from "../utils/scroll";

const FOCUSABLE = "a[href], button:not([disabled])";

export default function ProjectModal({ project, opener, onClose }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    /* Touch taps do not always move focus, so the card hands over the trigger. */
    const fallback = document.activeElement;
    document.body.classList.add("scroll-locked");
    closeRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const items = [...dialogRef.current.querySelectorAll(FOCUSABLE)];
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("scroll-locked");
      const target = opener instanceof HTMLElement && opener.isConnected ? opener : fallback;
      target.focus();
    };
  }, [onClose]);

  const isExternal = project.link.startsWith("http");

  const openLink = (event) => {
    if (isExternal) return;
    event.preventDefault();
    onClose();
    scrollToSection(project.link.replace("#", ""));
  };

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="project-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        ref={dialogRef}
      >
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close project details" ref={closeRef}>
          <X size={17} />
        </button>

        <p className="eyebrow">
          {project.type} · {project.year}
        </p>
        <div className="modal-art" aria-hidden="true">
          {project.icon}
        </div>
        <h2 id="project-modal-title">{project.title}</h2>
        <p>{project.detail}</p>

        <ul className="project-tags">
          {project.stack.map((tech) => (
            <li className="tag" key={tech}>
              {tech}
            </li>
          ))}
        </ul>

        <a
          className="btn btn-primary"
          href={project.link}
          onClick={openLink}
          {...(isExternal ? { target: "_blank", rel: "noreferrer noopener" } : {})}
        >
          {isExternal ? "Open project" : "Start a conversation"} <ArrowUpRight size={16} />
        </a>
      </div>
    </div>
  );
}
