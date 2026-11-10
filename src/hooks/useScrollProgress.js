import { useEffect, useRef } from "react";

/* The bar is written straight to the DOM inside a single rAF pass, so
   scrolling never re-renders the React tree. */
export default function useScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    let frame = 0;

    const paint = () => {
      frame = 0;
      const bar = barRef.current;
      if (!bar) return;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? Math.min(Math.max(window.scrollY / scrollable, 0), 1) : 0;
      bar.style.transform = `scaleX(${ratio})`;
      bar.setAttribute("aria-valuenow", String(Math.round(ratio * 100)));
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return barRef;
}
