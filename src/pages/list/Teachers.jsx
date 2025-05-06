import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Actions from "@/components/Actions";
import { Plus } from "lucide-react";

// Dummy Data
const dummyTeachers = [
  {
    id: "T001",
    name: "Jane Doe",
    email: "jane.doe@example.com",
    img: "/avatar.png",
    subjects: [{ name: "Math" }, { name: "Physics" }],
    classes: [{ name: "Class A" }, { name: "Class B" }],
    phone: "123-456-7890",
    address: "123 Elm Street",
  },
  {
    id: "T002",
    name: "John Smith",
    email: "john.smith@example.com",
    img: "/avatar.png",
    subjects: [{ name: "English" }],
    classes: [{ name: "Class C" }],
    phone: "987-654-3210",
    address: "456 Oak Avenue",
  },
];

const columns = [
  { header: "Info", accessor: "info" },
  { header: "Teacher ID", accessor: "id", className: "hidden md:table-cell" },
  { header: "Subjects", accessor: "subjects", className: "hidden md:table-cell" },
  { header: "Classes", accessor: "classes", className: "hidden md:table-cell" },
  { header: "Phone", accessor: "phone", className: "hidden lg:table-cell" },
  { header: "Address", accessor: "address", className: "hidden lg:table-cell" },
  { header: "Actions", accessor: "actions" },
];

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
       
        <Link to={`/teachers/${item.id}`}><h3 className="font-semibold hover:text-blue-600 cursor-pointer">{item.name}</h3></Link>
        <p className="text-xs text-gray-500">{item.email}</p>
      </div>
    </td>
    <td className="hidden md:table-cell">{item.id}</td>
    <td className="hidden md:table-cell">
      {item.subjects.map((s) => s.name).join(", ")}
    </td>
    <td className="hidden md:table-cell">
      {item.classes.map((c) => c.name).join(", ")}
    </td>
    <td className="hidden lg:table-cell">{item.phone}</td>
    <td className="hidden lg:table-cell">{item.address}</td>
    <td>
    <Actions item="teachers" item_id={item.id} />
    </td>
  </tr>
);

const TeacherListPage = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    // Simulate fetching data
    setTeachers(dummyTeachers);
  }, []);

  return (
    <section className="bg-white p-6 rounded-md flex-1 m-4 mt-0">
  <div className="max-w-7xl mx-auto">
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
          className="bg-purple-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-sm"
        >
          <Plus size={19} className="lg:hidden" />
          <span className="hidden sm:inline text-sm">Add Teacher</span> 
        </button>
      </div>
    </header>

    {/* LIST */}
    <Table columns={columns} renderRow={renderRow} data={teachers} /> 

    {/* PAGINATION */}
    <Pagination totalPages={5} totalResults={teachers.length} /> 
  </div>
</section>

  );
};

export default TeacherListPage;
