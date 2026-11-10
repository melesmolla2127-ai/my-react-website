import { socialAccounts } from "../data/portfolio";
import { socialIcons } from "./SocialIcons";

/* One shared icon row: the hero, the contact section and the footer all render
   the same accounts, so the markup and the a11y wording live here once. */
export default function SocialLinks({ className = "", size = 18, label = "Social profiles" }) {
  return (
    <ul className={`social-links${className ? ` ${className}` : ""}`} aria-label={label}>
      {socialAccounts.map((account) => {
        const Icon = socialIcons[account.key];
        return (
          <li key={account.key}>
            <a
              className="social-links__link"
              href={account.url}
              target="_blank"
              rel="noopener noreferrer"
              data-tip={`${account.label} ${account.handle}`}
              aria-label={`${account.label}: ${account.handle} (opens in a new tab)`}
            >
              <Icon size={size} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
