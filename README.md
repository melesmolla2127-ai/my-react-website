# Meles Molla — React Portfolio

A single-page React portfolio with a black-and-gold design system: Vite, hand-written CSS custom properties, and Lucide React icons. No UI framework, no jQuery.

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Build for deployment

```bash
npm run build
npm run preview   # serve the production bundle locally
```

Upload the contents of the generated `dist/` folder to Netlify, Vercel, or another static host.

## Project structure

```
index.html                 SEO/OG/Twitter meta, fonts, Person JSON-LD
public/favicon.svg         monogram tile
public/og-image.png        social preview card (replace with your own)
src/data/portfolio.js      ALL content: profile, projects, skills, services,
                           journey, education, journal, testimonials, options
src/styles/*.css           variables → global → animations → components →
                           form → sections → layout-fixes → responsive
src/hooks/                 theme, language, media/motion preference, scroll
                           progress, scroll spy, in-view, count-up
src/context/ToastContext   success / error / warning / info notifications
src/components/            Navbar, Hero, About, Skills, Projects, Journey,
                           Services, Testimonials, Journal, Contact, Footer,
                           ContactForm, ProjectModal, Toast, CustomCursor,
                           ScrollProgress, BackToTop, ParticleField, Reveal
src/utils/validation.js    field rules shared by the contact form
src/utils/scroll.js        reduced-motion-aware section scrolling
```

Edit content in `src/data/portfolio.js`; edit tokens in `src/styles/variables.css`.

## Personalize before publishing

In `src/data/portfolio.js`:

- `profile.email`, `profile.github`, `profile.linkedin` — currently placeholders
- `profile.cv` — put the PDF at `public/meles-molla-cv.pdf`, then set `published: true`.
  While it is `false`, the hero shows "Request my CV" (a `mailto:` link) instead of a broken download.

In `index.html`, replace every `https://example.com` (canonical, `og:url`, `og:image`,
`twitter:url`, JSON-LD `url`) with your real domain, and fill the JSON-LD `sameAs` entries.

Review the content carefully:

- Project cards mix shipped work and concepts; keep status, descriptions and links honest.
- The testimonial carousel is explicitly sample content. Replace it with real, permissioned
  testimonials or remove the section.
- Timeline and education details are starter copy — confirm dates and programmes.
- Skill percentages are illustrative self-assessments.

## Features

- Dark/light theme (gold-on-ivory light palette) saved in `localStorage`
- Language selector scaffold with Arabic RTL document direction
- Animated gold particle canvas, greeting and role rotation, IP-based greeting line
- Sticky blurred navbar with scroll-spy indicator, animated hamburger, Escape to close
- Scroll progress bar, back-to-top ring, luxury cursor (fine-pointer only), toasts
- Project filters, detail modal with focus trap and focus restore
- Skill tabs with animated progress bars, count-up statistics
- Contact form: real-time validation, inline errors, loading state, success panel, reset
- Scroll reveals and hero entrance, all disabled under `prefers-reduced-motion`
- SEO metadata, Open Graph, Twitter card, Person JSON-LD
- Skip link, landmarks, labelled controls, keyboard focus styles, WCAG AA contrast

## Important production notes

- **The contact form and the newsletter are front-end demos.** Nothing is sent or stored.
  Wire a real endpoint inside `deliverMessage()` in `src/components/ContactForm.jsx`
  (a commented `fetch("/api/contact", ...)` example is there) before advertising the form.
- The language selector changes document language/direction and persists the choice; full
  translated copy is not wired. Add dictionaries before claiming multilingual support.
- Geolocation depends on the third-party `ipapi.co` service and fails silently when blocked.
- `public/og-image.png` is a generated placeholder — replace it with your own 1200×630 card.
