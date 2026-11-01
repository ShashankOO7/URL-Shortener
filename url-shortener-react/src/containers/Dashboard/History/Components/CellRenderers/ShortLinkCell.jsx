import { useState } from "react";
import { IoCopy } from "react-icons/io5";
import { LiaCheckSolid } from "react-icons/lia";
const ShortLinkCell = (props) => {
  const { value } = props;
  const [copied, setCopied] = useState(false);
  const handleCopy = async (e) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = value;
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };
  return (
    <div className="flex items-center gap-2 w-full overflow-hidden">
      <span className="truncate text-[13px]">{value}</span>
      <button
        onClick={handleCopy}
        className="flex-shrink-0 p-1 rounded hover:bg-white/10 transition-colors cursor-pointer"
        title={copied ? "Copied!" : "Copy short link"}
      >
        {copied ? (
          <LiaCheckSolid className="w-3.5 h-3.5 text-green-400" />
        ) : (
          <IoCopy className="w-3.5 h-3.5 opacity-60 hover:opacity-100" />
        )}
      </button>
    </div>
  );
};
export default ShortLinkCell;
