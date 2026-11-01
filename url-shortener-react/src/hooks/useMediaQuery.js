import { useEffect, useState } from "react";
/**
 * Custom hook for media query
 * @param {string} query - e.g. "(max-width: 640px)" for Tailwind's sm breakpoint
 * @returns {boolean} true if matches
 */
export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    // Set initial state
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    // Listener for changes
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);
  return matches;
}
