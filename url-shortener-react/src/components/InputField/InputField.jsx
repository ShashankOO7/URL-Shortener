import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
export default function InputField({
  label,
  id,
  type,
  placeholder,
  register,
  errors,
  required,
  message,
  min,
  icon: Icon,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);
  const inputType = type === "password" && showPassword ? "text" : type;
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200"
      >
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-500 dark:text-gray-400">
            <Icon size={18} />
          </span>
        )}
        <input
          type={inputType}
          id={id}
          {...register(id, {
            required: required ? { value: true, message } : false,
            minLength: min
              ? { value: min, message: `Minimum ${min} characters required` }
              : null,
            pattern:
              type === "email"
                ? {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/,
                    message: "Invalid email address",
                  }
                : null,
          })}
          placeholder={placeholder}
          className={`w-full px-4 py-2 rounded-lg border 
                      bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                      focus:outline-none focus:ring-2 focus:ring-blue-500
                      ${Icon ? "pl-10" : ""} 
                      ${
                        errors[id]?.message
                          ? "border-red-500"
                          : "border-gray-300 dark:border-gray-600"
                      }`}
        />
        {/* Password toggle button */}
        {type === "password" && (
          <button
            type="button"
            onClick={togglePassword}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </button>
        )}
      </div>
      {errors[id]?.message && (
        <p className="text-sm font-semibold text-red-500 mt-1">
          {errors[id]?.message}
        </p>
      )}
    </div>
  );
}
