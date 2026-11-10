import useScrollProgress from "../hooks/useScrollProgress";

export default function ScrollProgress() {
  const barRef = useScrollProgress();

  /* Decorative for assistive tech: the value changes on every frame and
     would only add noise to a screen reader. */
  return <div ref={barRef} className="scroll-progress" aria-hidden="true" />;
}
