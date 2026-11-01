import api from "../../../../../../auth/api.js";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import ConfirmationPopup from "../../../../../../components/ConfirmationPopup/ConfirmationPopup.jsx";
const DeletePopup = ({ data, onClose }) => {
  const queryClient = useQueryClient();
  const handleDelete = async () => {
    try {
      await api.delete(`/api/urls/${data.id}`);
      toast.success("URL deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["my-shorten-urls"] });
      queryClient.invalidateQueries({ queryKey: ["my-shorten-urls-infinite"] });
      onClose();
    } catch {
      toast.error("Failed to delete URL");
      onClose();
    }
  };
  return (
    <ConfirmationPopup
      open
      title="Delete URL"
      onClose={onClose}
      actions={[
        {
          label: "Cancel",
          onClick: onClose,
          className:
            "border border-gray-300 dark:border-gray-600",
        },
        {
          label: "Delete",
          onClick: handleDelete,
          className: "bg-red-600 text-white hover:bg-red-700",
        },
      ]}
    >
      <p className="text-sm dark:text-gray-400 space y-2">
        Are you sure you want to delete{" "} 
        <p className="text-sm font-medium text-blue-500 dark:text-blue-500 break-all">
          {data?.originalLink}
        </p>
        This action cannot be undone.
      </p>
    </ConfirmationPopup>
  );
};
export default DeletePopup;
