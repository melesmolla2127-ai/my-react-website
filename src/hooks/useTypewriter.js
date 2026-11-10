import { useEffect, useState } from "react";

const TYPE_MS = 58;
const DELETE_MS = 26;
const HOLD_MS = 1600;
const GAP_MS = 320;

/* Types a word, holds it, deletes it, moves to the next. State is derived in a
   plain effect (never inside a state updater) so every timer is cancelled on
   cleanup and StrictMode's double pass cannot stack timers. */
export default function useTypewriter(words, enabled = true) {
  const [state, setState] = useState({ word: 0, length: 0, typing: true });

  useEffect(() => {
    if (!enabled) {
      setState({ word: 0, length: words[0].length, typing: false });
      return undefined;
    }

    const current = words[state.word];
    let next;
    let delay;

    if (state.typing) {
      if (state.length < current.length) {
        next = { ...state, length: state.length + 1 };
        delay = TYPE_MS;
      } else {
        next = { ...state, typing: false };
        delay = HOLD_MS;
      }
    } else if (state.length > 0) {
      next = { ...state, length: state.length - 1 };
      delay = DELETE_MS;
    } else {
      next = { word: (state.word + 1) % words.length, length: 0, typing: true };
      delay = GAP_MS;
    }

    const timer = setTimeout(() => setState(next), delay);
    return () => clearTimeout(timer);
  }, [enabled, state, words]);

  return words[state.word].slice(0, state.length);
}
