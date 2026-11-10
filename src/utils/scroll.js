const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Focus follows the jump so keyboard and screen-reader users land inside
   the section they asked for, without a second visible scroll. */
function focusSection(section) {
  if (!section.hasAttribute("tabindex")) section.setAttribute("tabindex", "-1");
  section.focus({ preventScroll: true });
}

export function scrollToSection(id) {
  const section = document.getElementById(id);
  if (!section) return false;
  section.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });
  focusSection(section);
  if (window.history?.replaceState) window.history.replaceState(null, "", `#${id}`);
  return true;
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
}
