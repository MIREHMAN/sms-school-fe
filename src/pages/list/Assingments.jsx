import { useEffect, useState } from "react";
import { Plus, X, Edit2, Trash2 } from "lucide-react";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";

// Assignment Model
class Assignment {
  constructor({
    id,
    title,
    description,
    dueDate,
    class: classInfo,
    status = "Pending",
    assignedDate,
    teacher,
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.class = classInfo;
    this.status = status;
    this.assignedDate = assignedDate;
    this.teacher = teacher;
  }
}

// Dummy Data
const dummyAssignments = [
  new Assignment({
    id: "A001",
    title: "Math Homework",
    description: "Complete exercises 1-10 on page 45",
    dueDate: "2023-11-15",
    class: { name: "Grade 10" },
    status: "Pending",
    assignedDate: "2023-11-01",
    teacher: "Mr. Smith",
  }),
  new Assignment({
    id: "A002",
    title: "Science Project",
    description: "Prepare a report on photosynthesis",
    dueDate: "2023-11-20",
    class: { name: "Grade 11" },
    status: "Submitted",
    assignedDate: "2023-11-05",
    teacher: "Ms. Johnson",
  }),
];

// Columns
const columns = [
  { header: "Title", accessor: "title" },
  { header: "Class", accessor: "class", className: "hidden md:table-cell" },
  { header: "Teacher", accessor: "teacher", className: "hidden md:table-cell" },
  { header: "Assigned Date", accessor: "assignedDate", className: "hidden lg:table-cell" },
  { header: "Due Date", accessor: "dueDate", className: "hidden md:table-cell" },
  { header: "Status", accessor: "status" },
  { header: "Actions", accessor: "action" },
];

// Actions Component (same as in student page)
const Actions = ({ onEdit, onDelete }) => {
  return (
    <div className="flex gap-2">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onEdit();
        }}
        className="p-1.5 rounded-md hover:bg-gray-100 text-blue-500 hover:text-blue-700"
        aria-label="Edit"
      >
        <Edit2 size={16} />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="p-1.5 rounded-md hover:bg-gray-100 text-red-500 hover:text-red-700"
        aria-label="Delete"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};

// Assignment Modal Component
const AssignmentModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  assignment = null,
  mode = 'add'
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    class: "",
    status: "Pending",
    assignedDate: "",
    teacher: "",
  });

  useEffect(() => {
    if (mode === 'edit' && assignment) {
      setFormData({
        title: assignment.title,
        description: assignment.description,
        dueDate: assignment.dueDate,
        class: assignment.class?.name || "",
        status: assignment.status,
        assignedDate: assignment.assignedDate,
        teacher: assignment.teacher,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        dueDate: "",
        class: "",
        status: "Pending",
        assignedDate: "",
        teacher: "",
      });
    }
  }, [assignment, mode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const assignmentData = {
      id: mode === 'edit' ? assignment.id : `A${String(dummyAssignments.length + 1).padStart(3, '0')}`,
      title: formData.title,
      description: formData.description,
      dueDate: formData.dueDate,
      class: { name: formData.class },
      status: formData.status,
      assignedDate: formData.assignedDate,
      teacher: formData.teacher,
    };
    
    onSave(new Assignment(assignmentData), mode);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100">
        <div className="sticky top-0 bg-white p-6 pb-4 border-b border-gray-100 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {mode === 'add' ? 'Add New Assignment' : 'Edit Assignment'}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {mode === 'add' ? 'Fill in the assignment details' : 'Update the assignment details'}
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 p-1 transition-colors"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 pt-4 space-y-6">
          <div className="space-y-5">
            <div className="grid grid-cols-1 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Assignment Title"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all min-h-[100px]"
                placeholder="Assignment description..."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Class</label>
                <input
                  type="text"
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Grade 10"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Teacher</label>
                <input
                  type="text"
                  name="teacher"
                  value={formData.teacher}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Teacher Name"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Assigned Date</label>
                <input
                  type="date"
                  name="assignedDate"
                  value={formData.assignedDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all appearance-none"
                required
              >
                <option value="Pending">Pending</option>
                <option value="Submitted">Submitted</option>
                <option value="Late">Late</option>
                <option value="Graded">Graded</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-purple-500 text-white rounded-lg text-sm font-medium hover:bg-purple-600 transition-colors shadow-sm"
            >
              {mode === 'add' ? 'Add Assignment' : 'Update Assignment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Confirm Delete Modal (same as in student page)
const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, assignment }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md shadow-2xl border border-gray-100">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Confirm Delete</h2>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-gray-600 p-1 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete assignment <span className="font-semibold">{assignment?.title}</span>? 
            This action cannot be undone.
          </p>
          
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm(assignment.id);
                onClose();
              }}
              className="px-5 py-2.5 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors shadow-sm"
            >
              Delete Assignment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Component
const AssignmentListPage = () => {
  const [assignments, setAssignments] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentAssignment, setCurrentAssignment] = useState(null);

  useEffect(() => {
    setAssignments(dummyAssignments);
  }, []);

  const handleSaveAssignment = (assignment, mode) => {
    if (mode === 'add') {
      setAssignments(prev => [...prev, assignment]);
    } else {
      setAssignments(prev => 
        prev.map(a => a.id === assignment.id ? assignment : a)
      );
    }
  };

  const handleDeleteAssignment = (assignmentId) => {
    setAssignments(prev => prev.filter(a => a.id !== assignmentId));
  };

  const handleEditClick = (assignmentId) => {
    const assignment = assignments.find(a => a.id === assignmentId);
    if (assignment) {
      setCurrentAssignment(assignment);
      setIsEditModalOpen(true);
    }
  };

  const handleDeleteClick = (assignmentId) => {
    const assignment = assignments.find(a => a.id === assignmentId);
    if (assignment) {
      setCurrentAssignment(assignment);
      setIsDeleteModalOpen(true);
    }
  };

  const renderRow = (item) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="p-4">
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.title}</h3>
          <p className="text-xs text-gray-500 line-clamp-1">{item.description}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.class?.name}</td>
      <td className="hidden md:table-cell">{item.teacher}</td>
      <td className="hidden lg:table-cell">{item.assignedDate}</td>
      <td className="hidden md:table-cell">{item.dueDate}</td>
      <td>
        <span className={`px-2 py-1 rounded-full text-xs ${
          item.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
          item.status === "Submitted" ? "bg-blue-100 text-blue-800" :
          item.status === "Late" ? "bg-red-100 text-red-800" :
          "bg-green-100 text-green-800"
        }`}>
          {item.status}
        </span>
      </td>
      <td>
        <Actions 
          onEdit={() => handleEditClick(item.id)}
          onDelete={() => handleDeleteClick(item.id)}
        />
      </td>
    </tr>
  );

  return (
    <section className="bg-white p-6 rounded-md flex-1 m-4 mt-0">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="hidden md:block text-lg font-bold text-gray-800">All Assignments</h1>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            <TableSearch />
            <button className="w-9 h-9 flex items-center justify-center rounded-full bg-lamaYellow hover:brightness-95 transition">
              <img src="/filter.png" alt="Filter" width={14} height={14} />
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-full bg-lamaYellow hover:brightness-95 transition">
              <img src="/sort.png" alt="Sort" width={14} height={14} />
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-purple-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-sm hover:bg-purple-600 transition-colors"
            >
              <Plus size={19} className="lg:hidden" />
              <span className="hidden sm:inline text-sm">Add Assignment</span>
            </button>
          </div>
        </header>

        <Table columns={columns} renderRow={renderRow} data={assignments} />
        <Pagination totalPages={5} totalResults={assignments.length} />
        
        <AssignmentModal 
          isOpen={isAddModalOpen} 
          onClose={() => setIsAddModalOpen(false)} 
          onSave={handleSaveAssignment}
          mode="add"
        />
        
        <AssignmentModal 
          isOpen={isEditModalOpen} 
          onClose={() => setIsEditModalOpen(false)} 
          onSave={handleSaveAssignment}
          assignment={currentAssignment}
          mode="edit"
        />
        
        <ConfirmDeleteModal 
          isOpen={isDeleteModalOpen} 
          onClose={() => setIsDeleteModalOpen(false)} 
          onConfirm={handleDeleteAssignment}
          assignment={currentAssignment}
        />
      </div>
    </section>
  );
};

export default AssignmentListPage;