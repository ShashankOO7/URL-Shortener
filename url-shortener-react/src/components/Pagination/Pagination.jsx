import { useThemeContext } from "../../hooks/useThemeContext";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
const Pagination = ({ currentPage, totalPages, totalElements, pageSize, onPageChange }) => {
  const { theme } = useThemeContext();
  const isDark = theme === "dark";
  if (totalPages <= 1) return null;
  const startItem = currentPage * pageSize + 1;
  const endItem = Math.min((currentPage + 1) * pageSize, totalElements);
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    if (totalPages <= maxVisible) {
      for (let i = 0; i < totalPages; i++) pages.push(i);
    } else {
      pages.push(0);
      let start = Math.max(1, currentPage - 1);
      let end = Math.min(totalPages - 2, currentPage + 1);
      if (currentPage <= 2) { start = 1; end = 3; }
      if (currentPage >= totalPages - 3) { start = totalPages - 4; end = totalPages - 2; }
      if (start > 1) pages.push("...");
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages - 2) pages.push("...");
      pages.push(totalPages - 1);
    }
    return pages;
  };
  const btnBase = `px-3 py-1.5 text-sm rounded-lg transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed`;
  const activeCls = isDark
    ? "bg-blue-600 text-white"
    : "bg-blue-600 text-white";
  const inactiveCls = isDark
    ? "text-gray-300 hover:bg-gray-700"
    : "text-gray-700 hover:bg-gray-100";
  return (
    <div className={`flex items-center justify-between pt-3 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
      <span className="text-xs">
        {startItem}?{endItem} of {totalElements}
      </span>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0}
          className={btnBase}
          title="Previous page"
        >
          <FaChevronLeft className="w-3 h-3" />
        </button>
        {getPageNumbers().map((p, i) =>
          p === "..." ? (
            <span key={`ellipsis-${i}`} className="px-2 text-sm">...</span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`${btnBase} ${p === currentPage ? activeCls : inactiveCls}`}
            >
              {p + 1}
            </button>
          )
        )}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages - 1}
          className={btnBase}
          title="Next page"
        >
          <FaChevronRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
export default Pagination;
