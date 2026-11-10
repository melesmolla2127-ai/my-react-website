import { forwardRef, useRef } from "react";
import useInView from "../hooks/useInView";

/* Each animated node observes itself, so cards added later by a filter or
   tab change still animate instead of waiting for a mount-only pass.
   The DOM node is shared with any ref the caller needs. */
const Reveal = forwardRef(function Reveal(
  { as: Tag = "div", variant = "up", delay = 0, className = "", style, children, ...rest },
  forwardedRef,
) {
  const localRef = useRef(null);
  const inView = useInView(localRef);

  const setRef = (node) => {
    localRef.current = node;
    if (typeof forwardedRef === "function") forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  };

  return (
    <Tag
      ref={setRef}
      data-reveal={variant}
      className={`${className}${inView ? " is-visible" : ""}`}
      style={{ ...style, "--reveal-delay": `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
});

export default Reveal;
