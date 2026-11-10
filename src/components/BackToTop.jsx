import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { scrollToTop } from "../utils/scroll";

const THRESHOLD = 620;

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const ringRef = useRef(null);

  useEffect(() => {
    let frame = 0;
    let shown = false;

    const paint = () => {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
      if (ringRef.current) ringRef.current.style.strokeDashoffset = String(100 - ratio * 100);
      /* Re-render only when the threshold is actually crossed. */
      const next = window.scrollY > THRESHOLD;
      if (next !== shown) {
        shown = next;
        setVisible(next);
      }
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

  return (
    <button
      type="button"
      className={`back-to-top${visible ? " is-visible" : ""}`}
      onClick={scrollToTop}
      aria-label="Back to top of page"
      tabIndex={visible ? 0 : -1}
    >
      <svg className="back-to-top__ring" viewBox="0 0 48 48" aria-hidden="true">
        <circle className="back-to-top__track" cx="24" cy="24" r="21" pathLength="100" />
        <circle ref={ringRef} className="back-to-top__value" cx="24" cy="24" r="21" pathLength="100" strokeDashoffset="100" />
      </svg>
      <ArrowUp size={17} aria-hidden="true" />
    </button>
  );
}
