import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdLogin } from "react-icons/md";
import { FaMoon, FaSun, FaChevronDown, FaUserCircle } from "react-icons/fa";
import { MdDashboard, MdLogout } from "react-icons/md";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { globalConstants } from "../../constants/globalConstants";
import { authConstants } from "../../constants/authConstants";
import { endpoints } from "../../constants/apiConstants";
import { useAuthContext } from "../../hooks/useAuthContext";
export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { token, username, setToken, setUsername } = useAuthContext();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const backgroundColor = theme === "light" ? "#f5f5f7" : "#111827";
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleLogout = () => {
    setToken(null);
    setUsername(null);
    localStorage.removeItem("JWT_TOKEN");
    localStorage.removeItem("USERNAME");
    localStorage.removeItem("statistics_date_range");
    setDropdownOpen(false);
    navigate("/");
  };
  return (
    <nav
      className="flex justify-between items-center py-5 md:py-3 px-8 z-20 fixed top-0 left-0 right-0"
      style={{ backgroundColor }}
    >
      <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent cursor-pointer">
        <Link to="/">{globalConstants.APP_TITLE}</Link>
      </h1>
      <div className="flex items-center gap-3">
        {/* Mobile Toggle Button */}
        <button
          onClick={toggleTheme}
          className="block md:hidden p-3 rounded-full border border-gray-500 transition"
        >
          {theme === "dark" ? <FaSun /> : <FaMoon className="text-secondary" />}
        </button>
        {!token && (
          <div className="flex justify-between items-center md:gap-3">
            {/* Login Button */}
            <Link to={endpoints.auth.login}>
              <button className="px-4 py-2 border flex justify-center gap-1 items-center text-secondary dark:text-secondary-dark border-gray-500 rounded-full transition cursor-pointer">
                {authConstants.LOGIN} <MdLogin />
              </button>
            </Link>
            {/* Register Button (Desktop only) */}
            <Link to={endpoints.auth.register}>
              <button className="hidden md:block px-4 py-2 rounded-full bg-btn hover:bg-blue-600 text-white shadow-md cursor-pointer transition">
                {authConstants.REGISTER_NOW}
              </button>
            </Link>
          </div>
        )}
        {token && (
          <div className="relative" ref={dropdownRef}>
            {/* Dropdown Trigger - Desktop */}
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="hidden md:flex items-center justify-evenly w-40 py-2 rounded-full border border-gray-600 bg-[#1a1f2e] cursor-pointer"
            >
              <div className="flex flex-col items-center max-w-4/5">
                <span className="text-gray-400 text-xs font-light">Welcome</span>
                <span className="text-white text-base font-medium max-w-[100px] truncate">{username || "User"}</span>
              </div>
              <FaChevronDown className={`text-gray-400 text-sm transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {/* Dropdown Trigger - Mobile (User Icon) */}
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex md:hidden items-center justify-center p-2 rounded-full border bg-[#1a1f2e] border-gray-500 cursor-pointer transition"
            >
              <FaUserCircle className="text-gray-300 text-2xl" />
            </button>
            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#1a1f2e] border border-gray-600 rounded-xl shadow-lg overflow-hidden z-50">
                <Link
                  to={endpoints.dashboard.url}
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-700 transition"
                >
                  <MdDashboard className="text-lg" />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 w-full text-gray-300 hover:bg-gray-700 transition border-t border-gray-600"
                >
                  <MdLogout className="text-lg" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
