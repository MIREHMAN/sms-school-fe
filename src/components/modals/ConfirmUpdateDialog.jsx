// components/modals/ConfirmUpdateDialog.jsx
import React from "react";

const ConfirmUpdateDialog = ({ open, title, message, onConfirm, onCancel }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-sm text-gray-600 mb-4">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-1 text-sm bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmUpdateDialog;
