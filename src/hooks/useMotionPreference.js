import useMediaQuery from "./useMediaQuery";

export function useReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

export function useFinePointer() {
  return useMediaQuery("(pointer: fine)");
}

export function useCompactViewport() {
  return useMediaQuery("(max-width: 850px)");
}
