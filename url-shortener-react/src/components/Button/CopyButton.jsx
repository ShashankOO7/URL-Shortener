import { useState } from "react";
import { IoCopy } from "react-icons/io5";
import { LiaCheckSolid } from "react-icons/lia";
const CopyButton = ({
  textToCopy,
  copiedText = "Copied",
  defaultText = "Copy",
  //resetDelay = 2000,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        // Fallback for non-secure context
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
      }
      setIsCopied(true);
      //setTimeout(() => setIsCopied(false), resetDelay);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };
  return (
    <div
      onClick={handleCopy}
      className={"flex cursor-pointer gap-1 items-center bg-blue-700 py-2 px-6 rounded-md text-white"}
      role="button"
      aria-label="Copy to clipboard"
    >
      <button type="button" disabled={isCopied} className="cursor-pointer">
        {isCopied ? copiedText : defaultText}
      </button>
      {isCopied ? (
        <LiaCheckSolid className="text-md" />
      ) : (
        <IoCopy className="text-md" />
      )}
    </div>
  );
};
export default CopyButton;
