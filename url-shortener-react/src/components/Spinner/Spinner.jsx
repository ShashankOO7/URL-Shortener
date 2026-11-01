// src/components/Spinner/Spinner.jsx
import React from "react";
import { PulseLoader } from "react-spinners";
import { useThemeContext } from "../../hooks/useThemeContext";
/**
 * Spinner centers itself inside its parent's width & height.
 * Parent must have `relative` class for absolute positioning to work.
 */
export function Spinner() {
  const { theme } = useThemeContext();
  const color = theme === "dark" ? "#ffffff" : "#000000";
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center`}
    >
      <div className="flex flex-col justify-center items-center gap-2">
        <PulseLoader
          color={color}
          loading={true}
          size={15}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
}
