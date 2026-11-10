import { useState } from "react";
import { ArrowUpRight, Phone } from "lucide-react";
import { useToast } from "../context/ToastContext";
import SocialLinks from "./SocialLinks";
import { footerLinks, profile, socialAccounts } from "../data/portfolio";
import { emailPattern } from "../utils/validation";
import { scrollToSection } from "../utils/scroll";

const connectLinks = [
  ...socialAccounts.map((account) => ({
    label: `${account.label} ↗`,
    href: account.url,
    external: true,
  })),
  { label: `Call ${profile.phone}`, href: profile.phoneHref },
  { label: "Email ↗", href: `mailto:${profile.email}` },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const toast = useToast();

  const goTo = (id) => (event) => {
    event.preventDefault();
    scrollToSection(id);
  };

  const handleSubscribe = (event) => {
    event.preventDefault();
    if (!emailPattern.test(email.trim())) {
      toast.error("That email address isn't valid", "Check the format, e.g. jane@company.com.");
      return;
    }
    /* No address leaves the page: nothing is stored until a provider is
       connected here. */
    setSubscribed(true);
    setEmail("");
    toast.info(
      "Newsletter sign-up is not live yet",
      "Front-end demo — connect a provider such as Buttondown or Mailchimp to collect addresses.",
      { duration: 6000 },
    );
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <a className="brand" href="#home" onClick={goTo("home")}>
            <span className="brand-mark" aria-hidden="true">
              M<span>.</span>
            </span>
            <span className="brand-name">
              MELES<em> MOLLA</em>
            </span>
          </a>
          <p>Curiosity in mind. Purpose in every pixel.</p>
          <div className="footer-contact">
            <SocialLinks className="footer-social" size={16} label="Meles Molla on TikTok, Instagram, Telegram, LinkedIn and GitHub" />
            <a className="footer-phone" href={profile.phoneHref}>
              <Phone size={14} aria-hidden="true" /> {profile.phone}
            </a>
          </div>
          <a className="back-top" href="#home" onClick={goTo("home")}>
            Back to top <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>

        <div className="footer-grid">
          {Object.entries(footerLinks).map(([label, links]) => (
            <nav className="footer-column" key={label} aria-label={label}>
              <p className="footer-label">{label}</p>
              {links.map((link) => (
                <a key={link.label} href={link.href} onClick={goTo(link.href.slice(1))}>
                  {link.label}
                </a>
              ))}
            </nav>
          ))}

          <nav className="footer-column" aria-label="Let's connect">
            <p className="footer-label">LET&apos;S CONNECT</p>
            {connectLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                {...(link.external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="newsletter">
          <div>
            <p className="eyebrow">Occasional notes</p>
            <p>Ideas, experiments, and things worth sharing.</p>
          </div>
          <form onSubmit={handleSubscribe} noValidate aria-label="Newsletter sign-up">
            <label className="sr-only" htmlFor="newsletter-email">
              Email address for the newsletter
            </label>
            <input
              id="newsletter-email"
              type="email"
              autoComplete="email"
              placeholder="Your email address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              aria-describedby={subscribed ? "newsletter-note" : undefined}
            />
            <button type="submit" aria-label="Subscribe to occasional notes">
              <ArrowUpRight size={18} />
            </button>
          </form>
          {subscribed && (
            <p className="newsletter-note" id="newsletter-note">
              Demo only — connect a newsletter provider to activate.
            </p>
          )}
        </div>

        <p className="footer-bottom">
          <span>© {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
          <span>
            Designed with intention <i aria-hidden="true">✳</i> Built with React
          </span>
          <span>{profile.location}</span>
        </p>
      </div>
    </footer>
  );
}
