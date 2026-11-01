import { useState, useCallback, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { QRCodeSVG, QRCodeCanvas } from "qrcode.react";
import { useThemeContext } from "../../../../../hooks/useThemeContext";
const QR_SIZE_CELL = 32;
const QR_SIZE_MODAL = 220;
const QRCodeCell = (props) => {
  const { data } = props;
  const shortLink = data?.shortLink || "";
  const [showModal, setShowModal] = useState(false);
  const { theme } = useThemeContext();
  const handleOpen = useCallback(() => setShowModal(true), []);
  const handleClose = useCallback(() => setShowModal(false), []);
  if (!shortLink) return null;
  return (
    <>
      <div
        className="flex items-center justify-center cursor-pointer"
        onClick={handleOpen}
        title="Click to view & download QR code"
      >
        <div className="bg-white p-0.5 rounded">
          <QRCodeSVG
            value={shortLink}
            size={QR_SIZE_CELL}
            level="L"
            bgColor="#ffffff"
            fgColor="#000000"
          />
        </div>
      </div>
      {showModal && (
        <QRCodeModal
          shortLink={shortLink}
          onClose={handleClose}
          theme={theme}
        />
      )}
    </>
  );
};
const QRCodeModal = ({ shortLink, onClose, theme }) => {
  const canvasRef = useRef(null);
  const isDark = theme === "dark";
  // Lock background scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);
  const handleDownloadPNG = useCallback(() => {
    const canvas = canvasRef.current?.querySelector("canvas");
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `qr-${shortLink.split("/").pop() || "code"}.png`;
    link.href = url;
    link.click();
  }, [shortLink]);
  const handleDownloadSVG = useCallback(() => {
    const svgEl = document.getElementById("qr-modal-svg");
    if (!svgEl) return;
    const svgData = new XMLSerializer().serializeToString(svgEl);
    const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `qr-${shortLink.split("/").pop() || "code"}.svg`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  }, [shortLink]);
  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={`rounded-2xl shadow-2xl p-8 w-full max-w-sm mx-4 ${
          isDark ? "bg-gray-800" : "bg-white"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3
            className={`text-lg font-semibold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            QR Code
          </h3>
          <button
            onClick={onClose}
            className={`p-1 rounded-full transition-colors cursor-pointer ${
              isDark ? "hover:bg-gray-700 text-gray-400" : "hover:bg-gray-100 text-gray-500"
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {/* SVG display */}
        <div className="flex justify-center mb-4">
          <div className="bg-white p-4 rounded-xl">
            <QRCodeSVG
              id="qr-modal-svg"
              value={shortLink}
              size={QR_SIZE_MODAL}
              level="H"
              includeMargin={false}
              bgColor="#ffffff"
              fgColor="#000000"
            />
          </div>
        </div>
        {/* Hidden canvas for PNG download */}
        <div ref={canvasRef} className="hidden">
          <QRCodeCanvas
            value={shortLink}
            size={QR_SIZE_MODAL * 2}
            level="H"
            includeMargin
            bgColor="#ffffff"
            fgColor="#000000"
          />
        </div>
        <p
          className={`text-center text-xs truncate mb-5 px-4 ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {shortLink}
        </p>
        <div className="flex gap-3">
          <button
            onClick={handleDownloadPNG}
            className="flex-1 py-2.5 px-4 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Download PNG
          </button>
          <button
            onClick={handleDownloadSVG}
            className={`flex-1 py-2.5 px-4 text-sm font-medium rounded-lg border transition-colors cursor-pointer ${
              isDark
                ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            Download SVG
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
export default QRCodeCell;
