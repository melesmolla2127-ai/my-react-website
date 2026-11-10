export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const MIN_SUBJECT = 3;
export const MIN_MESSAGE = 20;

/* One rule per required field. Optional selects are intentionally
   absent — they never block a submission. */
const rules = {
  name: (value) => (value.trim() ? "" : "Please enter your full name."),
  email: (value) => {
    const trimmed = value.trim();
    if (!trimmed) return "Please enter your email address.";
    return emailPattern.test(trimmed) ? "" : "Enter a valid email address, e.g. jane@company.com.";
  },
  subject: (value) => {
    const trimmed = value.trim();
    if (!trimmed) return "Please add a short subject.";
    return trimmed.length < MIN_SUBJECT ? `Subject needs at least ${MIN_SUBJECT} characters.` : "";
  },
  message: (value) => {
    const trimmed = value.trim();
    if (!trimmed) return "Please tell me a little about your project.";
    return trimmed.length < MIN_MESSAGE
      ? `Message needs at least ${MIN_MESSAGE} characters (${trimmed.length}/${MIN_MESSAGE}).`
      : "";
  },
};

export const requiredFields = Object.keys(rules);

export const emptyContactForm = {
  name: "",
  email: "",
  subject: "",
  budget: "",
  type: "",
  country: "",
  message: "",
};

export function validateField(field, value) {
  const rule = rules[field];
  return rule ? rule(value) : "";
}

export function validateForm(values) {
  return requiredFields.reduce((errors, field) => {
    const message = validateField(field, values[field]);
    if (message) errors[field] = message;
    return errors;
  }, {});
}
