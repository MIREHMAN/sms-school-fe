// Actions.jsx
import { useState } from "react";
import { Eye, Pencil, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import ConfirmDialog from "@/components/modals/ConfirmDeleteDialog";
import { TeacherService } from "@/services/TeacherService";

const Actions = ({ item, item_id, onDeleted }) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await TeacherService.deleteTeacher(item_id);
      onDeleted?.();
    } catch (error) {
      console.error("Delete error", error);
    } finally {
      setIsConfirmOpen(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <Link
          to={`/${item}/${item_id}`}
          className="p-2 rounded hover:bg-gray-100"
          title="View"
        >
          <Eye size={16} />
        </Link>
        <button className="p-2 rounded hover:bg-gray-100" title="Edit">
          <Pencil size={16} />
        </button>
        <button
          className="p-2 rounded hover:bg-red-100 text-red-600"
          title="Delete"
          onClick={() => setIsConfirmOpen(true)}
        >
          <Trash size={16} />
        </button>
      </div>
      <ConfirmDialog
        open={isConfirmOpen}
        title="Confirm Deletion"
        message="Are you sure you want to delete this teacher?"
        onConfirm={handleDelete}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </>
  );
};

export default Actions;
