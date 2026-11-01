import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Graph } from "./Components/Graph";
import { DatePicker } from "./Components/DatePicker";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useFetchTotalClicks } from "../../../hooks/useQuery";
import { Spinner } from "../../../components/Spinner/Spinner";
import { useScrollToTop } from "../../../hooks/useScrollToTop";
const STATISTICS_DATE_RANGE_KEY = "statistics_date_range";
export const Statistics = () => {
  const { token } = useAuthContext();
  const navigate = useNavigate();
  useScrollToTop();
  // Load date range from localStorage on component mount
  const getInitialDateRange = () => {
    try {
      const stored = localStorage.getItem(STATISTICS_DATE_RANGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Validate that both dates exist
        if (parsed?.startDate && parsed?.endDate) {
          return parsed;
        }
      }
    } catch (error) {
      console.warn("Error loading date range from localStorage:", error);
    }
    return { startDate: "", endDate: "" };
  };
  const [dateRange, setDateRange] = useState(getInitialDateRange);
  // Save date range to localStorage whenever it changes
  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      try {
        localStorage.setItem(STATISTICS_DATE_RANGE_KEY, JSON.stringify(dateRange));
      } catch (error) {
        console.warn("Error saving date range to localStorage:", error);
      }
    }
  }, [dateRange]);
  const {
    isLoading,
    isError,
    data: totalClicks,
  } = useFetchTotalClicks(token, dateRange.startDate, dateRange.endDate);
  if (isError) {
    navigate("/error");
  }
  return (
    <div className="lg:w-7/9 w-9/10 min-h-[calc(100vh-300px)] flex items-center justify-center">
      <div className="w-full mx-auto space-y-5">
        {/* ? Date Picker */}
        <DatePicker
          onDateChange={(start, end) =>
            setDateRange({ startDate: start, endDate: end })
          }
        />
        <div className="h-96 relative">
          {/* ? Case 1: No date selected */}
          {!dateRange.startDate || !dateRange.endDate ? (
            <div className="absolute flex flex-col justify-center items-center w-full h-full">
              <h1 className="font-serif sm:text-2xl text-[18px] font-bold text-center">
                Please select a date range to view statistics
              </h1>
            </div>
          ) : isLoading ? (
            /* ? Case 2: Loading state */
            <Spinner />
          ) : totalClicks?.length === 0 ? (
            /* ? Case 3: No data */
            <div className="h-96 relative ">
              {totalClicks.length === 0 && (
                <div className="absolute flex flex-col justify-center items-center w-full left-0 top-0 bottom-0 right-0 m-auto">
                  <h1 className="font-serif sm:text-2xl text-[18px] font-bold">
                    No Data For This Time Period
                  </h1>
                  <h3 className="sm:w-96 w-[90%] sm:ml-0 pl-6 text-center sm:text-lg text-sm text-slate-500 ">
                    Share your short link to view where your engagements are
                    coming from
                  </h3>
                </div>
              )}
              <Graph graphData={totalClicks} />
            </div>
          ) : (
            /* ? Case 4: Graph */
            <Graph graphData={totalClicks} />
          )}
        </div>
      </div>
    </div>
  );
};
