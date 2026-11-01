import React from "react";
export default function ThemeButton({ label, theme, icon, activeTheme, onClick }) {
  const isActive = theme === activeTheme;
  return (
    <button
      onClick={onClick}
      aria-pressed={isActive}
      className={`px-3 py-10 rounded-full transition-colors duration-300 cursor-pointer ${
        isActive
          ? "bg-btn hover:bg-blue-600 text-white"
          : "text-gray-400 hover:text-gray-200"
      }`}
    >
      <div className="text-2xl mb-2">{icon}</div>
      <p style={{ writingMode: "vertical-rl"}}>{label}</p>
    </button>
  );
}
