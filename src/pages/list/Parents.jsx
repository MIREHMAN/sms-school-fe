import { useEffect, useState } from "react";
import { Plus, X, Edit2, Trash2 } from "lucide-react";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";

// Parent Model
class Parent {
  constructor({
    id,
    name,
    email,
    img = "/avatar.png",
    children = [],
    classes = [],
    phone,
    address,
  }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.img = img;
    this.children = children;
    this.classes = classes;
    this.phone = phone;
    this.address = address;
  }

  getFullInfo() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      img: this.img,
      children: this.children,
      classes: this.classes,
      phone: this.phone,
      address: this.address,
    };
  }
}

// Dummy Data
const dummyParents = [
  new Parent({
    id: "P001",
    name: "Linda Thompson",
    email: "linda.thompson@example.com",
    children: [{ name: "Alice Johnson" }],
    classes: [{ name: "Grade 10" }],
    phone: "555-123-4567",
    address: "101 Cedar Street",
  }),
  new Parent({
    id: "P002",
    name: "Mark Robinson",
    email: "mark.robinson@example.com",
    children: [{ name: "Bob Martinez" }],
    classes: [{ name: "Grade 11" }],
    phone: "555-987-6543",
    address: "202 Pine Avenue",
  }),
];

// Columns
const columns = [
  { header: "Info", accessor: "info" },
  { header: "Parent ID", accessor: "parentId", className: "hidden md:table-cell" },
  { header: "Children", accessor: "children", className: "hidden md:table-cell" },
  { header: "Classes", accessor: "classes", className: "hidden md:table-cell" },
  { header: "Phone", accessor: "phone", className: "hidden lg:table-cell" },
  { header: "Address", accessor: "address", className: "hidden lg:table-cell" },
  { header: "Actions", accessor: "action" },
];

// Actions Component
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

// Parent Modal Component
const ParentModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  parent = null,
  mode = 'add'
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    children: [{ name: "" }],
    classes: [{ name: "" }],
  });

  useEffect(() => {
    if (mode === 'edit' && parent) {
      setFormData({
        name: parent.name,
        email: parent.email,
        phone: parent.phone,
        address: parent.address,
        children: parent.children,
        classes: parent.classes,
      });
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        children: [{ name: "" }],
        classes: [{ name: "" }],
      });
    }
  }, [parent, mode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleChildChange = (index, e) => {
    const newChildren = [...formData.children];
    newChildren[index].name = e.target.value;
    setFormData(prev => ({ ...prev, children: newChildren }));
  };

  const handleClassChange = (index, e) => {
    const newClasses = [...formData.classes];
    newClasses[index].name = e.target.value;
    setFormData(prev => ({ ...prev, classes: newClasses }));
  };

  const addChild = () => {
    setFormData(prev => ({
      ...prev,
      children: [...prev.children, { name: "" }]
    }));
  };

  const removeChild = (index) => {
    const newChildren = [...formData.children];
    newChildren.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      children: newChildren
    }));
  };

  const addClass = () => {
    setFormData(prev => ({
      ...prev,
      classes: [...prev.classes, { name: "" }]
    }));
  };

  const removeClass = (index) => {
    const newClasses = [...formData.classes];
    newClasses.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      classes: newClasses
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const parentData = {
      id: mode === 'edit' ? parent.id : `P${String(dummyParents.length + 1).padStart(3, '0')}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      children: formData.children.filter(child => child.name.trim() !== ""),
      classes: formData.classes.filter(cls => cls.name.trim() !== ""),
    };
    
    onSave(new Parent(parentData), mode);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100">
        <div className="sticky top-0 bg-white p-6 pb-4 border-b border-gray-100 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {mode === 'add' ? 'Add New Parent' : 'Edit Parent'}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {mode === 'add' ? 'Fill in the parent details' : 'Update the parent details'}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="123-456-7890"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="123 Main St"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Children</label>
              <div className="space-y-3">
                {formData.children.map((child, index) => (
                  <div key={index} className="flex gap-3 items-center">
                    <input
                      type="text"
                      value={child.name}
                      onChange={(e) => handleChildChange(index, e)}
                      className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="Child's name"
                      required={index === 0}
                    />
                    {formData.children.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeChild(index)}
                        className="p-2 text-red-500 hover:text-red-700"
                      >
                        <X size={18} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addChild}
                  className="text-sm text-purple-500 hover:text-purple-700 flex items-center gap-1 mt-2"
                >
                  <Plus size={16} /> Add another child
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Classes</label>
              <div className="space-y-3">
                {formData.classes.map((cls, index) => (
                  <div key={index} className="flex gap-3 items-center">
                    <input
                      type="text"
                      value={cls.name}
                      onChange={(e) => handleClassChange(index, e)}
                      className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="Class name"
                      required={index === 0}
                    />
                    {formData.classes.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeClass(index)}
                        className="p-2 text-red-500 hover:text-red-700"
                      >
                        <X size={18} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addClass}
                  className="text-sm text-purple-500 hover:text-purple-700 flex items-center gap-1 mt-2"
                >
                  <Plus size={16} /> Add another class
                </button>
              </div>
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
              {mode === 'add' ? 'Add Parent' : 'Update Parent'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Confirm Delete Modal
const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, parent }) => {
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
            Are you sure you want to delete parent <span className="font-semibold">{parent?.name}</span>? 
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
                onConfirm(parent.id);
                onClose();
              }}
              className="px-5 py-2.5 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors shadow-sm"
            >
              Delete Parent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Component
const ParentListPage = () => {
  const [parents, setParents] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentParent, setCurrentParent] = useState(null);

  useEffect(() => {
    setParents(dummyParents);
  }, []);

  const handleSaveParent = (parent, mode) => {
    if (mode === 'add') {
      setParents(prev => [...prev, parent]);
    } else {
      setParents(prev => 
        prev.map(p => p.id === parent.id ? parent : p)
      );
    }
  };

  const handleDeleteParent = (parentId) => {
    setParents(prev => prev.filter(p => p.id !== parentId));
  };

  const handleEditClick = (parentId) => {
    const parent = parents.find(p => p.id === parentId);
    if (parent) {
      setCurrentParent(parent);
      setIsEditModalOpen(true);
    }
  };

  const handleDeleteClick = (parentId) => {
    const parent = parents.find(p => p.id === parentId);
    if (parent) {
      setCurrentParent(parent);
      setIsDeleteModalOpen(true);
    }
  };

  const renderRow = (item) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <img
          src={item.img || "/avatar.png"}
          alt=""
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.id}</td>
      <td className="hidden md:table-cell">
        {item.children.map((child) => child.name).join(", ")}
      </td>
      <td className="hidden md:table-cell">
        {item.classes.map((cls) => cls.name).join(", ")}
      </td>
      <td className="hidden lg:table-cell">{item.phone}</td>
      <td className="hidden lg:table-cell">{item.address}</td>
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
          <h1 className="hidden md:block text-lg font-bold text-gray-800">All Parents</h1>

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
              <span className="hidden sm:inline text-sm">Add Parent</span>
            </button>
          </div>
        </header>

        <Table columns={columns} renderRow={renderRow} data={parents} />
        <Pagination totalPages={5} totalResults={parents.length} />
        
        <ParentModal 
          isOpen={isAddModalOpen} 
          onClose={() => setIsAddModalOpen(false)} 
          onSave={handleSaveParent}
          mode="add"
        />
        
        <ParentModal 
          isOpen={isEditModalOpen} 
          onClose={() => setIsEditModalOpen(false)} 
          onSave={handleSaveParent}
          parent={currentParent}
          mode="edit"
        />
        
        <ConfirmDeleteModal 
          isOpen={isDeleteModalOpen} 
          onClose={() => setIsDeleteModalOpen(false)} 
          onConfirm={handleDeleteParent}
          parent={currentParent}
        />
      </div>
    </section>
  );
};

export default ParentListPage;