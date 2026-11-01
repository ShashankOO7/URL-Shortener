import { useState } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import DeletePopup from "./DeletePopup/DeletePopup.jsx";
import EditPopup from "./EditPopup/EditPopup.jsx";
const ActionMenu = (props) => {
  const { data } = props;
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  return (
    <div className="flex items-center gap-2 justify-center">
      {/* Edit */}
      <button
        onClick={() => setShowEdit(true)}
        title="Edit"
        className="w-8 h-8 rounded-full flex items-center justify-center
          bg-white/10 hover:bg-blue-500/30 transition-colors cursor-pointer"
      >
        <FaPencilAlt className="w-3 h-3 text-blue-400" />
      </button>
      {/* Delete */}
      <button
        onClick={() => setShowDelete(true)}
        title="Delete"
        className="w-8 h-8 rounded-full flex items-center justify-center
          bg-white/10 hover:bg-red-500/30 transition-colors cursor-pointer"
      >
        <FaTrash className="w-3 h-3 text-red-400" />
      </button>
      {showDelete && (
        <DeletePopup data={data} onClose={() => setShowDelete(false)} />
      )}
      {showEdit && (
        <EditPopup data={data} onClose={() => setShowEdit(false)} />
      )}
    </div>
  );
};
export default ActionMenu;
