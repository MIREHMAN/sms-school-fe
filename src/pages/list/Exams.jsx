import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Award,
  Download,
  BarChart2,
  Plus,
} from "lucide-react";
import TableSearch from "@/components/TableSearch";
import Pagination from "@/components/Pagination";

const dummyExams = [
  {
    id: 1,
    subject: "Math",
    className: "Class 6",
    year: "2025",
    type: "Final",
    date: "2025-12-10",
    time: "10:00 AM",
    duration: "2h 30min",
    location: "Room 101",
    color: "border-blue-500",
  },
  {
    id: 2,
    subject: "English",
    className: "Class 7",
    year: "2025",
    type: "Midterm",
    date: "2025-06-11",
    time: "09:00 AM",
    duration: "2h",
    location: "Room 202",
    color: "border-green-500",
  },
  {
    id: 3,
    subject: "History",
    className: "Class 6",
    year: "2024",
    type: "Final",
    date: "2024-05-14",
    time: "11:00 AM",
    duration: "1h 30min",
    location: "Room 303",
    color: "border-yellow-500",
  },
];

const ExamsPage = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedExamType, setSelectedExamType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 2;
  const now = new Date();

  const filteredExams = dummyExams.filter((exam) => {
    return (
      (selectedClass === "" || exam.className === selectedClass) &&
      (selectedSubject === "" || exam.subject === selectedSubject) &&
      (selectedYear === "" || exam.year === selectedYear) &&
      (selectedExamType === "" || exam.type === selectedExamType)
    );
  });

  const paginatedExams = filteredExams.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const hasFutureExams = filteredExams.some(
    (exam) => new Date(exam.date) >= now
  );

  const allExamsPast =
    filteredExams.length > 0 &&
    filteredExams.every((exam) => new Date(exam.date) < now);

  const formatDate = (dateString) => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <section className="bg-white p-6 rounded-md flex-1 m-4 mt-0">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="hidden md:block text-lg font-bold text-gray-800">All Exams</h1>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            <TableSearch />

            <button className="w-9 h-9 flex items-center justify-center rounded-full bg-lamaYellow hover:brightness-95 transition">
              <img src="/filter.png" alt="Filter" width={14} height={14} />
            </button>

            <button className="w-9 h-9 flex items-center justify-center rounded-full bg-lamaYellow hover:brightness-95 transition">
              <img src="/sort.png" alt="Sort" width={14} height={14} />
            </button>

            <button className="bg-purple-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-sm">
              <Plus size={19} className="lg:hidden" />
              <span className="hidden sm:inline text-sm">Add Exam</span>
            </button>
          </div>
        </header>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6 items-center">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Classes</option>
            <option>Class 6</option>
            <option>Class 7</option>
            <option>Class 8</option>
          </select>

          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Subjects</option>
            <option>Math</option>
            <option>English</option>
            <option>History</option>
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
            value={selectedExamType}
            onChange={(e) => setSelectedExamType(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Types</option>
            <option>Midterm</option>
            <option>Final</option>
          </select>

          {hasFutureExams && (
            <button
              onClick={() => alert("Downloading date sheet...")}
              className="ml-auto bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded flex items-center gap-2"
            >
              <Download size={18} />
              Download Date Sheet
            </button>
          )}
          {allExamsPast && (
            <button
              onClick={() => alert("Checking results...")}
              className="ml-auto bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2"
            >
              <BarChart2 size={18} />
              Check Results
            </button>
          )}
        </div>

        {/* Exam List */}
        {paginatedExams.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center border">
            <Award size={48} className="mx-auto mb-4 text-gray-400" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              No Exams Found
            </h2>
            <p className="text-gray-500">Try adjusting your filters</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {paginatedExams.map((exam) => (
              <li
                key={exam.id}
                className={`border-l-4 ${exam.color} bg-white p-4 rounded shadow flex items-center justify-between`}
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{exam.subject}</h3>
                  <p className="text-sm text-gray-600">
                    {exam.className} — {exam.type} — {exam.year}
                  </p>
                  <div className="flex gap-4 text-sm text-gray-700 mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {formatDate(exam.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {exam.time}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    <strong>Duration:</strong> {exam.duration} |{" "}
                    <strong>Location:</strong> {exam.location}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Pagination */}
        {filteredExams.length > itemsPerPage && (
          <Pagination
            totalPages={Math.ceil(filteredExams.length / itemsPerPage)}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            totalResults={filteredExams.length}
          />
        )}
      </div>
    </section>
  );
};

export default ExamsPage;
