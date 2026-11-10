import { useEffect, useRef } from "react";
import { useReducedMotion } from "../hooks/useMotionPreference";

const MAX_PARTICLES = 76;

const hexToRgb = (value, fallback) => {
  const hex = (value || "").trim().replace("#", "");
  if (hex.length < 6) return fallback;
  return [
    parseInt(hex.slice(0, 2), 16),
    parseInt(hex.slice(2, 4), 16),
    parseInt(hex.slice(4, 6), 16),
  ];
};

/* Gold dust on a single canvas. Painting pauses whenever the hero leaves
   the viewport, and the palette is re-read from CSS tokens so a theme
   switch recolours without prop drilling. */
export default function ParticleField() {
  const canvasRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reducedMotion) return undefined;
    const context = canvas.getContext("2d");
    if (!context) return undefined;

    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    let particles = [];
    let dotColor = "rgba(245, 215, 110, 0.6)";
    let lineRgb = "212, 175, 55";

    const readPalette = () => {
      const styles = getComputedStyle(document.documentElement);
      const gold = hexToRgb(styles.getPropertyValue("--gold"), [212, 175, 55]);
      const bright = hexToRgb(styles.getPropertyValue("--gold-bright"), [245, 215, 110]);
      dotColor = `rgba(${bright.join(", ")}, 0.6)`;
      lineRgb = gold.join(", ");
      canvas.style.opacity = document.documentElement.dataset.theme === "light" ? "0.5" : "0.7";
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(MAX_PARTICLES, Math.max(28, Math.floor((width * height) / 19000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.24,
        vy: (Math.random() - 0.5) * 0.24,
        r: Math.random() * 1.4 + 0.5,
      }));
    };

    const draw = () => {
      if (!visible) {
        frame = requestAnimationFrame(draw);
        return;
      }
      context.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        context.beginPath();
        context.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        context.fillStyle = dotColor;
        context.fill();
        for (let j = i + 1; j < particles.length; j += 1) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 116) {
            context.beginPath();
            context.moveTo(p.x, p.y);
            context.lineTo(q.x, q.y);
            context.strokeStyle = `rgba(${lineRgb}, ${(1 - distance / 116) * 0.2})`;
            context.lineWidth = 0.7;
            context.stroke();
          }
        }
      }
      frame = requestAnimationFrame(draw);
    };

    readPalette();
    resize();
    draw();

    const onResize = () => resize();
    window.addEventListener("resize", onResize, { passive: true });

    const themeWatcher = new MutationObserver(() => readPalette());
    themeWatcher.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const visibility = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    visibility.observe(canvas);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      themeWatcher.disconnect();
      visibility.disconnect();
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return <canvas ref={canvasRef} className="particle-canvas" aria-hidden="true" />;
}
