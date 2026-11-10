import { useEffect, useRef } from "react";
import { useFinePointer, useReducedMotion } from "../hooks/useMotionPreference";

const INTERACTIVE = "a,button,[role='button'],input:not([type='hidden']),select,textarea,summary,[data-cursor='interactive']";
const MEDIA = "canvas,img,video,svg,[data-cursor='media']";
const TEXT = "p,h1,h2,h3,h4,blockquote,li,dd,dt,label,span,article,footer,.field-input";

/* Two independent elements, one rAF loop: the dot tracks the pointer
   exactly while the ring eases toward it, which reads as a light trail.
   Classes are written straight to the DOM so hovering never re-renders. */
export default function CustomCursor() {
  const finePointer = useFinePointer();
  const reducedMotion = useReducedMotion();
  const enabled = finePointer && !reducedMotion;
  const ringRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove("has-custom-cursor");
      return undefined;
    }

    const ring = ringRef.current;
    const dot = dotRef.current;
    document.body.classList.add("has-custom-cursor");

    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let ringX = pointerX;
    let ringY = pointerY;
    let frame = 0;
    let inside = false;

    const applyState = (state) => {
      ring.classList.toggle("is-interactive", state === "interactive");
      ring.classList.toggle("is-text", state === "text");
      ring.classList.toggle("is-media", state === "media");
      dot.classList.toggle("is-interactive", state === "interactive");
      dot.classList.toggle("is-text", state === "text");
    };

    const loop = () => {
      ringX += (pointerX - ringX) * 0.16;
      ringY += (pointerY - ringY) * 0.16;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      dot.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
      frame = requestAnimationFrame(loop);
    };

    const onMove = (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!inside) {
        inside = true;
        ringX = pointerX;
        ringY = pointerY;
        ring.classList.remove("is-hidden");
        dot.classList.remove("is-hidden");
      }
    };

    const onLeaveWindow = () => {
      inside = false;
      ring.classList.add("is-hidden");
      dot.classList.add("is-hidden");
      applyState(null);
    };

    const onOver = (event) => {
      const target = event.target instanceof Element ? event.target : null;
      if (!target) return;
      if (target.closest(INTERACTIVE)) applyState("interactive");
      else if (target.closest(MEDIA)) applyState("media");
      else if (target.closest(TEXT)) applyState("text");
      else applyState(null);
    };

    const onKeyDown = (event) => {
      if (event.key === "Tab") applyState("interactive");
    };

    frame = requestAnimationFrame(loop);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    /* Document-level leave only: element mouseout events bubble and would
       blank the cursor on every move between children. */
    document.addEventListener("mouseleave", onLeaveWindow);
    window.addEventListener("blur", onLeaveWindow);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeaveWindow);
      window.removeEventListener("blur", onLeaveWindow);
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("has-custom-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={ringRef} className="cursor-ring is-hidden" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot is-hidden" aria-hidden="true" />
    </>
  );
}
