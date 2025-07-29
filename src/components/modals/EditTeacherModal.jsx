// components/modals/EditTeacherModal.jsx
import { useEffect, useState } from "react";
import { TeacherService } from "@/services/TeacherService";
import { X } from "lucide-react";
import ConfirmUpdateDialog from "./ConfirmUpdateDialog";

const EditTeacherModal = ({ open, onClose, teacher, onTeacherUpdated }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    date_of_birth: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (teacher) {
      setFormData({
        first_name: teacher.first_name || "",
        last_name: teacher.last_name || "",
        email: teacher.email || "",
        phone_number: teacher.phone_number || "",
        date_of_birth: teacher.date_of_birth || "",
      });
    }
  }, [teacher]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const handleConfirmUpdate = async () => {
    setLoading(true);
    setError(null);
    setShowConfirm(false);

    try {
      const updatedTeacher = await TeacherService.updateTeacher(
        teacher.id,
        formData
      );
      onTeacherUpdated(updatedTeacher);
      onClose();
    } catch (err) {
      setError(err.message || "Failed to update teacher");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Edit Teacher</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded text-sm"
                placeholder="Optional"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded text-sm"
              />
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1 text-sm bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Teacher"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <ConfirmUpdateDialog
        open={showConfirm}
        title="Confirm Update"
        message="Are you sure you want to update this teacher's information?"
        onConfirm={handleConfirmUpdate}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
};

export default EditTeacherModal;
