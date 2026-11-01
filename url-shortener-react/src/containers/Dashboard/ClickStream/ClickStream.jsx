import React, { useRef, useCallback } from "react";
import { Spinner } from "../../../components/Spinner/Spinner";
import { useNavigate } from "react-router-dom";
import { ShortenUrlCards } from "./Components/ShortenUrlCards";
import Placeholder from "../../../components/Placeholder/Placeholder";
import { useScrollToTop } from "../../../hooks/useScrollToTop";
import { useInfiniteMyShortUrls } from "../../../hooks/useQuery";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useThemeContext } from "../../../hooks/useThemeContext";
import { PulseLoader } from "react-spinners";
const PAGE_SIZE = 10;
export const ClickStream = () => {
  const navigate = useNavigate();
  const { token } = useAuthContext();
  const { theme } = useThemeContext();
  const isDark = theme === "dark";
  const {
    data: infiniteData,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteMyShortUrls(token, PAGE_SIZE);
  useScrollToTop();
  if (isError) {
    navigate("/error");
  }
  // Flatten all pages into a single array
  const allUrls = infiniteData?.pages?.flatMap((page) => page.content || []) || [];
  // Infinite scroll observer
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
  return (
    <div className="lg:w-7/9 w-9/10">
      {isLoading ? (
        <Spinner />
      ) : !allUrls || allUrls.length === 0 ? (
        <Placeholder />
      ) : (
        <>
          <ShortenUrlCards data={allUrls} />
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
      )}
    </div>
  );
};
