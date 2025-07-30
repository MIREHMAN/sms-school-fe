import { useState } from "react";
import { Eye, Pencil, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "@/components/modals/ConfirmDeleteDialog";

const Actions = ({
  itemId,
  viewPath, // e.g., "/teachers/:id"
  onEdit,
  deleteService,
  itemName = "item", // For confirmation dialog
  onDeleteSuccess, // Callback after deletion
}) => {
  const navigate = useNavigate();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteService(itemId);
      onDeleteSuccess?.(); // Refresh data
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setIsConfirmOpen(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-2">
        {/* View Button (Eye) */}
        <button
          onClick={() => navigate(viewPath.replace(":id", itemId))}
          className="p-2 rounded hover:bg-gray-100"
          title="View"
        >
          <Eye size={16} className="text-gray-600" />
        </button>

        {/* Edit Button */}
        <button
          onClick={() => onEdit(itemId)}
          className="p-2 rounded hover:bg-gray-100"
          title="Edit"
        >
          <Pencil size={16} className="text-gray-600" />
        </button>

        {/* Delete Button */}
        <button
          onClick={() => setIsConfirmOpen(true)}
          className="p-2 rounded hover:bg-red-100 text-red-600"
          title="Delete"
        >
          <Trash size={16} />
        </button>
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={isConfirmOpen}
        title={`Delete ${itemName}?`}
        message={`Are you sure you want to delete this ${itemName}?`}
        onConfirm={handleDelete}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </>
  );
};

export default Actions;
