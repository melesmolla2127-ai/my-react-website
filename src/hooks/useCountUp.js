import { useEffect, useState } from "react";
import { useReducedMotion } from "./useMotionPreference";

export default function useCountUp(values, active, { duration = 1500 } = {}) {
  const reducedMotion = useReducedMotion();
  const [current, setCurrent] = useState(() => values.map(() => 0));

  useEffect(() => {
    if (!active) return undefined;
    if (reducedMotion) {
      setCurrent(values);
      return undefined;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(values.map((value) => Math.round(value * eased)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, reducedMotion, duration, values]);

  return current;
}
