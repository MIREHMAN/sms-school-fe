"use client";

import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { StudentService } from "@/services/StudentService";
import AddStudentModal from "@/components/modals/AddStudentModal"; // 👈 Import
import FilterButton from "@/components/FilterButton";
import Actions from "@/components/Actions";
// import EditStudentModal from "@/modals/EditStudentModal";
// import DeleteConfirmModal from "@/modals/DeleteConfirmModal";

class Student {
  constructor({
    id,
    student_code,
    first_name,
    last_name,
    email,
    date_of_birth,
    phone_number,
    address,
    classroom,
  }) {
    this.id = id;
    this.student_code = student_code // Shorten ID for display
    this.name = `${first_name} ${last_name}`; // Combine first and last name
    this.email = email;
    this.img = "/avatar.png"; // Default image
    // this.gender = "N/A"; // Not provided in response
    this.dateofAdmission = "N/A"; // Not provided in response
    this.classes = classroom ? [classroom] : []; // Assuming classroom maps to classes
    this.phone = phone_number;
    this.address = address;
    this.birthDate = date_of_birth;
    this.parentName = "N/A"; // Not provided in response
    this.parentPhone = "N/A"; // Not provided in response
  }
}

const columns = [
  { header: "Info", accessor: "info" },
  {
    header: "Student ID",
    accessor: "studentId",
    className: "hidden md:table-cell",
  },
  // { header: "Gender", accessor: "gender", className: "hidden md:table-cell" },
  { header: "Class", accessor: "class", className: "hidden md:table-cell" },
  { header: "Phone", accessor: "phone", className: "hidden lg:table-cell" },
  {
    header: "DOB",
    accessor: "birthDate",
    className: "hidden lg:table-cell",
  },
  { header: "Actions", accessor: "action" },
];

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

export default function StudentListPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);

  // Fetch all students
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await StudentService.getAllStudents();
      const data = Array.isArray(response)
        ? response
        : response?.students || response?.results || [];
      console.log("Fetched students:", data);
      const formattedStudents = data.map((s) => new Student(s));
      setStudents(formattedStudents);
    } catch (err) {
      console.error("Error fetching students:", err);
      setError("Failed to load students.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleEditClick = (id) => {
    const student = students.find((s) => s.id === id);
    setCurrentStudent(student);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    const student = students.find((s) => s.id === id);
    setCurrentStudent(student);
    setIsDeleteModalOpen(true);
  };

  const renderRow = (student) => (
    <tr
      key={student.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-purple-50"
    >
      <td className="flex items-center gap-4 p-4">
        <img
          src={student.img || "/avatar.png"}
          alt="Avatar"
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <span className="font-semibold text-black">{student.name}</span>
          <span className="text-xs text-gray-500">{student.email}</span>
        </div>
      </td>
      <td className="hidden md:table-cell">{student.student_code}</td>
      {/* <td className="hidden md:table-cell">{student.gender}</td> */}
      <td className="hidden md:table-cell">
        {student.classes.map((c) => c.name).join(", ") || "N/A"}
      </td>
      <td className="hidden lg:table-cell">{student.phone || "—"}</td>
      <td className="hidden lg:table-cell">{student.birthDate || "—"}</td>
      <td>
        {/* <Actions
          onEdit={() => handleEditClick(student.id)}
          onDelete={() => handleDeleteClick(student.id)}
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
            All Students
          </h1>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            <TableSearch />
            <FilterButton />
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-purple-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-sm hover:bg-purple-600"
            >
              <Plus size={19} className="lg:hidden" />
              <span className="hidden sm:inline text-sm">Add Student</span>
            </button>
          </div>
        </header>

        {loading ? (
          <p className="text-gray-600 text-sm">Loading students...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : students.length === 0 ? (
          <p className="text-gray-500">No students found.</p>
        ) : (
          <>
            <Table columns={columns} renderRow={renderRow} data={students} />
            <Pagination totalPages={5} totalResults={students.length} />
          </>
        )}
      </div>

      {/* 👉 Add Student Modal */}
      <AddStudentModal
        open={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          fetchStudents(); // Refresh student list after adding
        }}
      />

      {/* 👉 Edit Student Modal (Coming soon) */}
      {/* <EditStudentModal open={isEditModalOpen} student={currentStudent} onClose={() => setIsEditModalOpen(false)} /> */}

      {/* 👉 Delete Confirmation Modal (Coming soon) */}
      {/* <DeleteConfirmModal open={isDeleteModalOpen} student={currentStudent} onConfirm={() => handleDeleteStudent(currentStudent?.id)} onClose={() => setIsDeleteModalOpen(false)} /> */}
    </section>
  );
}
