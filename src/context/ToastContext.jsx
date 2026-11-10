import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import ToastViewport from "../components/Toast";

const ToastContext = createContext(null);

const MAX_VISIBLE = 4;
const LEAVE_MS = 260;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef(new Map());

  const forget = useCallback((id) => {
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((timer) => clearTimeout(timer));
  }, []);

  const dismiss = useCallback(
    (id) => {
      forget(id);
      setToasts((list) => list.map((toast) => (toast.id === id ? { ...toast, leaving: true } : toast)));
      timers.current.set(
        id,
        setTimeout(() => {
          setToasts((list) => list.filter((toast) => toast.id !== id));
          timers.current.delete(id);
        }, LEAVE_MS),
      );
    },
    [forget],
  );

  const notify = useCallback(
    ({ type = "info", title, message, duration = 5200 }) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      setToasts((list) => [...list, { id, type, title, message, duration, leaving: false }].slice(-MAX_VISIBLE));
      timers.current.set(id, setTimeout(() => dismiss(id), duration));
      return id;
    },
    [dismiss],
  );

  const value = useMemo(
    () => ({
      dismiss,
      notify,
      success: (title, message, options) => notify({ ...options, type: "success", title, message }),
      error: (title, message, options) => notify({ ...options, type: "error", title, message, duration: 7000 }),
      warning: (title, message, options) => notify({ ...options, type: "warning", title, message }),
      info: (title, message, options) => notify({ ...options, type: "info", title, message }),
    }),
    [dismiss, notify],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used inside ToastProvider");
  return context;
}
