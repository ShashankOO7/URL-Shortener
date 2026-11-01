import { useState } from "react";
const DOMAIN_COLORS = {
  "youtube.com": "#FF0000",
  "twitter.com": "#1DA1F2",
  "x.com": "#000000",
  "facebook.com": "#1877F2",
  "instagram.com": "#E4405F",
  "linkedin.com": "#0A66C2",
  "github.com": "#181717",
  "vimeo.com": "#1AB7EA",
  "unsplash.com": "#111111",
  "reddit.com": "#FF4500",
  "tiktok.com": "#010101",
  "pinterest.com": "#BD081C",
  "medium.com": "#000000",
  "spotify.com": "#1DB954",
};
const getDomain = (url) => {
  try {
    const hostname = new URL(url).hostname.replace("www.", "");
    return hostname;
  } catch {
    return "";
  }
};
const getColor = (domain) => {
  for (const [key, color] of Object.entries(DOMAIN_COLORS)) {
    if (domain.includes(key)) return color;
  }
  // Generate a consistent color from the domain string
  let hash = 0;
  for (let i = 0; i < domain.length; i++) {
    hash = domain.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 60%, 50%)`;
};
const OriginalLinkCell = (props) => {
  const { value } = props;
  const domain = getDomain(value);
  const color = getColor(domain);
  const firstLetter = domain.charAt(0).toUpperCase();
  const [faviconError, setFaviconError] = useState(false);
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
  return (
    <div className="flex items-center gap-2.5 w-full overflow-hidden">
      <div
        className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: faviconError ? color : "transparent" }}
      >
        {!faviconError ? (
          <img
            src={faviconUrl}
            alt={domain}
            className="w-5 h-5 rounded-sm"
            onError={() => setFaviconError(true)}
            loading="lazy"
          />
        ) : (
          <span className="text-white text-xs font-bold">{firstLetter}</span>
        )}
      </div>
      <a
        href={value}
        target="_blank"
        rel="noopener noreferrer"
        className="truncate text-[13px] hover:underline"
        title={value}
      >
        {value}
      </a>
    </div>
  );
};
export default OriginalLinkCell;
