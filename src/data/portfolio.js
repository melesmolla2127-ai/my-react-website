import {
  Code2, Cpu, Globe2, Layers3, Terminal, Zap,
} from "lucide-react";

/* ============================================================
   All portfolio content lives here. Sections render from these
   exports, so editing copy never means editing JSX.
   ============================================================ */

export const profile = {
  name: "Meles Molla",
  title: "Full-Stack Developer | Software Developer | UI/UX Enthusiast",
  location: "Addis Ababa, Ethiopia",
  email: "melesmolla2127@gmail.com",
  phone: "0962713021",
  phoneHref: "tel:0962713021",
  site: "https://example.com", // TODO: replace with your published domain
  // Set cv.href only after adding the real file to /public. While
  // cv.published is false the hero shows no CV action, so no visitor
  // ever hits a missing download.
  cv: { href: "/meles-molla-cv.pdf", published: false },
};

/* The accounts Meles publishes under. `icon` keys map to the brand marks in
   src/components/SocialIcons.jsx. */
export const socialAccounts = [
  { key: "tiktok", label: "TikTok", handle: "@meledigital", url: "https://www.tiktok.com/@meledigital" },
  { key: "instagram", label: "Instagram", handle: "@melesmolla21", url: "https://www.instagram.com/melesmolla21" },
  { key: "telegram", label: "Telegram", handle: "@mele11_54", url: "https://t.me/mele11_54" },
  { key: "linkedin", label: "LinkedIn", handle: "Meles Molla", url: "https://www.linkedin.com/in/meles-molla-849931439" },
  { key: "github", label: "GitHub", handle: "melesmolla2127-ai", url: "https://github.com/melesmolla2127-ai" },
];

export const heroIntro = [
  "I create modern, responsive, and powerful digital experiences through innovative technology and creative design.",
  "I'm passionate about software development, building useful applications, and transforming ideas into real-world digital solutions.",
];

export const navSections = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Journey", id: "journey" },
  { label: "Services", id: "services" },
  { label: "Contact", id: "contact" },
];

export const greetings = ["Hello", "Bonjour", "مرحباً", "Hola", "你好"];

export const roles = [
  "Full-Stack Developer",
  "Web Developer",
  "Software Developer",
  "UI/UX Enthusiast",
  "Technology Innovator",
];

export const projects = [
  { id: 1, title: "Tab Machinery", type: "Web App", year: "2026", tag: "Business platform", desc: "A polished digital presence for an industrial machinery business, designed to turn product discovery into clear customer enquiries.", detail: "A responsive machinery website with product storytelling, enquiry workflows, and a Telegram-connected order experience. The project focuses on clarity, trust, and a frictionless path from browsing to contacting the business.", stack: ["React", "Vite", "CSS", "Telegram Bot"], icon: "◈", tone: "gold", link: "https://tabmachine.kesug.com/" },
  { id: 2, title: "Mele Game", type: "Web App", year: "2025", tag: "Interactive web game", desc: "A fast, playful number-guessing game with a timer, score system, and personal best tracking.", detail: "A browser-based logic game built as a first complete application. It combines a simple game loop, attempt tracking, scoring, and local persistence for best results.", stack: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"], icon: "✳", tone: "amber", link: "https://melegame.wuaze.com" },
  { id: 3, title: "School Learning Platform", type: "Web App", year: "Concept", tag: "Education technology", desc: "A concept for connecting students, teachers, parents, and school administrators in one learning space.", detail: "A planned education platform with learning materials, quizzes, progress reporting, attendance, and multilingual parent communication. This card represents a concept in development, not a launched product.", stack: ["Flutter", "Laravel", "MySQL"], icon: "⌘", tone: "bronze", link: "#contact" },
  { id: 4, title: "Digital Menu System", type: "Web App", year: "2026", tag: "Hospitality technology", desc: "A QR-based ordering workflow connecting guests, waiters, and kitchen staff.", detail: "A restaurant and hotel menu concept focused on live order status, role-based workflows, menu management, and a clear dark interface.", stack: ["PHP", "MySQL", "JavaScript", "AJAX"], icon: "▦", tone: "ivory", link: "#contact" },
  { id: 5, title: "Developer Portfolio", type: "Open Source", year: "2026", tag: "Personal brand", desc: "A personal portfolio experience with a strong visual identity and responsive interactions.", detail: "A modular portfolio starter with theme switching, project filters, animated details, and international-ready interface patterns.", stack: ["React", "Vite", "CSS"], icon: "✧", tone: "gold", link: "#home" },
  { id: 6, title: "AI Workflow Experiments", type: "AI/ML", year: "Exploring", tag: "Applied AI", desc: "Experiments exploring how AI can make everyday digital products more useful.", detail: "An evolving exploration area for practical AI integrations, automation concepts, and human-centered product workflows.", stack: ["JavaScript", "APIs", "AI tools"], icon: "⌬", tone: "amber", link: "#contact" },
];

export const projectFilters = ["All", "Web App", "Open Source", "AI/ML"];

export const skillGroups = {
  Frontend: [["HTML5", 92], ["CSS3", 88], ["JavaScript", 82], ["React", 72], ["Responsive UI", 86], ["Accessibility", 68]],
  Backend: [["PHP", 78], ["MySQL", 74], ["REST APIs", 68], ["Node.js", 48], ["Laravel", 52], ["Database design", 62]],
  "Tools & Workflow": [["Git & GitHub", 72], ["VS Code", 90], ["Figma", 55], ["Vite", 68], ["Firebase", 42], ["Deployment", 64]],
};

export const skillSymbols = ["◈", "⌘", "✳", "▧", "◎", "⌬"];

export const softSkills = [
  "Problem solving",
  "Clear communication",
  "Continuous learning",
  "Creative thinking",
  "Adaptability",
  "Team collaboration",
];

export const services = [
  { Icon: Code2, title: "Web development", desc: "Responsive websites and practical web applications built around real user needs." },
  { Icon: Layers3, title: "Interface design", desc: "Clean, thoughtful interfaces that make complex products feel simple." },
  { Icon: Globe2, title: "Business websites", desc: "Professional digital experiences that help businesses build trust and get enquiries." },
  { Icon: Terminal, title: "API integration", desc: "Connect services, automate workflows, and make your products work together." },
  { Icon: Cpu, title: "Product prototyping", desc: "Turn an early idea into a clear, testable digital product direction." },
  { Icon: Zap, title: "Ongoing improvements", desc: "Refine, maintain, and improve existing websites as your business grows." },
];

export const stats = [
  { value: 3, suffix: "+", label: "Core projects explored" },
  { value: 6, suffix: "+", label: "Featured concepts" },
  { value: 2, suffix: "+", label: "Languages" },
  { value: 100, suffix: "%", label: "Percent curiosity" },
];

export const journey = [
  {
    date: "2026 — NOW",
    type: "INDEPENDENT PROJECTS",
    title: "Full-Stack Developer & UI Designer",
    org: "Independent · Ethiopia",
    points: [
      "Building responsive websites and interactive web experiences.",
      "Exploring product workflows, APIs, and practical automation.",
      "Continuously developing frontend and backend skills through projects.",
    ],
  },
  {
    date: "2025 — 2026",
    type: "HANDS-ON DEVELOPMENT",
    title: "Self-directed Developer",
    org: "Personal learning & experiments",
    points: [
      "Practiced HTML, CSS, JavaScript, PHP, and MySQL.",
      "Created early web projects and learned deployment workflows.",
      "Developed an interest in building complete, useful applications.",
    ],
  },
  {
    date: "ACADEMIC PATH",
    type: "EDUCATION",
    title: "University studies",
    org: "Addis Ababa Science and Technology University · Ethiopia",
    note: "Academic growth alongside independent technology learning. Update this entry with your confirmed program, department, and dates.",
  },
];

export const education = [
  { eyebrow: "EDUCATION", title: "University studies", desc: "AASTU · Addis Ababa, Ethiopia", year: "CURRENT", icon: "command" },
  { eyebrow: "SELF DEVELOPMENT", title: "Continuous learning", desc: "Web development · Product thinking · Design", year: "ONGOING", icon: "sparkles" },
];

export const testimonials = [
  { name: "Project collaborator", role: "Business owner", company: "Small business", country: "🇪🇹", quote: "Meles approaches digital work with curiosity and a strong focus on making the experience clear for the people using it." },
  { name: "Product partner", role: "Founder", company: "Early-stage product", country: "🇺🇸", quote: "Thoughtful communication, practical ideas, and a willingness to keep improving the details made the collaboration valuable." },
  { name: "Design teammate", role: "Designer", company: "Creative team", country: "🇩🇪", quote: "A good balance of visual ambition and attention to how the product actually works." },
  { name: "Technology peer", role: "Developer", company: "Independent team", country: "🇦🇪", quote: "Always exploring better ways to build, connect tools, and make technology useful." },
  { name: "Community member", role: "Open-source enthusiast", company: "Developer community", country: "🇯🇵", quote: "The best part is the energy to learn, experiment, and turn ideas into working prototypes." },
];

export const journalPosts = [
  { n: "01", cat: "BUILD BETTER", title: "Making a website feel fast: the details that matter", desc: "A practical look at loading, layout stability, image sizing, and the small decisions that make a web experience feel responsive.", time: "6 MIN READ", tone: "gold" },
  { n: "02", cat: "OPEN SOURCE", title: "Learning in public: why building small projects works", desc: "How small, finished experiments can build confidence, sharpen problem-solving, and create a portfolio with substance.", time: "4 MIN READ", tone: "amber" },
  { n: "03", cat: "REMOTE WORK", title: "Clear communication across a distributed team", desc: "Simple habits for writing better updates, documenting decisions, and keeping collaboration moving across time zones.", time: "5 MIN READ", tone: "bronze" },
];

export const budgetOptions = [
  "Under $500",
  "$500 – $1,500",
  "$1,500 – $5,000",
  "$5,000+",
  "Let's discuss",
];

export const projectTypeOptions = [
  "Business website",
  "Web application",
  "UI / UX design",
  "API integration",
  "Consultation",
  "Other",
];

export const countryOptions = [
  "Ethiopia 🇪🇹",
  "United States 🇺🇸",
  "United Kingdom 🇬🇧",
  "Germany 🇩🇪",
  "United Arab Emirates 🇦🇪",
  "Other",
];

export const footerLinks = {
  EXPLORE: [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Journey", href: "#journey" },
  ],
  "WHAT I DO": [
    { label: "Web development", href: "#services" },
    { label: "Interface design", href: "#services" },
    { label: "API integration", href: "#services" },
  ],
  "SELECTED WORK": [
    { label: "Tab Machinery", href: "#projects" },
    { label: "Mele Game", href: "#projects" },
    { label: "Learning platform", href: "#projects" },
  ],
};

export const languages = ["EN", "FR", "AR", "ES", "ZH"];
