import { useState } from "react";
import api from "../../../../../../auth/api.js";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import ConfirmationPopup from "../../../../../../components/ConfirmationPopup/ConfirmationPopup.jsx";
const URL_PATTERN =
  /^(https?:\/\/)?(([a-zA-Z0-9\u00a1-\uffff-]+\.)+[a-zA-Z\u00a1-\uffff]{2,})(:\d{2,5})?(\/[^\s]*)?$/;
const EditPopup = ({ data, onClose }) => {
  const queryClient = useQueryClient();
  const [originalUrl, setOriginalUrl] = useState(data?.originalLink || "");
  const [urlError, setUrlError] = useState("");
  const validate = (value) => {
    if (!value.trim()) {
      setUrlError("URL is required");
      return false;
    }
    if (!URL_PATTERN.test(value)) {
      setUrlError("Please enter a valid URL");
      return false;
    }
    setUrlError("");
    return true;
  };
  const handleChange = (e) => {
    const val = e.target.value;
    setOriginalUrl(val);
    if (urlError) validate(val);
  };
  const handleUpdate = async () => {
    if (!validate(originalUrl)) return;
    try {
      await api.put(`/api/urls/${data.id}`, { originalUrl });
      toast.success("URL updated successfully");
      queryClient.invalidateQueries({ queryKey: ["my-shorten-urls"] });
      queryClient.invalidateQueries({ queryKey: ["my-shorten-urls-infinite"] });
      onClose();
    } catch {
      toast.error("Failed to update URL");
      onClose();
    }
  };
  return (
    <ConfirmationPopup
      open
      title="Edit URL"
      onClose={onClose}
      actions={[
        {
          label: "Cancel",
          onClick: onClose,
          className: "border border-gray-300 dark:border-gray-600",
        },
        {
          label: "Save",
          onClick: handleUpdate,
          disabled: !!urlError,
          className: `bg-blue-600 text-white hover:bg-blue-700 ${urlError ? "opacity-50 cursor-not-allowed" : ""}`,
        },
      ]}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 dark:text-gray-500 mb-1">
            Short Link
          </label>
          <p className="text-sm text-gray-500 dark:text-gray-400 break-all">
            {data?.shortLink}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-500 mb-1">
            Original URL
          </label>
          <input
            type="url"
            value={originalUrl}
            onChange={handleChange}
            onBlur={() => validate(originalUrl)}
            placeholder="https://example.com"
            className={`w-full px-3 py-2 text-sm border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-non"
              urlError
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
            }`}
          />
          {urlError && <p className="mt-1 text-xs text-red-500">{urlError}</p>}
        </div>
      </div>
    </ConfirmationPopup>
  );
};
export default EditPopup;
