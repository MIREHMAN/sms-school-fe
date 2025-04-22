import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";

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
  { header: "Teacher ID", accessor: "teacherId", className: "hidden md:table-cell" },
  { header: "Subjects", accessor: "subjects", className: "hidden md:table-cell" },
  { header: "Classes", accessor: "classes", className: "hidden md:table-cell" },
  { header: "Phone", accessor: "phone", className: "hidden lg:table-cell" },
  { header: "Address", accessor: "address", className: "hidden lg:table-cell" },
  { header: "Actions", accessor: "action" },
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
        <h3 className="font-semibold">{item.name}</h3>
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
    <td className="hidden md:table-cell">{item.phone}</td>
    <td className="hidden md:table-cell">{item.address}</td>
    <td>
      <div className="flex items-center gap-2">
        <Link to={`/teachers/${item.id}`}>
          <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
            <img src="/view.png" alt="View" width={16} height={16} />
          </button>
        </Link>
      </div>
    </td>
  </tr>
);

const StudentListPage = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    // Simulate fetching data
    setTeachers(dummyTeachers);
  }, []);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Students</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <img src="/filter.png" alt="Filter" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <img src="/sort.png" alt="Sort" width={14} height={14} />
            </button>
          </div>
        </div>
      </div>

      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={teachers} />

      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default StudentListPage;
