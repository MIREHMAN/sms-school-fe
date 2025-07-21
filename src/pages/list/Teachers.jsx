//TeacherListPage.jsx
import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Actions from "@/components/Actions";
import { Plus } from "lucide-react";
import { useAsync } from "@/hooks/useAsync";
import { TeacherService } from "@/services/TeacherService";
import AddTeacherModal from "@/components/modals/AddTeacherModal";
import { debounce } from "@/lib/debounce"; // You'll need to create this utility
import FilterButton from "@/components/FilterButton";

const columns = [
  { header: "Info", accessor: "info" },
  { header: "Teacher ID", accessor: "id", className: "hidden md:table-cell" },
  { header: "DOB", accessor: "dob", className: "hidden md:table-cell" },
  { header: "Phone", accessor: "phone", className: "hidden lg:table-cell" },
  { header: "Actions", accessor: "actions" },
];

const renderRow = (item, index, onDelete, onEdit) => (
  <tr
    key={index}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
  >
    <td className="flex items-center gap-4 p-4">
      <img
        src="/avatar.png"
        alt="Avatar"
        width={40}
        height={40}
        className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
      />
      <div className="flex flex-col">
        <h3 className="font-semibold hover:text-blue-600 cursor-pointer">
          {item.first_name} {item.last_name}
        </h3>
        <p className="text-xs text-gray-500">{item.email}</p>
      </div>
    </td>
    <td className="hidden md:table-cell">{item.id}</td>
    <td className="hidden md:table-cell">{item.date_of_birth}</td>
    <td className="hidden lg:table-cell">{item.phone_number || "—"}</td>
    <td>
      <Actions
        item="teachers"
        item_id={item.id}
        onDeleted={() => onDelete(item.id)}
        onEdit={() => onEdit(item)}
      />
    </td>
  </tr>
);

const Header = ({
  setIsModalOpen,
  isModalOpen,
  searchValue,
  onSearchChange,
}) => (
  <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
    <h1 className="hidden md:block text-lg font-bold text-gray-800">
      All Teachers
    </h1>
    <div className="flex items-center gap-4 w-full sm:w-auto">
      <TableSearch onChange={onSearchChange} value={searchValue} />
<FilterButton/>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-purple-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-sm"
      >
        <Plus size={19} className="lg:hidden" />
        <span className="hidden sm:inline text-sm">Add Teacher</span>
      </button>
      <AddTeacherModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  </header>
);

const TeacherListPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTeacher, setEditTeacher] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { loading, error, value } = useAsync(() =>
    TeacherService.getAllTeachers()
  );

  useEffect(() => {
    if (value && Array.isArray(value.results)) {
      setTeachers(value.results);
      setFilteredTeachers(value.results);
      setTotalResults(value.count || 0);
    } else {
      setTeachers([]);
      setFilteredTeachers([]);
      setTotalResults(0);
    }
  }, [value]);

  // Search function
  const handleSearch = (term) => {
    if (!term) {
      setFilteredTeachers(teachers);
      return;
    }

    const lowercasedTerm = term.toLowerCase();
    const filtered = teachers.filter(
      (teacher) =>
        teacher.first_name.toLowerCase().includes(lowercasedTerm) ||
        teacher.last_name.toLowerCase().includes(lowercasedTerm) ||
        teacher.email.toLowerCase().includes(lowercasedTerm) ||
        teacher.id.toString().includes(term) ||
        (teacher.phone_number && teacher.phone_number.includes(term))
    );
    setFilteredTeachers(filtered);
  };

  // Debounced search to improve performance
  const debouncedSearch = debounce(handleSearch, 300);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleDelete = (id) => {
    setTeachers((prev) => prev.filter((t) => t.id !== id));
    setFilteredTeachers((prev) => prev.filter((t) => t.id !== id));
  };

  const handleEdit = (teacher) => {
    setEditTeacher(teacher);
    setIsModalOpen(true);
  };

  return (
    <section className="bg-white p-6 rounded-md flex-1 m-4 mt-0">
      <div className="max-w-7xl mx-auto">
        <Header
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          searchValue={searchTerm}
          onSearchChange={handleSearchChange}
        />
        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500">Error fetching teachers</p>}
        {!loading && !error && (
          <>
            <Table
              columns={columns}
              renderRow={(item, index) =>
                renderRow(item, index, handleDelete, handleEdit)
              }
              data={filteredTeachers}
            />
            <Pagination totalPages={1} totalResults={totalResults} />
          </>
        )}
        <AddTeacherModal
          open={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditTeacher(null);
          }}
          teacher={editTeacher}
        />
      </div>
    </section>
  );
};

export default TeacherListPage;
