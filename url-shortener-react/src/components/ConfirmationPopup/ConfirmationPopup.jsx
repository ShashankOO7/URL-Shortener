import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useThemeContext } from "../../hooks/useThemeContext";
const ConfirmationPopup = ({
  open = true,
  title = "",
  children,
  onClose = () => {},
  actions = [],
  maxWidth = "sm",
}) => {
  const { theme } = useThemeContext();
  const isDark = theme === "dark";
  // Prevent background scroll while popup is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  if (!open) return null;
  const widthClass =
    maxWidth === "xs" ? "max-w-xs" : maxWidth === "md" ? "max-w-md" : "max-w-sm";
  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop ? blocks all background interaction */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={onClose}
      />
      {/* Dialog card */}
      <div
        className={`relative z-10 w-full ${widthClass} mx-4 rounded-xl shadow-2xl p-6 ${
          isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className={`p-1 rounded-full transition-colors cursor-pointer ${
              isDark ? "hover:bg-gray-700 text-gray-400" : "hover:bg-gray-100 text-gray-500"
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {/* Content */}
        <div className="mb-6">{children}</div>
        {/* Actions */}
        {actions.length > 0 && (
          <div className="flex justify-end gap-3">
            {actions.map((action, idx) => (
              <button
                key={idx}
                onClick={action.onClick}
                disabled={action.disabled}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                  action.className || ""
                }`}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};
export default ConfirmationPopup;
