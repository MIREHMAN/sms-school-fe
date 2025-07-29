"use client";

import { useEffect, useState } from "react";
import { Plus, X, Edit2, Trash2 } from "lucide-react";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { ParentService } from "@/services/ParentService";

// Parent Model
class Parent {
  constructor({
    id,
    parent_code,
    first_name,
    last_name,
    img,
    email,
    students = [],
    phone_number,
    address,
  }) {
    this.id = id;
    this.parent_code = parent_code; // Shorten ID for display
    this.first_name = first_name;
    this.last_name = last_name;
    this.name = `${first_name} ${last_name}`;
    this.img = img || "/avatar.png";
    this.email = email;
    this.students = students;
    this.phone_number = phone_number;
    this.address = address || "N/A";
    this.classes = []; // Initialize empty classes array
  }

  getFullInfo() {
    return {
      id: this.id,
      parent_code: this.parent_code,
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      img: this.img,
      students: this.students,
      phone_number: this.phone_number,
      address: this.address,
    };
  }
}

// Columns
const columns = [
  { header: "Info", accessor: "info" },
  {
    header: "Parent ID",
    accessor: "parentId",
    className: "hidden md:table-cell",
  },
  {
    header: "Children",
    accessor: "children",
    className: "hidden md:table-cell",
  },
  // { header: "Classes", accessor: "classes", className: "hidden md:table-cell" },
  { header: "Phone", accessor: "phone", className: "hidden lg:table-cell" },
  { header: "Address", accessor: "address", className: "hidden lg:table-cell" },
  { header: "Actions", accessor: "action" },
];

// Actions Component
// const Actions = ({ onEdit, onDelete }) => (
//   <div className="flex gap-2">
//     <button
//       onClick={(e) => {
//         e.stopPropagation();
//         onEdit();
//       }}
//       className="p-1.5 rounded-md hover:bg-gray-100 text-blue-500 hover:text-blue-700"
//       aria-label="Edit"
//     >
//       <Edit2 size={16} />
//     </button>
//     <button
//       onClick={(e) => {
//         e.stopPropagation();
//         onDelete();
//       }}
//       className="p-1.5 rounded-md hover:bg-gray-100 text-red-500 hover:text-red-700"
//       aria-label="Delete"
//     >
//       <Trash2 size={16} />
//     </button>
//   </div>
// );

// Modals
import ParentModal from "@/components/modals/AddParentModal";
import ConfirmDeleteModal from "@/components/modals/ConfirmDeleteDialog";
import Actions from "@/components/Actions";

const ParentListPage = () => {
  const [parents, setParents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentParent, setCurrentParent] = useState(null);

  // Fetch data on mount
  useEffect(() => {
    const fetchParents = async () => {
      setIsLoading(true);
      try {
        const response = await ParentService.getAllParents();
        console.log("API Response:", response); // Debug log

        const data = response.results || response || []; // Handle different response structures
        console.log("Fetched Parents Data:", data); // Debug log

        const formatted = data.map((item, index) => {
          return new Parent({
            id: item.id,
            parent_code: item.parent_code,
              first_name: item.first_name,
              last_name: item.last_name,
            email: item.email,
            phone_number: item.phone_number || item.phone,
            address: item.address,
            students: item.students || [],
            img: item.img,
          });
        });

        console.log("Formatted Parents:", formatted); // Debug log
        setParents(formatted);
      } catch (err) {
        console.error("Failed to fetch parents:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchParents();
  }, []);

  // Save handler (add or edit)
  const handleSaveParent = async (parent, mode) => {
    try {
      if (mode === "add") {
        const newParent = await ParentService.addParent(parent.getFullInfo());
        setParents((prev) => [...prev, new Parent(newParent)]);
      } else {
        await ParentService.updateParent(parent.id, parent.getFullInfo());
        setParents((prev) =>
          prev.map((p) => (p.id === parent.id ? parent : p))
        );
      }
    } catch (err) {
      console.error("Failed to save parent:", err);
    }
  };

  // Delete handler
  const handleDeleteParent = async (parentId) => {
    try {
      await ParentService.deleteParent(parentId);
      setParents((prev) => prev.filter((p) => p.id !== parentId));
    } catch (err) {
      console.error("Failed to delete parent:", err);
    }
  };

  // Edit click
  const handleEditClick = (parentId) => {
    const parent = parents.find((p) => p.id === parentId);
    if (parent) {
      setCurrentParent(parent);
      setIsEditModalOpen(true);
    }
  };

  // Delete click
  const handleDeleteClick = (parentId) => {
    const parent = parents.find((p) => p.id === parentId);
    if (parent) {
      setCurrentParent(parent);
      setIsDeleteModalOpen(true);
    }
  };

  // Render table row
  const renderRow = (item) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <img
          src={item.img}
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
      <td className="hidden md:table-cell">{item.parent_code}</td>
      <td className="hidden md:table-cell">
        {item.students.length > 0
          ? item.students
              .map((student) => student.name || student.id || student)
              .join(", ")
          : "None"}
      </td>
      {/* <td className="hidden md:table-cell">
        {item.classes.length > 0
          ? item.classes.map((cls) => cls.name || cls).join(", ")
          : "None"}
      </td> */}
      <td className="hidden lg:table-cell">{item.phone_number}</td>
      <td className="hidden lg:table-cell">{item.address}</td>
      <td>
        {/* <Actions
          onEdit={() => handleEditClick(item.id)}
          onDelete={() => handleDeleteClick(item.id)}
        /> */}
        <Actions /> 
      </td>
    </tr>
  );

  return (
    <section className="bg-white p-6 rounded-md flex-1 m-4 mt-0">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="hidden md:block text-lg font-bold text-gray-800">
            All Parents
          </h1>

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

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <>
            <Table columns={columns} renderRow={renderRow} data={parents} />
            <Pagination totalPages={5} totalResults={parents.length} />
          </>
        )}

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
          onConfirm={() => {
            handleDeleteParent(currentParent?.id);
            setIsDeleteModalOpen(false);
          }}
          parent={currentParent}
        />
      </div>
    </section>
  );
};

export default ParentListPage;
