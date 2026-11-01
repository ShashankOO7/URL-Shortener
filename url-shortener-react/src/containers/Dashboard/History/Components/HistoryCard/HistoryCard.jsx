import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { FaPencilAlt, FaTrash, FaCopy } from "react-icons/fa";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { Card, CardContent } from "../../../../../components/Card/Card";
import { useThemeContext } from "../../../../../hooks/useThemeContext";
import EditPopup from "../ActionMenu/EditPopup/EditPopup";
import DeletePopup from "../ActionMenu/DeletePopup/DeletePopup";
import { MdOutlineAdsClick } from "react-icons/md";
const FRONT_END_URL =
  import.meta.env.VITE_REACT_FRONT_END_URL || "http://localhost:5173";
const getFavicon = (url) => {
  try {
    const hostname = new URL(
      url.startsWith("http") ? url : `https://${url}`
    ).hostname;
    return `https://www.google.com/s2/favicons?sz=32&domain=${hostname}`;
  } catch {
    return null;
  }
};
const HistoryCard = ({ row }) => {
  const { theme } = useThemeContext();
  const isDark = theme === "dark";
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const { shortLink, originalLink, qrCode, clicks, status, date } = row;
  const isActive = status === "Active";
  const formatted = date ? dayjs(date).format("MMM-DD-YYYY") : "?";
  const faviconUrl = getFavicon(originalLink);
  const fullShortLink = shortLink?.startsWith("http")
    ? shortLink
    : `${FRONT_END_URL}/s/${shortLink}`;
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullShortLink);
      toast.success("Link copied!", { duration: 1500 });
    } catch {
      toast.error("Copy failed");
    }
  };
  return (
    <>
      <Card
        className={`w-full ${
          isDark ? "bg-gray-800 border border-white/10" : "bg-white"
        }`}
      >
        <CardContent
          className={`p-4 space-y-3 ${isDark ? "text-gray-100" : "text-gray-800"}`}
        >
          {/* Short Link */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium opacity-50 mb-0.5">Short Link</p>
              <p className="text-sm font-medium truncate text-blue-400">
                {fullShortLink}
              </p>
            </div>
            <button
              onClick={handleCopy}
              title="Copy link"
              className="mt-4 p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            >
              <FaCopy className="w-3.5 h-3.5 opacity-60" />
            </button>
          </div>
          {/* Original Link */}
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
              <p className="text-sm truncate opacity-80">{originalLink}</p>
            </div>
          </div>
          {/* QR + Status/Date column */}
          <div className="flex items-center justify-evenly gap-4 pt-1">
            {/* QR Code */}
            <div className="bg-white p-1 rounded flex-shrink-0">
              <QRCodeSVG
                value={fullShortLink}
                size={44}
                level="L"
                bgColor="#ffffff"
                fgColor="#000000"
              />
            </div>
            {/* Clicks */}
            <div className="flex items-center gap-1 text-xl opacity-70">
              <MdOutlineAdsClick className="w-4 h-4" />
              <span className="font-medium">{clicks ?? 0}</span>
            </div>
            {/* Status top / Date bottom */}
            <div className="flex flex-col justify-between h-[52px]">
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full self-start ${
                  isActive
                    ? "text-green-400 bg-green-400/10"
                    : "text-yellow-400 bg-yellow-400/10"
                }`}
              >
                {status || "Unknown"}
              </span>
              <span className="text-xs opacity-60">{formatted}</span>
            </div>
          </div>
          {/* Action buttons */}
          <div
            className={`flex items-center justify-around gap-4 pt-2 border-t ${
              isDark ? "border-white/10" : "border-gray-100"
            }`}
          >
            <button
              onClick={() => setShowEdit(true)}
              title="Edit"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors cursor-pointer"
            >
              <FaPencilAlt className="w-3 h-3" />
              Edit
            </button>
            <button
              onClick={() => setShowDelete(true)}
              title="Delete"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
            >
              <FaTrash className="w-3 h-3" />
              Delete
            </button>
          </div>
        </CardContent>
      </Card>
      {showEdit && (
        <EditPopup data={row} onClose={() => setShowEdit(false)} />
      )}
      {showDelete && (
        <DeletePopup data={row} onClose={() => setShowDelete(false)} />
      )}
    </>
  );
};
export default HistoryCard;
