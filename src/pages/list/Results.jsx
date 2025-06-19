import React, { useState, useEffect } from "react";
import {
  Calendar,
  Award,
  Trophy,
  ClipboardList,
  Plus,
  X,
  Edit2,
  Trash2,
} from "lucide-react";
import TableSearch from "@/components/TableSearch";
import Pagination from "@/components/Pagination";

// Result Model
class Result {
  constructor({
    id,
    subject,
    className,
    year,
    examType,
    term,
    date,
    score,
    total,
    grade,
    remarks,
    color = "border-blue-500",
  }) {
    this.id = id;
    this.subject = subject;
    this.className = className;
    this.year = year;
    this.examType = examType;
    this.term = term;
    this.date = date;
    this.score = score;
    this.total = total;
    this.grade = grade;
    this.remarks = remarks;
    this.color = color;
  }
}

// Dummy Data
const dummyResults = [
  new Result({
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
  }),
  new Result({
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
  }),
  new Result({
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
  }),
];

// Actions Component
const Actions = ({ onEdit, onDelete }) => {
  return (
    <div className="flex gap-2">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onEdit();
        }}
        className="p-1.5 rounded-md hover:bg-gray-100 text-blue-500 hover:text-blue-700"
        aria-label="Edit"
      >
        <Edit2 size={16} />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="p-1.5 rounded-md hover:bg-gray-100 text-red-500 hover:text-red-700"
        aria-label="Delete"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};

// Result Modal Component
const ResultModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  result = null,
  mode = 'add'
}) => {
  const [formData, setFormData] = useState({
    subject: "",
    className: "",
    year: "",
    examType: "",
    term: "",
    date: "",
    score: "",
    total: "",
    grade: "",
    remarks: "",
    color: "border-blue-500",
  });

  useEffect(() => {
    if (mode === 'edit' && result) {
      setFormData({
        subject: result.subject || "",
        className: result.className || "",
        year: result.year || "",
        examType: result.examType || "",
        term: result.term || "",
        date: result.date || "",
        score: result.score || "",
        total: result.total || "",
        grade: result.grade || "",
        remarks: result.remarks || "",
        color: result.color || "border-blue-500",
      });
    } else {
      setFormData({
        subject: "",
        className: "",
        year: "",
        examType: "",
        term: "",
        date: "",
        score: "",
        total: "",
        grade: "",
        remarks: "",
        color: "border-blue-500",
      });
    }
  }, [result, mode, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const resultData = {
      id: mode === 'edit' ? result.id : Math.max(...dummyResults.map(r => r.id), 0) + 1,
      subject: formData.subject,
      className: formData.className,
      year: formData.year,
      examType: formData.examType,
      term: formData.term,
      date: formData.date,
      score: Number(formData.score),
      total: Number(formData.total),
      grade: formData.grade,
      remarks: formData.remarks,
      color: formData.color,
    };
    
    onSave(new Result(resultData), mode);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100">
        <div className="sticky top-0 bg-white p-6 pb-4 border-b border-gray-100 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {mode === 'add' ? 'Add New Result' : 'Edit Result'}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {mode === 'add' ? 'Fill in the result details' : 'Update the result details'}
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 p-1 transition-colors"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 pt-4 space-y-6">
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Math"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Class</label>
                <select
                  name="className"
                  value={formData.className}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all appearance-none"
                  required
                >
                  <option value="">Select Class</option>
                  <option>Class 6</option>
                  <option>Class 7</option>
                  <option>Class 8</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Year</label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all appearance-none"
                  required
                >
                  <option value="">Select Year</option>
                  <option>2024</option>
                  <option>2025</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Exam Type</label>
                <select
                  name="examType"
                  value={formData.examType}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all appearance-none"
                  required
                >
                  <option value="">Select Type</option>
                  <option>Exam</option>
                  <option>Quiz</option>
                  <option>Assignment</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Term</label>
                <select
                  name="term"
                  value={formData.term}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all appearance-none"
                  required
                >
                  <option value="">Select Term</option>
                  <option>Midterm</option>
                  <option>Final</option>
                  <option>Annual</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Score</label>
                <input
                  type="number"
                  name="score"
                  value={formData.score}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  min="0"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Total</label>
                <input
                  type="number"
                  name="total"
                  value={formData.total}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  min="0"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Grade</label>
                <select
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all appearance-none"
                  required
                >
                  <option value="">Select Grade</option>
                  <option>A+</option>
                  <option>A</option>
                  <option>B</option>
                  <option>C</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Remarks</label>
              <textarea
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                rows="3"
                placeholder="Teacher's remarks..."
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Color</label>
              <div className="flex gap-2">
                {["border-blue-500", "border-green-500", "border-yellow-500"].map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`w-8 h-8 rounded-full ${color.replace('border', 'bg')} ${formData.color === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, color }))}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-purple-500 text-white rounded-lg text-sm font-medium hover:bg-purple-600 transition-colors shadow-sm"
            >
              {mode === 'add' ? 'Add Result' : 'Update Result'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Confirm Delete Modal
const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, result }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md shadow-2xl border border-gray-100">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Confirm Delete</h2>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-gray-600 p-1 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete the <span className="font-semibold">{result?.subject}</span> result for <span className="font-semibold">{result?.className}</span>? 
            This action cannot be undone.
          </p>
          
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm(result.id);
                onClose();
              }}
              className="px-5 py-2.5 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors shadow-sm"
            >
              Delete Result
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ResultsPage = () => {
  const [results, setResults] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedExamType, setSelectedExamType] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentResult, setCurrentResult] = useState(null);

  useEffect(() => {
    setResults(dummyResults);
  }, []);

  const handleSaveResult = (result, mode) => {
    if (mode === 'add') {
      setResults(prev => [...prev, result]);
    } else {
      setResults(prev => 
        prev.map(r => r.id === result.id ? result : r)
      );
    }
  };

  const handleDeleteResult = (resultId) => {
    setResults(prev => prev.filter(r => r.id !== resultId));
  };

  const handleEditClick = (resultId) => {
    const result = results.find(r => r.id === resultId);
    if (result) {
      setCurrentResult(result);
      setIsEditModalOpen(true);
    }
  };

  const handleDeleteClick = (resultId) => {
    const result = results.find(r => r.id === resultId);
    if (result) {
      setCurrentResult(result);
      setIsDeleteModalOpen(true);
    }
  };

  const itemsPerPage = 2;

  const filteredResults = results.filter((result) => {
    return (
      (selectedClass === "" || result.className === selectedClass) &&
      (selectedSubject === "" || result.subject === selectedSubject) &&
      (selectedYear === "" || result.year === selectedYear) &&
      (selectedExamType === "" || result.examType === selectedExamType) &&
      (selectedTerm === "" || result.term === selectedTerm)
    );
  });

  const paginatedResults = filteredResults.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
            <button 
              className="bg-purple-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-sm hover:bg-purple-600 transition-colors"
              onClick={() => setIsAddModalOpen(true)}
            >
              <Plus size={19} className="lg:hidden" />
              <span className="hidden sm:inline text-sm">Add Result</span>
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
        {paginatedResults.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center border">
            <Award size={48} className="mx-auto mb-4 text-gray-400" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              No Results Found
            </h2>
            <p className="text-gray-500">Try adjusting your filters</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {paginatedResults.map((result) => (
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
                <Actions 
                  onEdit={() => handleEditClick(result.id)}
                  onDelete={() => handleDeleteClick(result.id)}
                />
              </li>
            ))}
          </ul>
        )}

        {/* Pagination */}
        {filteredResults.length > itemsPerPage && (
          <Pagination
            totalPages={Math.ceil(filteredResults.length / itemsPerPage)}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            totalResults={filteredResults.length}
          />
        )}

        {/* Modals */}
        <ResultModal 
          isOpen={isAddModalOpen} 
          onClose={() => setIsAddModalOpen(false)} 
          onSave={handleSaveResult}
          mode="add"
        />
        
        <ResultModal 
          isOpen={isEditModalOpen} 
          onClose={() => setIsEditModalOpen(false)} 
          onSave={handleSaveResult}
          result={currentResult}
          mode="edit"
        />
        
        <ConfirmDeleteModal 
          isOpen={isDeleteModalOpen} 
          onClose={() => setIsDeleteModalOpen(false)} 
          onConfirm={handleDeleteResult}
          result={currentResult}
        />
      </div>
    </section>
  );
};

export default ResultsPage;