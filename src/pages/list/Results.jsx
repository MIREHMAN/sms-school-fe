import React, { useState } from "react";
import {
  Calendar,
  Award,
  Trophy,
  ClipboardList,
  FileText,
  Layers,
} from "lucide-react";
import TableSearch from "@/components/TableSearch";
import Pagination from "@/components/Pagination";

const dummyResults = [
  {
    id: 1,
    subject: "Math",
    className: "Class 6",
    year: "2025",
    examType: "Exam",
    term: "Final",
    date: "2025-12-10",
    score: 88,
    total: 100,
    grade: "A",
    remarks: "Excellent",
    color: "border-blue-500",
  },
  {
    id: 2,
    subject: "English",
    className: "Class 7",
    year: "2025",
    examType: "Quiz",
    term: "Midterm",
    date: "2025-06-11",
    score: 72,
    total: 100,
    grade: "B",
    remarks: "Good effort",
    color: "border-green-500",
  },
  {
    id: 3,
    subject: "Science",
    className: "Class 8",
    year: "2024",
    examType: "Assignment",
    term: "Annual",
    date: "2024-04-01",
    score: 95,
    total: 100,
    grade: "A+",
    remarks: "Outstanding submission",
    color: "border-yellow-500",
  },
];

const ResultsPage = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedExamType, setSelectedExamType] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("");

  const filteredResults = dummyResults.filter((result) => {
    return (
      (selectedClass === "" || result.className === selectedClass) &&
      (selectedSubject === "" || result.subject === selectedSubject) &&
      (selectedYear === "" || result.year === selectedYear) &&
      (selectedExamType === "" || result.examType === selectedExamType) &&
      (selectedTerm === "" || result.term === selectedTerm)
    );
  });

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
          <h1 className="hidden md:block text-lg font-bold text-gray-800">
            Exam Results
          </h1>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            <TableSearch />
            <button className="w-9 h-9 flex items-center justify-center rounded-full bg-lamaYellow hover:brightness-95 transition">
              <img src="/filter.png" alt="Filter" width={14} height={14} />
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-full bg-lamaYellow hover:brightness-95 transition">
              <img src="/sort.png" alt="Sort" width={14} height={14} />
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
            <option>Science</option>
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
            <option>Exam</option>
            <option>Quiz</option>
            <option>Assignment</option>
          </select>

          <select
            value={selectedTerm}
            onChange={(e) => setSelectedTerm(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Terms</option>
            <option>Midterm</option>
            <option>Final</option>
            <option>Annual</option>
          </select>
        </div>

        {/* Results */}
        {filteredResults.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center border">
            <Award size={48} className="mx-auto mb-4 text-gray-400" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              No Results Found
            </h2>
            <p className="text-gray-500">Try adjusting your filters</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {filteredResults.map((result) => (
              <li
                key={result.id}
                className={`border-l-4 ${result.color} bg-white p-4 rounded shadow flex items-center justify-between`}
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {result.subject}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {result.className} — {result.examType} — {result.term}
                  </p>
                  <div className="flex gap-4 text-sm text-gray-700 mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {formatDate(result.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <ClipboardList size={14} />
                      {result.score}/{result.total}
                    </span>
                    <span className="flex items-center gap-1">
                      <Trophy size={14} />
                      Grade: {result.grade}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1 italic">
                    {result.remarks}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Pagination */}
      <Pagination totalPages={3} totalResults={filteredResults.length} />
    </section>
  );
};

export default ResultsPage;
