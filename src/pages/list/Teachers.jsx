import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Actions from "@/components/Actions";
import { Plus } from "lucide-react";
import { useAsync } from "@/hooks/useAsync";
import { TeacherService } from "@/services/TeacherService";
import AddTeacherModal from "@/components/modals/AddTeacherModal";

const columns = [
  { header: "Info", accessor: "info" },
  { header: "Teacher ID", accessor: "id", className: "hidden md:table-cell" },
  { header: "DOB", accessor: "dob", className: "hidden md:table-cell" },
  { header: "Phone", accessor: "phone", className: "hidden lg:table-cell" },
  { header: "Actions", accessor: "actions" },
];

const renderRow = (item, index) => (
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
      <Actions item="teachers" item_id={item.id} /> 
    </td>
  </tr>
);
const Header = ({ setIsModalOpen, isModalOpen }) => (
  <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
    <h1 className="hidden md:block text-lg font-bold text-gray-800">All Teachers</h1>

    <div className="flex items-center gap-4 w-full sm:w-auto">
      <TableSearch />

      <button className="w-9 h-9 flex items-center justify-center rounded-full bg-lamaYellow hover:brightness-95 transition">
        <img src="/filter.png" alt="Filter" width={14} height={14} />
      </button>

      <button className="w-9 h-9 flex items-center justify-center rounded-full bg-lamaYellow hover:brightness-95 transition">
        <img src="/sort.png" alt="Sort" width={14} height={14} />
      </button>

      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-purple-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-sm"
      >
        <Plus size={19} className="lg:hidden" />
        <span className="hidden sm:inline text-sm">Add Teacher</span>
      </button>

      <AddTeacherModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  </header>
);
const TeacherListPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const { loading, error, value } = useAsync(() =>
    TeacherService.getAllTeachers()
  );

  useEffect(() => {
    if (value && Array.isArray(value.results)) {
      setTeachers(value.results);
      setTotalResults(value.count || 0);
    } else {
      setTeachers([]);
      setTotalResults(0);
    }
  }, [value]);

  return (
    <section className="bg-white p-6 rounded-md flex-1 m-4 mt-0">
      <div className="max-w-7xl mx-auto">
        <Header setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />

        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500">Error fetching teachers</p>}

        {!loading && !error && (
          <>
            <Table columns={columns} renderRow={renderRow} data={teachers} />
            <Pagination totalPages={1} totalResults={totalResults} />
          </>
        )}
      </div>
    </section>
  );
};

export default TeacherListPage;
