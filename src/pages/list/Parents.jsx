import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Actions from "@/components/Actions";
import { Plus } from "lucide-react";

// Dummy Data
const dummyParents = [
  {
    id: "P001",
    name: "Linda Thompson",
    email: "linda.thompson@example.com",
    img: "/avatar.png",
    children: [{ name: "Alice Johnson" }],
    classes: [{ name: "Grade 10" }],
    phone: "555-123-4567",
    address: "101 Cedar Street",
  },
  {
    id: "P002",
    name: "Mark Robinson",
    email: "mark.robinson@example.com",
    img: "/avatar.png",
    children: [{ name: "Bob Martinez" }],
    classes: [{ name: "Grade 11" }],
    phone: "555-987-6543",
    address: "202 Pine Avenue",
  },
];

const columns = [
  { header: "Info", accessor: "info" },
  { header: "Parent ID", accessor: "parentId", className: "hidden md:table-cell" },
  { header: "Children", accessor: "children", className: "hidden md:table-cell" },
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
      {item.children.map((child) => child.name).join(", ")}
    </td>
    <td className="hidden md:table-cell">
      {item.classes.map((cls) => cls.name).join(", ")}
    </td>
    <td className="hidden lg:table-cell">{item.phone}</td>
    <td className="hidden lg:table-cell">{item.address}</td>
    <td>
      <Actions />
    </td>
  </tr>
);

const ParentListPage = () => {
  const [parents, setParents] = useState([]);

  useEffect(() => {
    // Simulate fetching data
    setParents(dummyParents);
  }, []);

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
          className="bg-purple-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-sm"
        >
          <Plus size={19} className="lg:hidden" />
          <span className="hidden sm:inline text-sm">Add Parent</span>
        </button>
      </div>
    </header>

    {/* LIST */}
    <Table columns={columns} renderRow={renderRow} data={parents} />

    {/* PAGINATION */}
    <Pagination totalPages={5} totalResults={parents.length} />
  </div>
</section>

  );
};

export default ParentListPage;
