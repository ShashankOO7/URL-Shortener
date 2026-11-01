import { useState, useRef, useEffect } from "react";
import { FaFilter, FaTimes } from "react-icons/fa";
import { useThemeContext } from "../../../../../../hooks/useThemeContext.js";
export const TableControls = ({ gridApiRef, isFilterApplied, searchText, setSearchText }) => {
  const { theme } = useThemeContext();
  const isDark = theme === "dark";
  const [showSearch, setShowSearch] = useState(false);
  const inputRef = useRef(null);
  useEffect(() => {
    if (showSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearch]);
  const handleSearch = (e) => {
    const val = e.target.value;
    setSearchText(val);
    if (gridApiRef?.current) {
      gridApiRef.current.setGridOption("quickFilterText", val);
    }
  };
  const handleClear = () => {
    setSearchText("");
    if (gridApiRef?.current) {
      gridApiRef.current.setFilterModel(null);
      gridApiRef.current.setGridOption("quickFilterText", "");
    }
  };
  const toggleSearch = () => {
    if (showSearch) {
      handleClear();
      setShowSearch(false);
    } else {
      setShowSearch(true);
    }
  };
  return (
    <div className="relative flex items-center gap-3 h-10">
      {/* Search input (absolutely positioned to avoid layout shift) */}
      {showSearch && (
        <div className="absolute right-[110px] top-1/2 -translate-y-1/2">
          <input
            ref={inputRef}
            type="text"
            value={searchText}
            onChange={handleSearch}
            placeholder="Search URLs..."
            className={`pl-3 pr-8 py-2 text-sm rounded-full w-56 outline-none transition-all ${
              isDark
                ? "bg-gray-800 text-white border border-gray-700 focus:border-blue-500"
                : "bg-gray-100 text-gray-900 border border-gray-300 focus:border-blue-500"
            }`}
          />
          {searchText && (
            <button
              onClick={handleClear}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              <FaTimes className="w-3 h-3 opacity-50 hover:opacity-100" />
            </button>
          )}
        </div>
      )}
      {/* Filter button */}
      <button
        onClick={toggleSearch}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
          isFilterApplied || showSearch
            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
            : isDark
              ? "bg-[#1e2642] text-gray-300 hover:bg-[#252d4a] border border-white/10"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
        }`}
      >
        <FaFilter className="w-3 h-3" />
        <span>Filter</span>
      </button>
    </div>
  );
};
export default TableControls;
