import { useEffect, useState } from "react";
import { ArrowUpRight, Check, Copy, Phone } from "lucide-react";
import { useToast } from "../context/ToastContext";
import { profile, socialAccounts } from "../data/portfolio";
import { socialIcons } from "./SocialIcons";

/* The URLs are shown without the scheme so the cards stay readable on
   narrow screens; the anchor still points at the full address. */
const displayUrl = (url) => url.replace(/^https?:\/\/(www\.)?/, "");

export default function ContactInfo() {
  const toast = useToast();
  const [copied, setCopied] = useState(false);

  /* The "copied" confirmation decays on its own so the button returns to
     its normal label without leaving a timer running after unmount. */
  useEffect(() => {
    if (!copied) return undefined;
    const timer = setTimeout(() => setCopied(false), 2400);
    return () => clearTimeout(timer);
  }, [copied]);

  const copyPhone = async () => {
    try {
      if (!navigator.clipboard) throw new Error("clipboard unavailable");
      await navigator.clipboard.writeText(profile.phone);
      setCopied(true);
      toast.success("Number copied", `${profile.phone} is on your clipboard.`);
    } catch {
      toast.warning(
        "Copy blocked by your browser",
        `Dial or copy manually instead: ${profile.phone}.`,
      );
    }
  };

  return (
    <div className="channel-grid">
      <ul className="channel-list">
        {socialAccounts.map((account) => {
          const Icon = socialIcons[account.key];
          return (
            <li key={account.key}>
              <a
                className="glass-card channel-card"
                href={account.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="channel-icon" aria-hidden="true">
                  <Icon size={19} />
                </span>
                <span className="channel-body">
                  <span className="channel-label">{account.label}</span>
                  <span className="channel-handle">{account.handle}</span>
                  <span className="channel-url">{displayUrl(account.url)}</span>
                </span>
                <ArrowUpRight size={16} className="channel-arrow" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          );
        })}
      </ul>

      <div className="glass-card phone-card">
        <p className="eyebrow">Prefer to talk?</p>
        <a className="phone-number" href={profile.phoneHref}>
          <span className="phone-icon" aria-hidden="true">
            <Phone size={19} />
          </span>
          <span>{profile.phone}</span>
        </a>
        <p className="phone-hint">Tap the number to call — on desktop, share it by copy.</p>
        <button type="button" className="btn btn-ghost btn-mini" onClick={copyPhone}>
          {copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
          {copied ? "Copied" : "Copy number"}
        </button>
      </div>
    </div>
  );
}
