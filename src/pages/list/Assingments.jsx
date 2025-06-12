import React, { useState } from "react";
import { Download, ClipboardList, BookOpen, Calendar } from "lucide-react";
import TableSearch from "@/components/TableSearch";
import Pagination from "@/components/Pagination";

const dummyAssignments = [
  {
    id: 1,
    title: "Algebra Worksheet",
    subject: "Math",
    className: "Class 6",
    year: "2025",
    dueDate: "2025-06-14",
    priority: "High",
    status: "Pending",
  },
  {
    id: 2,
    title: "Essay on Shakespeare",
    subject: "English",
    className: "Class 7",
    year: "2025",
    dueDate: "2025-06-12",
    priority: "Low",
    status: "Completed",
  },
];

const AssignmentsPage = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const now = new Date();

  const filteredAssignments = dummyAssignments.filter((a) => {
    return (
      (selectedClass === "" || a.className === selectedClass) &&
      (selectedSubject === "" || a.subject === selectedSubject) &&
      (selectedYear === "" || a.year === selectedYear) &&
      (selectedStatus === "" || a.status === selectedStatus)
    );
  });

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getDaysLeft = (dueDate) => {
    return Math.floor((new Date(dueDate) - now) / (1000 * 60 * 60 * 24));
  };

  return (
    <section className="bg-white p-6 rounded-md flex-1 m-4 mt-0">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="hidden md:block text-lg font-bold text-gray-800">All Assignments</h1>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            <TableSearch />

            <button className="w-9 h-9 flex items-center justify-center rounded-full bg-lamaYellow hover:brightness-95 transition">
              <img src="/filter.png" alt="Filter" width={14} height={14} />
            </button>

            <button className="w-9 h-9 flex items-center justify-center rounded-full bg-lamaYellow hover:brightness-95 transition">
              <img src="/sort.png" alt="Sort" width={14} height={14} />
            </button>

            <button className="bg-purple-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-sm">
              <Download size={19} className="lg:hidden" />
              <span className="hidden sm:inline text-sm">Add Assignment</span>
            </button>
          </div>
        </header>

        {/* FILTERS */}
        <div className="flex flex-wrap gap-4 mb-6 items-center">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Classes</option>
            <option>Class 6</option>
            <option>Class 7</option>
          </select>

          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Subjects</option>
            <option>Math</option>
            <option>English</option>
          </select>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Years</option>
            <option>2024</option>
            <option>2025</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Status</option>
            <option>Pending</option>
            <option>Completed</option>
          </select>
        </div>

        {/* ASSIGNMENT LIST */}
        {filteredAssignments.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center border">
            <ClipboardList size={48} className="mx-auto mb-4 text-gray-400" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              No Assignments Found
            </h2>
            <p className="text-gray-500">Try changing the filters</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {filteredAssignments.map((a) => {
              const daysLeft = getDaysLeft(a.dueDate);
              const overdue = daysLeft < 0 && a.status !== "Completed";

              return (
                <li
                  key={a.id}
                  className={`border-l-4 ${
                    overdue ? "border-red-500" : "border-blue-500"
                  } bg-white p-4 rounded shadow flex items-start justify-between`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3
                        className={`text-lg font-semibold ${
                          a.status === "Completed"
                            ? "text-gray-500 line-through"
                            : "text-gray-800"
                        }`}
                      >
                        {a.title}
                      </h3>
                      {a.priority === "High" && (
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full">
                          High Priority
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <BookOpen size={14} />
                        <span>{a.subject}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>
                          {formatDate(a.dueDate)}
                          {a.status !== "Completed" &&
                            (daysLeft < 0
                              ? " (Overdue)"
                              : daysLeft === 0
                              ? " (Today)"
                              : ` (${daysLeft} days left)`)}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {/* PAGINATION */}
        <div className="mt-8">
          <Pagination totalPages={2} totalResults={filteredAssignments.length} />
        </div>
      </div>
    </section>
  );
};

export default AssignmentsPage;
