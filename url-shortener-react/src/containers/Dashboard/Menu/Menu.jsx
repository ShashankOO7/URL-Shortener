import React from "react";
import clsx from "clsx";
import { useThemeContext } from "../../../hooks/useThemeContext";
import { FaRegClock } from "react-icons/fa6";
import { FaRegHandPointer } from "react-icons/fa";
import { RiBarChart2Line } from "react-icons/ri";
const MENU_ITEMS = [
  { key: "history", label: "History", icon: <FaRegClock /> },
  { key: "clickstream", label: "Click Stream", icon: <FaRegHandPointer /> },
  { key: "statistics", label: "Statistics", icon: <RiBarChart2Line /> },
];
export const Menu = ({ activeTab, onChange }) => {
  const { theme } = useThemeContext();
  const backgroundColor = theme === "light" ? "#eeeeee" : "#181e29";
  const glassStyles = {
    backgroundColor: theme === "light" ? "rgba(238, 238, 238, 0.7)" : "rgba(24, 30, 41, 0.7)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
  };
  
  const getButtonStyles = (isActive) => {
    if (isActive) {
      return {
        color: theme === "light" ? "#2563eb" : "#3b82f6", // blue-600 / blue-500
        borderBottom: "3px solid",
        borderBottomColor: theme === "light" ? "#2563eb" : "#3b82f6",
      };
    }
    return {
      color: theme === "light" ? "#6b7280" : "#f5f5f7", // gray-500 / white
    };
  };
  
  return (
    <nav className="w-full border-b border-gray-200 dark:border-gray-700" style={{ backgroundColor }}>
      <div className="max-w-6xl mx-auto flex justify-center py-2 px-4" style={glassStyles}>
        {MENU_ITEMS.map((item) => {
          const isActive = activeTab === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onChange(item.key)}
              className={clsx(
                "flex items-center justify-center text-sm sm:text-base font-medium transition-colors w-1/3 md:w-1/5 px-2 py-2 gap-2",
                !isActive && "hover:opacity-80"
              )}
              style={getButtonStyles(isActive)}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.target.style.color = theme === "light" ? "#111827" : "#f3f4f6"; // gray-900 / gray-100
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.target.style.color = theme === "light" ? "#6b7280" : "#f5f5f7"; // gray-500 / white
                }
              }}
            >
              {item.icon}
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
