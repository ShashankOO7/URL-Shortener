// src/components/ThemeToggle/ThemeToggle.jsx
import React from "react";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import ThemeButton from "./ThemeButton";
import { FaRegSun } from "react-icons/fa6";
import { FaRegMoon } from "react-icons/fa";
import { globalConstants } from "../../constants/globalConstants";
import { useThemeContext } from "../../hooks/useThemeContext";
export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeContext();
  return (
    <div className="fixed right-4 top-2/5 hidden md:flex flex-col gap-2 bg-gray-100 dark:bg-gray-900 border rounded-full border-gray-700 p-2">
      <ThemeButton
        label={globalConstants.theme.lightLabel}
        theme={globalConstants.theme.light}
        icon={<FaRegSun />}
        activeTheme={theme}
        onClick={toggleTheme}     // single toggle handler
      />
      <ThemeButton
        label={globalConstants.theme.darkLabel}
        theme={globalConstants.theme.dark}
        icon={<FaRegMoon />}
        activeTheme={theme}
        onClick={toggleTheme}     // single toggle handler
      />
    </div>
  );
}
