import { AlertTriangle, CheckCircle2, Info, OctagonAlert, X } from "lucide-react";

const toastMeta = {
  success: { Icon: CheckCircle2, label: "Success" },
  error: { Icon: OctagonAlert, label: "Error" },
  warning: { Icon: AlertTriangle, label: "Warning" },
  info: { Icon: Info, label: "Information" },
};

export default function ToastViewport({ toasts, onDismiss }) {
  return (
    <div className="toast-viewport" role="region" aria-label="Notifications">
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {toasts.filter((toast) => !toast.leaving).map((toast) => `${toast.title}. ${toast.message}`).join(" ")}
      </div>
      {toasts.map((toast) => {
        const { Icon } = toastMeta[toast.type] ?? toastMeta.info;
        return (
          <article
            key={toast.id}
            className={`toast toast--${toast.type}${toast.leaving ? " is-leaving" : ""}`}
          >
            <span className="toast__icon" aria-hidden="true">
              <Icon size={16} />
            </span>
            <div>
              <strong className="toast__title">{toast.title}</strong>
              <span className="toast__message">{toast.message}</span>
            </div>
            <button
              type="button"
              className="toast__close"
              onClick={() => onDismiss(toast.id)}
              aria-label={`Dismiss notification: ${toast.title}`}
            >
              <X size={15} />
            </button>
            <span
              className="toast__timer"
              aria-hidden="true"
              style={{ animationDuration: `${toast.duration}ms` }}
            />
          </article>
        );
      })}
    </div>
  );
}
