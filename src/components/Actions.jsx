import React from "react";
import { Eye, Pencil, Trash } from "lucide-react";
import { Link } from "react-router-dom";

const Actions = ({ item, item_id }) => {
  return (
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
      <button className="p-2 rounded hover:bg-red-100 text-red-600" title="Delete">
        <Trash size={16} />
      </button>
    </div>
  );
};

export default Actions;
