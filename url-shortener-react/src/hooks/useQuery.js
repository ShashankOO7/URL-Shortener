import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import api from "../auth/api";
export const useFetchMyShortUrls = (token, page = 0, size = 10) => {
  return useQuery({
    queryKey: ["my-shorten-urls", page, size],
    queryFn: async () => {
      const res = await api.get(`/api/urls/myurls?page=${page}&size=${size}`, {
        headers: { Authorization: "Bearer " + token },
      });
      return res.data;
    },
    select: (data) => {
      return data?.data || {};
    },
    placeholderData: (previousData) => previousData,
    staleTime: 5000,
  })
}
export const useInfiniteMyShortUrls = (token, size = 10) => {
  return useInfiniteQuery({
    queryKey: ["my-shorten-urls-infinite", size],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await api.get(`/api/urls/myurls?page=${pageParam}&size=${size}`, {
        headers: { Authorization: "Bearer " + token },
      });
      return res.data?.data || {};
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage < lastPage.totalPages - 1) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
    staleTime: 5000,
  });
}
export const useFetchTotalClicks = (token, startDate, endDate) => {
  return useQuery({
    queryKey: ["url-totalclick", startDate, endDate],
    queryFn: async () => {
      const res = await api.get(
        `/api/urls/totalClicks?startDate=${startDate}&endDate=${endDate}`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      return res.data;
    },
    select: (data) => {
      // Extract the data object from the nested response structure
      // Response: { apiStatus: {...}, body: null, data: { "2025-12-08": 4 } }
      const clicksData = data?.data || data || {};
      
//  clicksData =>
//        {
//          "2024-01-01": 120,
//          "2024-01-02": 95,
//          "2024-01-03": 110,
//        };
//    Object.keys(clicksData) => ["2024-01-01", "2024-01-02", "2024-01-03"]
      const convertToArray = Object.keys(clicksData).map((key) => ({
        clickDate: key,  // key => "2024-01-01"
        count: clicksData[key],// clicksData["2024-01-01"]
      }));
// FINAL:
// [
//    { clickDate: "2024-01-01", count: 120 },
//    { clickDate: "2024-01-02", count: 95 },
//    { clickDate: "2024-01-03", count: 110 },
// ]
       return convertToArray;
    },
    enabled: !!startDate && !!endDate, // ? Only run when both are set
    staleTime: 5000,
  });
};
