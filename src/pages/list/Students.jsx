import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Actions from "@/components/Actions";

// Dummy Data
const dummyStudents = [
  {
    id: "S001",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    img: "/avatar.png",
    gender: "Female",
    dateofAdmission: "2023-08-15",
    classes: [{ name: "Grade 10" }],
    phone: "111-222-3333",
    address: "12 Maple Lane",
  },
  {
    id: "S002",
    name: "Bob Martinez",
    email: "bob.martinez@example.com",
    img: "/avatar.png",
    gender: "Male",
    dateofAdmission: "2022-09-01",
    classes: [{ name: "Grade 11" }],
    phone: "444-555-6666",
    address: "89 Birch Street",
  },
];

const columns = [
  { header: "Info", accessor: "info" },
  { header: "Student ID", accessor: "studentId", className: "hidden md:table-cell" },
  { header: "Gender", accessor: "gender", className: "hidden md:table-cell" },
  { header: "Class", accessor: "class", className: "hidden md:table-cell" },
  { header: "Phone", accessor: "phone", className: "hidden lg:table-cell" },
  { header: "Date of Admission", accessor: "dateofAdmission", className: "hidden lg:table-cell" },
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
    <td className="hidden md:table-cell">{item.gender}</td>
    <td className="hidden md:table-cell">{item.classes.map((c) => c.name).join(", ")}</td>
    <td className="hidden lg:table-cell">{item.phone}</td>
    <td className="hidden lg:table-cell">{item.dateofAdmission}</td>
    <td>
    <Actions item="students" item_id={item.id} />
    </td>
  </tr>
);

const StudentListPage = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Simulate fetching data
    setStudents(dummyStudents);
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
      <Table columns={columns} renderRow={renderRow} data={students} />

      {/* PAGINATION */}
      <Pagination totalPages={5} totalResults={students.length} />
    </div>
  );
};

export default StudentListPage;
