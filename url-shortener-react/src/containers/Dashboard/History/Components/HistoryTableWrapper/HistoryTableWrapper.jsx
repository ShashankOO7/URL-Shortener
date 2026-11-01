import { useRef, useState, useMemo, useCallback } from "react";
import { HistoryTable } from "./HistoryTable/HistoryTable.jsx";
import { TableControls } from "./TableControls/TableControls.jsx";
import { useFetchMyShortUrls, useInfiniteMyShortUrls } from "../../../../../hooks/useQuery.js";
import { useAuthContext } from "../../../../../hooks/useAuthContext.js";
import { useThemeContext } from "../../../../../hooks/useThemeContext.js";
import { Spinner } from "../../../../../components/Spinner/Spinner.jsx";
import Placeholder from "../../../../../components/Placeholder/Placeholder.jsx";
import Pagination from "../../../../../components/Pagination/Pagination.jsx";
import HistoryCards from "../HistoryCard/HistoryCards.jsx";
import { PulseLoader } from "react-spinners";
const FRONT_END_URL = import.meta.env.VITE_REACT_FRONT_END_URL || "http://localhost:5173";
const PAGE_SIZE = 10;
const transformUrl = (url) => ({
  id: url.id,
  shortLink: `${FRONT_END_URL}/s/${url.shortUrl}`,
  originalLink: url.originalUrl,
  qrCode: url.shortUrl,
  clicks: url.clickCount ?? 0,
  status: url.status || "Active",
  date: url.createdDate,
});
const HistoryTableWrapper = () => {
  const { token } = useAuthContext();
  const { theme } = useThemeContext();
  const isDark = theme === "dark";
  // Desktop pagination state
  const [page, setPage] = useState(0);
  const gridApiRef = useRef(null);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [searchText, setSearchText] = useState("");
  // Desktop: paginated query
  const {
    isLoading: isDesktopLoading,
    isError: isDesktopError,
    data: paginatedData,
    refetch: desktopRefetch,
  } = useFetchMyShortUrls(token, page, PAGE_SIZE);
  // Mobile: infinite scroll query
  const {
    data: infiniteData,
    isLoading: isMobileLoading,
    isError: isMobileError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch: mobileRefetch,
  } = useInfiniteMyShortUrls(token, PAGE_SIZE);
  // Desktop row data (current page only)
  const desktopRowData = useMemo(() => {
    const content = paginatedData?.content || [];
    return content.map(transformUrl);
  }, [paginatedData]);
  // Mobile row data (all loaded pages flattened)
  const mobileRowData = useMemo(() => {
    const allUrls = infiniteData?.pages?.flatMap((p) => p.content || []) || [];
    return allUrls.map(transformUrl);
  }, [infiniteData]);
  // Filter mobile data based on searchText
  const filteredMobileData = useMemo(() => {
    if (!searchText.trim()) return mobileRowData;
    const query = searchText.toLowerCase();
    return mobileRowData.filter(
      (row) =>
        row.shortLink?.toLowerCase().includes(query) ||
        row.originalLink?.toLowerCase().includes(query) ||
        row.status?.toLowerCase().includes(query)
    );
  }, [mobileRowData, searchText]);
  // Pagination metadata from desktop query
  const totalElements = paginatedData?.totalElements || 0;
  const totalPages = paginatedData?.totalPages || 0;
  // Infinite scroll observer for mobile
  const observerRef = useRef(null);
  const loadMoreRef = useCallback(
    (node) => {
      if (isFetchingNextPage) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage]
  );
  const onGridReady = (params) => {
    gridApiRef.current = params.api;
  };
  const onFilterChanged = () => {
    if (gridApiRef.current) {
      const filterModel = gridApiRef.current.getFilterModel();
      setIsFilterApplied(Object.keys(filterModel).length > 0);
    }
  };
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  const renderDesktopContent = () => {
    if (isDesktopLoading) {
      return <Spinner />;
    }
    if (isDesktopError) {
      return (
        <div className="flex flex-col items-center justify-center h-64 gap-3">
          <p className={isDark ? "text-red-400" : "text-red-500"}>
            Failed to load URLs.
          </p>
          <button
            onClick={() => desktopRefetch()}
            className="px-5 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Retry
          </button>
        </div>
      );
    }
    if (totalElements === 0) {
      return <Placeholder message="You haven't created any short link yet" />;
    }
    return (
      <>
        <HistoryTable
          rowData={desktopRowData}
          onGridReady={onGridReady}
          onFilterChanged={onFilterChanged}
        />
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          totalElements={totalElements}
          pageSize={PAGE_SIZE}
          onPageChange={handlePageChange}
        />
      </>
    );
  };
  const renderMobileContent = () => {
    if (isMobileLoading) {
      return <Spinner />;
    }
    if (isMobileError) {
      return (
        <div className="flex flex-col items-center justify-center h-64 gap-3">
          <p className={isDark ? "text-red-400" : "text-red-500"}>
            Failed to load URLs.
          </p>
          <button
            onClick={() => mobileRefetch()}
            className="px-5 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Retry
          </button>
        </div>
      );
    }
    if (mobileRowData.length === 0) {
      return <Placeholder message="You haven't created any short link yet" />;
    }
    return (
      <>
        <HistoryCards rowData={filteredMobileData} />
        {/* Sentinel element for infinite scroll */}
        <div ref={loadMoreRef} className="flex justify-center py-4">
          {isFetchingNextPage && (
            <PulseLoader
              color={isDark ? "#ffffff" : "#000000"}
              size={10}
              aria-label="Loading more"
            />
          )}
        </div>
      </>
    );
  };
  return (
    <div className="flex flex-col w-full gap-4">
      {/* Header: History(count) + Filter */}
      <div className="flex items-center justify-end sm:justify-between">
        <h2
          className={`hidden sm:block text-xl font-semibold ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          History{" "}
          <span className={` ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            ({totalElements})
          </span>
        </h2>
        <TableControls
          gridApiRef={gridApiRef}
          isFilterApplied={isFilterApplied}
          searchText={searchText}
          setSearchText={setSearchText}
        />
      </div>
      {/* Table */}
      <div className="w-full">
        {/* Mobile: card list with infinite scroll */}
        <div className="block sm:hidden">{renderMobileContent()}</div>
        {/* Desktop: AG Grid table with pagination */}
        <div className="hidden sm:block">{renderDesktopContent()}</div>
      </div>
    </div>
  );
};
export default HistoryTableWrapper;
