import { useEffect, useState } from "react";

/* Whichever section owns the middle band of the viewport is the active
   nav item. IntersectionObserver keeps this off the scroll hot path. */
export default function useScrollSpy(ids, fallback = ids[0]) {
  const [activeId, setActiveId] = useState(fallback);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!sections.length || typeof IntersectionObserver === "undefined") return undefined;

    const visible = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio);
          else visible.delete(entry.target.id);
        });
        if (visible.size) {
          const [best] = [...visible.entries()].sort((a, b) => b[1] - a[1]);
          setActiveId(best[0]);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.2, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}
