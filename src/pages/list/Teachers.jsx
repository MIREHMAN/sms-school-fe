"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus } from "lucide-react";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { TeacherService } from "@/services/TeacherService";
import AddTeacherModal from "@/components/modals/AddTeacherModal";
import FilterButton from "@/components/FilterButton";
import Actions from "@/components/Actions";
import EditTeacherModal from "@/components/modals/EditTeacherModal";

class Teacher {
  constructor({
    id,
    CNIC,
    teacher_code,
    first_name,
    last_name,
    email,
    date_of_birth,
    phone_number,
    address,
    subjects,
  }) {
    this.id = id;
    this.CNIC = CNIC || "-";
    this.teacher_code = teacher_code;
    this.first_name = first_name || "";
    this.last_name = last_name || "";
    this.email = email || "";
    this.phone_number = phone_number || "";
    this.date_of_birth = date_of_birth?.split("T")[0] || "";
    this.name = `${first_name} ${last_name}`;
    this.img = "/avatar.png";
    this.subjects = subjects || [];
    this.phone = phone_number;
    this.address = address;
    this.birthDate = this.date_of_birth || "N/A";
  }
}

const columns = [
  { header: "Info", accessor: "info" },
  {
    header: "Teacher ID",
    accessor: "teacherId",
    className: "hidden md:table-cell",
  },
  { header: "Phone", accessor: "phone", className: "hidden lg:table-cell" },
  { header: "CNIC", accessor: "cnic", className: "hidden lg:table-cell" },
  { header: "DOB", accessor: "birthDate", className: "hidden lg:table-cell" },
  { header: "Actions", accessor: "action" },
];

export default function TeacherListPage() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchTeachers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await TeacherService.getAllTeachers();
      const teachersData = Array.isArray(response)
        ? response
        : response?.teachers || response?.results || [];
      console.log("Fetched teachers:", teachersData);
      const formattedTeachers = teachersData.map(
        (teacher) => new Teacher(teacher)
      );
      setTeachers(formattedTeachers);
    } catch (err) {
      console.error("Error fetching teachers:", err);
      setError("Failed to load teachers. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const handleDeleteTeacher = async (teacherId) => {
    try {
      await TeacherService.deleteTeacher(teacherId);
      fetchTeachers(); // Refresh the list after deletion
    } catch (err) {
      console.error("Error deleting teacher:", err);
      setError("Failed to delete teacher. Please try again.");
    }
  };

  const filteredTeachers = searchQuery
    ? teachers.filter(
        (teacher) =>
          teacher.name.toLowerCase().includes(searchQuery) ||
          teacher.email.toLowerCase().includes(searchQuery) ||
          teacher.teacher_code.toLowerCase().includes(searchQuery) ||
          teacher.subjects.some((s) => s.toLowerCase().includes(searchQuery))
      )
    : teachers;

  const renderRow = (teacher) => (
    <tr key={teacher.id} className="border-b border-gray-200 hover:bg-gray-50">
      <td className="flex items-center gap-3 p-3">
        <img
          src={teacher.img}
          alt="Avatar"
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <span className="font-medium text-sm">{teacher.name}</span>
          <span className="text-xs text-gray-500">{teacher.email}</span>
        </div>
      </td>
      <td className="hidden md:table-cell text-sm">{teacher.teacher_code}</td>
      <td className="hidden lg:table-cell text-sm">{teacher.phone || "—"}</td>
      <td className="hidden lg:table-cell text-sm">{teacher.CNIC || "—"}</td>
      <td className="hidden lg:table-cell text-sm">{teacher.birthDate}</td>
      <td>
        <Actions
          itemId={teacher.id}
          viewPath="/teachers/:id"
          onEdit={(id) => {
            const teacherToEdit = teachers.find((t) => t.id === id);
            if (teacherToEdit) {
              setSelectedTeacher(teacherToEdit);
              setIsEditModalOpen(true);
            }
          }}
          deleteService={handleDeleteTeacher}
          itemName="teacher"
          onDeleteSuccess={fetchTeachers}
        />
      </td>
    </tr>
  );

  return (
    <section className="bg-white p-4 rounded-md flex-1 m-4 mt-0 text-sm">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
          <h1 className="hidden md:block text-base font-semibold text-gray-800">
            All Teachers
          </h1>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <TableSearch
              placeholder="Search teachers..."
              onSearch={handleSearch}
            />
            <FilterButton />
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-purple-500 text-white px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm hover:bg-purple-600 text-sm"
            >
              <Plus size={16} className="lg:hidden" />
              <span className="hidden sm:inline">Add Teacher</span>
            </button>
          </div>
        </header>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg text-sm">
            {error}
            <button
              onClick={fetchTeachers}
              className="ml-3 text-purple-600 hover:text-purple-800 text-sm"
            >
              Retry
            </button>
          </div>
        ) : filteredTeachers.length === 0 ? (
          <div className="text-center py-12 text-gray-500 bg-white rounded-xl shadow-sm text-sm">
            <div className="mx-auto w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <Plus size={20} className="text-gray-400" />
            </div>
            <h3 className="text-sm font-medium mb-1">No teachers found</h3>
            <p className="text-xs">
              Try a different search or add a new teacher
            </p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="mt-3 px-3 py-1.5 bg-purple-600 text-white rounded-lg inline-flex items-center text-sm"
            >
              <Plus size={14} className="mr-1.5" />
              Add a new teacher
            </button>
          </div>
        ) : (
          <>
            <Table
              columns={columns}
              data={filteredTeachers}
              renderRow={renderRow}
            />
            <Pagination
              currentPage={1}
              totalPages={Math.ceil(filteredTeachers.length / 10)}
              onPageChange={(page) => console.log("Page changed", page)}
            />
          </>
        )}
      </div>

      <AddTeacherModal
        open={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          fetchTeachers();
        }}
      />
      <EditTeacherModal
        open={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedTeacher(null);
        }}
        teacher={selectedTeacher}
        onTeacherUpdated={fetchTeachers}
      />
    </section>
  );
}
