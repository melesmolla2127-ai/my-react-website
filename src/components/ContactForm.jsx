import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Check, RotateCcw, Send } from "lucide-react";
import { useToast } from "../context/ToastContext";
import { budgetOptions, countryOptions, projectTypeOptions } from "../data/portfolio";
import {
  emptyContactForm,
  MIN_MESSAGE,
  requiredFields,
  validateField,
  validateForm,
} from "../utils/validation";

const SIMULATED_LATENCY_MS = 1500;

/* ------------------------------------------------------------
   Single integration seam. Replace the simulated delay with a
   POST to a real endpoint (Formspree, Resend, your own route):

     const response = await fetch("/api/contact", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify(payload),
     });
     if (!response.ok) throw new Error(`Request failed (${response.status})`);

   The rest of this component already handles a rejected promise:
   the error toast, the retry path, and the preserved user input.
   Nothing here stores or transmits the message — until you wire it.
   ------------------------------------------------------------ */
async function deliverMessage(payload) {
  await new Promise((resolve) => {
    setTimeout(resolve, SIMULATED_LATENCY_MS);
  });
  return { delivered: false, payload };
}

function Field({
  id,
  label,
  name,
  value,
  error,
  valid,
  disabled,
  type = "text",
  hint,
  autoComplete,
  required = false,
  inputMode,
  registerRef,
  onChange,
  onBlur,
}) {
  const errorId = `${id}-error`;
  const hintId = hint ? `${id}-hint` : null;
  const describedBy = [hintId, error ? errorId : null].filter(Boolean).join(" ") || undefined;

  return (
    <div
      className={`form-field${error ? " is-invalid" : ""}${valid ? " is-valid" : ""}`}
      data-field={name}
    >
      <div className="field-control">
        <input
          className="field-input"
          id={id}
          name={name}
          type={type}
          value={value}
          placeholder=" "
          autoComplete={autoComplete}
          inputMode={inputMode}
          required={required}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          aria-required={required || undefined}
          ref={registerRef}
          onChange={(event) => onChange(name, event.target.value)}
          onBlur={() => onBlur(name)}
        />
        <label className="field-label" htmlFor={id}>
          {label}
          {required && (
            <span className="req" aria-hidden="true">
              *
            </span>
          )}
        </label>
        {valid && !error && (
          <span className="field-status" aria-hidden="true">
            <Check size={15} />
          </span>
        )}
      </div>
      {hint && !error && (
        <p className="field-hint" id={hintId}>
          {hint}
        </p>
      )}
      {error && (
        <p className="field-error" id={errorId} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function SelectField({
  id,
  label,
  name,
  value,
  options,
  disabled,
  registerRef,
  onChange,
  onBlur,
}) {
  return (
    <div className="form-field">
      <p className="field-static-label" id={`${id}-label`}>
        {label}
        <span className="optional">optional</span>
      </p>
      <div className="field-control">
        <select
          className="field-input field-select"
          id={id}
          name={name}
          value={value}
          disabled={disabled}
          aria-labelledby={`${id}-label`}
          ref={registerRef}
          onChange={(event) => onChange(name, event.target.value)}
          onBlur={() => onBlur(name)}
        >
          <option value="">Choose one</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {value && (
          <span className="field-status" aria-hidden="true">
            <Check size={15} />
          </span>
        )}
      </div>
    </div>
  );
}

export default function ContactForm() {
  const [values, setValues] = useState(emptyContactForm);
  const [touched, setTouched] = useState({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState("idle");
  const toast = useToast();

  const fieldRefs = useRef({});
  const aliveRef = useRef(true);
  const summaryRef = useRef(null);

  useEffect(() => {
    aliveRef.current = true;
    return () => {
      aliveRef.current = false;
    };
  }, []);

  const errors = useMemo(() => validateForm(values), [values]);
  const isValid = Object.keys(errors).length === 0;
  const submitting = status === "submitting";

  const setField = useCallback((name, value) => {
    setValues((current) => ({ ...current, [name]: value }));
  }, []);

  const markTouched = useCallback((name) => {
    setTouched((current) => ({ ...current, [name]: true }));
  }, []);

  const visibleError = (name) =>
    (touched[name] || attempted) && errors[name] ? errors[name] : "";

  const handleSubmit = async (event) => {
    event.preventDefault();
    /* Duplicate-send guard: the button is disabled while submitting, but a
       fast Enter keypress can still re-enter the handler. */
    if (submitting) return;

    setAttempted(true);
    if (!isValid) {
      const firstInvalid = requiredFields.find((name) => errors[name]);
      fieldRefs.current[firstInvalid]?.focus();
      toast.warning(
        "Check the highlighted fields",
        `${Object.keys(errors).length} field${Object.keys(errors).length === 1 ? "" : "s"} still need${Object.keys(errors).length === 1 ? "s" : ""} your attention.`,
      );
      return;
    }

    setStatus("submitting");
    try {
      await deliverMessage(values);
      if (!aliveRef.current) return;
      setStatus("sent");
      toast.success(
        "Message Sent Successfully!",
        "Nothing left this browser: the send is simulated until a backend is connected.",
        { duration: 6400 },
      );
      summaryRef.current?.focus();
    } catch {
      if (!aliveRef.current) return;
      setStatus("idle");
      toast.error("Could not send your message", "Please try again, or email directly instead.");
    }
  };

  const resetForm = useCallback(() => {
    setValues(emptyContactForm);
    setTouched({});
    setAttempted(false);
    setStatus("idle");
    fieldRefs.current.name?.focus();
  }, []);

  const messageLength = values.message.trim().length;

  return (
    <form
      className="contact-form"
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby="contact-form-title"
      aria-describedby="contact-form-note"
    >
      <div className="form-heading">
        <h3 id="contact-form-title">Send a message</h3>
        <span className="form-required">* required</span>
      </div>

      <div className="form-grid">
        <Field
          id="contact-name"
          name="name"
          label="Full name"
          value={values.name}
          error={visibleError("name")}
          valid={!errors.name && values.name.trim().length > 1}
          disabled={submitting}
          autoComplete="name"
          required
          registerRef={(node) => {
            fieldRefs.current.name = node;
          }}
          onChange={setField}
          onBlur={markTouched}
        />
        <Field
          id="contact-email"
          name="email"
          type="email"
          label="Email address"
          value={values.email}
          error={visibleError("email")}
          valid={!errors.email && values.email.trim().length > 0}
          disabled={submitting}
          autoComplete="email"
          inputMode="email"
          required
          registerRef={(node) => {
            fieldRefs.current.email = node;
          }}
          onChange={setField}
          onBlur={markTouched}
        />

        <Field
          id="contact-subject"
          name="subject"
          label="Subject"
          value={values.subject}
          error={visibleError("subject")}
          valid={!errors.subject && values.subject.trim().length > 0}
          disabled={submitting}
          required
          registerRef={(node) => {
            fieldRefs.current.subject = node;
          }}
          onChange={setField}
          onBlur={markTouched}
        />
        <SelectField
          id="contact-budget"
          name="budget"
          label="Project budget"
          value={values.budget}
          options={budgetOptions}
          disabled={submitting}
          registerRef={(node) => {
            fieldRefs.current.budget = node;
          }}
          onChange={setField}
          onBlur={markTouched}
        />

        <SelectField
          id="contact-type"
          name="type"
          label="Project type"
          value={values.type}
          options={projectTypeOptions}
          disabled={submitting}
          registerRef={(node) => {
            fieldRefs.current.type = node;
          }}
          onChange={setField}
          onBlur={markTouched}
        />
        <SelectField
          id="contact-country"
          name="country"
          label="Where are you based"
          value={values.country}
          options={countryOptions}
          disabled={submitting}
          registerRef={(node) => {
            fieldRefs.current.country = node;
          }}
          onChange={setField}
          onBlur={markTouched}
        />

        <div
          className={`form-field form-field--full${
            visibleError("message") ? " is-invalid" : ""
          }${!errors.message && messageLength >= MIN_MESSAGE ? " is-valid" : ""}`}
        >
          <div className="field-control">
            <textarea
              className="field-input"
              id="contact-message"
              name="message"
              rows="5"
              placeholder=" "
              value={values.message}
              disabled={submitting}
              required
              aria-invalid={visibleError("message") ? true : undefined}
              aria-describedby="contact-message-hint contact-message-counter"
              aria-required="true"
              ref={(node) => {
                fieldRefs.current.message = node;
              }}
              onChange={(event) => setField("message", event.target.value)}
              onBlur={() => markTouched("message")}
            />
            <label className="field-label" htmlFor="contact-message">
              Your message
              <span className="req" aria-hidden="true">
                *
              </span>
            </label>
            {!visibleError("message") && messageLength >= MIN_MESSAGE && (
              <span className="field-status" aria-hidden="true">
                <Check size={15} />
              </span>
            )}
          </div>
          <div className="field-foot">
            <p className="field-hint" id="contact-message-hint">
              {MIN_MESSAGE} characters minimum
            </p>
            <p className="field-counter" id="contact-message-counter" aria-hidden="true">
              {messageLength}
            </p>
          </div>
          {visibleError("message") && (
            <p className="field-error" id="contact-message-error" role="alert">
              {visibleError("message")}
            </p>
          )}
        </div>
      </div>

      {status === "sent" && (
        <div className="form-summary" role="status" tabIndex={-1} ref={summaryRef}>
          <span className="form-summary__icon" aria-hidden="true">
            <Check size={17} />
          </span>
          <strong>Message Sent Successfully!</strong>
          <p>
            This was a front-end demonstration: your text never left the browser and nothing was
            stored. Connect a backend or form service in <code>deliverMessage()</code> to receive
            real enquiries.
          </p>
        </div>
      )}

      <div className="form-actions">
        {status === "sent" ? (
          <button type="button" className="btn btn-ghost submit-btn" onClick={resetForm}>
            <RotateCcw size={16} /> Reset form
          </button>
        ) : (
          <>
            <button
              type="submit"
              className="btn btn-primary submit-btn"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <span className="spinner" aria-hidden="true" /> Sending Message...
                </>
              ) : (
                <>
                  <Send size={16} /> Send message
                </>
              )}
            </button>
            {(values.name || values.email || values.subject || values.message) && (
              <button type="button" className="reset-btn" onClick={resetForm} disabled={submitting}>
                Clear
              </button>
            )}
          </>
        )}
      </div>

      <p className="form-privacy" id="contact-form-note">
        Validation happens in your browser only. No message is delivered and no personal data is
        stored until a backend is connected.
      </p>
    </form>
  );
}
