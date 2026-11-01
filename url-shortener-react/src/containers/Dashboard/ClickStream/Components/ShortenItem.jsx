import { React, useState, useEffect } from "react";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { useThemeContext } from "../../../../hooks/useThemeContext";
import { Link, useNavigate } from "react-router-dom";
import { FaExternalLinkAlt, FaRegCalendarAlt, FaCopy } from "react-icons/fa";
import { MdAnalytics, MdOutlineAdsClick } from "react-icons/md";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { Spinner } from "../../../../components/Spinner/Spinner";
import { Graph } from "../../Statistics/Components/Graph";
import api from "../../../../auth/api";
const getFavicon = (url) => {
  try {
    const hostname = new URL(
      url?.startsWith("http") ? url : `https://${url}`
    ).hostname;
    return `https://www.google.com/s2/favicons?sz=32&domain=${hostname}`;
  } catch {
    return null;
  }
};
const ShortenItem = ({ originalUrl, shortUrl, clickCount, createdDate }) => {
  const { token } = useAuthContext();
  const { theme } = useThemeContext();
  const navigate = useNavigate();
  const isDark = theme === "dark";
  const [analyticToggle, setAnalyticToggle] = useState(false);
  const [loader, setLoader] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState("");
  const [analyticsData, setAnalyticsData] = useState([]);
  const fullShortLink =
    import.meta.env.VITE_REACT_FRONT_END_URL + "/s/" + shortUrl;
  const subDomain = import.meta.env.VITE_REACT_FRONT_END_URL.replace(
    /^https?:\/\//,
    ""
  );
  const faviconUrl = getFavicon(originalUrl);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullShortLink);
      toast.success("Link copied!", { duration: 1500 });
    } catch {
      toast.error("Copy failed");
    }
  };
  const analyticsHandler = (shortUrl) => {
    if (!analyticToggle) {
      setSelectedUrl(shortUrl);
    }
    setAnalyticToggle(!analyticToggle);
  };
  useEffect(() => {
    if (!selectedUrl) return;
    const fetchMyShortUrl = async () => {
      setLoader(true);
      try {
        // Calculate startDate as 1st day of month, 1 year before current date
        const currentDate = dayjs();
        const startDate = dayjs(currentDate)
          .subtract(1, "year")
          .startOf("month")
          .format("YYYY-MM-DDTHH:mm:ss");
        // Calculate endDate as current date
        const endDate = currentDate.format("YYYY-MM-DDTHH:mm:ss");
        const { data } = await api.get(
          `/api/urls/analytics/${selectedUrl}?startDate=${startDate}&endDate=${endDate}`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        // Extract data array from response structure (data.data) or use data directly if it's already an array
        const analyticsArray = data?.data || (Array.isArray(data) ? data : []);
        setAnalyticsData(analyticsArray);
        setSelectedUrl("");
        //console.log(analyticsArray);
      } catch {
        navigate("/error");
      } finally {
        setLoader(false);
      }
    };
    fetchMyShortUrl();
  }, [selectedUrl, token, navigate]);
  return (
    <div className={`flex flex-col gap-3 p-4 w-full rounded-2xl ${isDark ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"}`}>
      {/* Short Link */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium opacity-50 mb-0.5">Short Link</p>
          <div className="flex items-center gap-1.5">
            <Link
              target="_blank"
              className="text-sm font-medium truncate text-blue-400 hover:underline"
              to={fullShortLink}
            >
              {subDomain + "/s/" + shortUrl}
            </Link>
            <FaExternalLinkAlt className="text-blue-400 w-3 h-3 flex-shrink-0" />
          </div>
        </div>
        <button
          onClick={handleCopy}
          title="Copy link"
          className={`mt-4 p-1.5 rounded-full transition-colors cursor-pointer ${
            isDark ? "hover:bg-white/10" : "hover:bg-gray-100"
          }`}
        >
          <FaCopy className="w-3.5 h-3.5 opacity-60" />
        </button>
      </div>
      {/* Original URL */}
      <div>
        <p className="text-xs font-medium opacity-50 mb-0.5">Original URL</p>
        <div className="flex items-center gap-2">
          {faviconUrl && (
            <img
              src={faviconUrl}
              alt=""
              className="w-4 h-4 rounded-sm flex-shrink-0"
              onError={(e) => { e.target.style.display = "none"; }}
            />
          )}
          <p className="text-sm truncate opacity-80">{originalUrl}</p>
        </div>
      </div>
      {/* Clicks + Date */}
      <div className="flex items-center gap-6">
        <div className={`flex items-center gap-1 font-semibold ${
          isDark ? "text-green-400" : "text-green-700"
        }`}>
          <MdOutlineAdsClick className="text-[18px]" />
          <span className="text-sm">{clickCount}</span>
          <span className="text-xs opacity-70">
            {clickCount === 0 || clickCount === 1 ? "Click" : "Clicks"}
          </span>
        </div>
        <div className={`flex items-center gap-1.5 ${
          isDark ? "text-slate-400" : "text-slate-500"
        }`}>
          <FaRegCalendarAlt className="w-3.5 h-3.5" />
          <span className="text-sm">{dayjs(createdDate).format("MMM DD, YYYY")}</span>
        </div>
      </div>
      {/* Action buttons */}
      <div className={`flex items-center justify-end gap-4 pt-2 border-t ${
        isDark ? "border-white/10" : "border-gray-100"
      }`}>
        <button
          onClick={() => analyticsHandler(shortUrl)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
            bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors cursor-pointer"
        >
          <MdAnalytics className="w-3.5 h-3.5" />
          Analytics
        </button>
      </div>
      <>
        <div
          className={`${
            analyticToggle ? "flex" : "hidden"
          } max-h-96 sm:mt-0 mt-5 min-h-96 relative border-t-2 w-[100%] overflow-hidden ${theme === "light" ? "bg-white border-gray-200" : "bg-gray-800 border-gray-700"}`}
        >
          {loader ? (
            <div className="min-h-[calc(450px-140px)] flex justify-center items-center w-full">
              <div className="flex flex-col items-center gap-1">
                <Spinner />
              </div>
            </div>
          ) : (
            <>
              {(!analyticsData || analyticsData.length === 0) && (
                <div className="absolute flex flex-col justify-center sm:items-center items-end w-full left-0 top-0 bottom-0 right-0 m-auto">
                  <h1 className="font-serif sm:text-2xl text-[15px] font-bold mb-1 text-slate-800">
                    No Data For This Time Period
                  </h1>
                  <h3 className="sm:w-96 w-[90%] sm:ml-0 pl-6 text-center sm:text-lg text-[12px] text-slate-600">
                    Share your short link to view where your engagements are
                    coming from
                  </h3>
                </div>
              )}
              <Graph graphData={analyticsData} />
            </>
          )}
        </div>
      </>
    </div>
  );
};
export default ShortenItem;
