"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus } from "lucide-react";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { StudentService } from "@/services/StudentService";
import AddStudentModal from "@/components/modals/AddStudentModal";
import FilterButton from "@/components/FilterButton";
import Actions from "@/components/Actions";

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
    this.student_code = student_code;
    this.name = `${first_name} ${last_name}`;
    this.email = email;
    this.img = "/avatar.png";
    this.classes = classroom
      ? [
          {
            id: classroom.id,
            name: classroom.class_name || `Grade ${classroom.id}`,
          },
        ]
      : [];
    this.phone = phone_number;
    this.address = address;
    this.birthDate = date_of_birth?.split("T")[0] || "N/A";
  }
}

const columns = [
  { header: "Info", accessor: "info" },
  {
    header: "Student ID",
    accessor: "studentId",
    className: "hidden md:table-cell",
  },
  { header: "Class", accessor: "class", className: "hidden md:table-cell" },
  { header: "Phone", accessor: "phone", className: "hidden lg:table-cell" },
  { header: "DOB", accessor: "birthDate", className: "hidden lg:table-cell" },
  { header: "Actions", accessor: "action" },
];

export default function StudentListPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const studentsResponse = await StudentService.getAllStudents();

      const studentsData = Array.isArray(studentsResponse)
        ? studentsResponse
        : studentsResponse?.students || studentsResponse?.results || [];
      console.log("Fetched students:", studentsData);

      const formattedStudents = studentsData.map(
        (student) => new Student(student)
      );

      setStudents(formattedStudents);
    } catch (err) {
      console.error("Error fetching students:", err);
      setError("Failed to load students. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const filteredStudents = searchQuery
    ? students.filter(
        (student) =>
          student.name.toLowerCase().includes(searchQuery) ||
          student.email.toLowerCase().includes(searchQuery) ||
          student.student_code.toLowerCase().includes(searchQuery) ||
          student.classes.some((c) =>
            c.name.toLowerCase().includes(searchQuery)
          )
      )
    : students;

  const handleDeleteStudent = async (studentId) => {
    try {
      await StudentService.deleteStudent(studentId);
      fetchStudents();
    } catch (err) {
      console.error("Error deleting student:", err);
      setError("Failed to delete student. Please try again.");
    }
  };

  const renderRow = (student) => (
    <tr key={student.id} className="border-b border-gray-200 hover:bg-gray-50">
      <td className="flex items-center gap-3 p-3">
        <img
          src={student.img}
          alt="Avatar"
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <span className="font-medium text-sm">{student.name}</span>
          <span className="text-xs text-gray-500">{student.email}</span>
        </div>
      </td>
      <td className="hidden md:table-cell text-sm">{student.student_code}</td>
      <td className="hidden md:table-cell text-sm">
        {student.classes[0]?.name || "Unassigned"}
      </td>
      <td className="hidden lg:table-cell text-sm">{student.phone || "—"}</td>
      <td className="hidden lg:table-cell text-sm">{student.birthDate}</td>
      <td>
        <Actions
          itemId={student.id}
          viewPath={`/students/${student.id}`}
          itemType="student"
          onEdit={() => console.log("Edit", student.id)}
          deleteService={StudentService.deleteStudent}
          refreshData={fetchStudents}
        />
      </td>
    </tr>
  );

  return (
    <section className="bg-white p-4 rounded-md flex-1 m-4 mt-0 text-sm">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
          <h1 className="hidden md:block text-base font-semibold text-gray-800">
            All Students
          </h1>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <TableSearch
              placeholder="Search students..."
              onSearch={handleSearch}
            />
            <FilterButton />
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-purple-500 text-white px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm hover:bg-purple-600 text-sm"
            >
              <Plus size={16} className="lg:hidden" />
              <span className="hidden sm:inline">Add Student</span>
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
              onClick={fetchStudents}
              className="ml-3 text-purple-600 hover:text-purple-800 text-sm"
            >
              Retry
            </button>
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="text-center py-12 text-gray-500 bg-white rounded-xl shadow-sm text-sm">
            <div className="mx-auto w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <Plus size={20} className="text-gray-400" />
            </div>
            <h3 className="text-sm font-medium mb-1">No students found</h3>
            <p className="text-xs">
              Try a different search or add a new student
            </p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="mt-3 px-3 py-1.5 bg-purple-600 text-white rounded-lg inline-flex items-center text-sm"
            >
              <Plus size={14} className="mr-1.5" />
              Add a new student
            </button>
          </div>
        ) : (
          <>
            <Table
              columns={columns}
              data={filteredStudents}
              renderRow={renderRow}
            />
            <Pagination
              currentPage={1}
              totalPages={Math.ceil(filteredStudents.length / 10)}
              onPageChange={(page) => console.log("Page changed", page)}
            />
          </>
        )}
      </div>

      <AddStudentModal
        open={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          fetchStudents();
        }}
      />
    </section>
  );
}
