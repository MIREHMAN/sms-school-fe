import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  Award,
  Download,
  BarChart2,
  Plus,
  X,
  Edit2,
  Trash2,
} from "lucide-react";
import TableSearch from "@/components/TableSearch";
import Pagination from "@/components/Pagination";

// Exam Model
class Exam {
  constructor({
    id,
    subject,
    className,
    year,
    type,
    date,
    time,
    duration,
    location,
    color = "border-blue-500",
  }) {
    this.id = id;
    this.subject = subject;
    this.className = className;
    this.year = year;
    this.type = type;
    this.date = date;
    this.time = time;
    this.duration = duration;
    this.location = location;
    this.color = color;
  }

  getFullInfo() {
    return {
      id: this.id,
      subject: this.subject,
      className: this.className,
      year: this.year,
      type: this.type,
      date: this.date,
      time: this.time,
      duration: this.duration,
      location: this.location,
      color: this.color,
    };
  }
}

// Dummy Data
const dummyExams = [
  new Exam({
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
  }),
  new Exam({
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
  }),
  new Exam({
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

// Exam Modal Component
const ExamModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  exam = null,
  mode = 'add'
}) => {
  const [formData, setFormData] = useState({
    subject: "",
    className: "",
    year: "",
    type: "",
    date: "",
    time: "",
    duration: "",
    location: "",
    color: "border-blue-500",
  });

  useEffect(() => {
    if (mode === 'edit' && exam) {
      setFormData({
        subject: exam.subject,
        className: exam.className,
        year: exam.year,
        type: exam.type,
        date: exam.date,
        time: exam.time,
        duration: exam.duration,
        location: exam.location,
        color: exam.color,
      });
    } else {
      setFormData({
        subject: "",
        className: "",
        year: "",
        type: "",
        date: "",
        time: "",
        duration: "",
        location: "",
        color: "border-blue-500",
      });
    }
  }, [exam, mode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const examData = {
      id: mode === 'edit' ? exam.id : Math.max(...dummyExams.map(e => e.id)) + 1,
      subject: formData.subject,
      className: formData.className,
      year: formData.year,
      type: formData.type,
      date: formData.date,
      time: formData.time,
      duration: formData.duration,
      location: formData.location,
      color: formData.color,
    };
    
    onSave(new Exam(examData), mode);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100">
        <div className="sticky top-0 bg-white p-6 pb-4 border-b border-gray-100 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {mode === 'add' ? 'Add New Exam' : 'Edit Exam'}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {mode === 'add' ? 'Fill in the exam details' : 'Update the exam details'}
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
                  <option>Class 9</option>
                  <option>Class 10</option>
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
                  <option>2026</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Exam Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all appearance-none"
                  required
                >
                  <option value="">Select Type</option>
                  <option>Midterm</option>
                  <option>Final</option>
                  <option>Quiz</option>
                  <option>Test</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Time</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Duration</label>
                <select
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all appearance-none"
                  required
                >
                  <option value="">Select Duration</option>
                  <option>30min</option>
                  <option>1h</option>
                  <option>1h 30min</option>
                  <option>2h</option>
                  <option>2h 30min</option>
                  <option>3h</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Room 101"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Color</label>
              <div className="flex gap-2">
                {["border-blue-500", "border-green-500", "border-yellow-500", "border-red-500", "border-purple-500"].map((color) => (
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
              {mode === 'add' ? 'Add Exam' : 'Update Exam'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Confirm Delete Modal
const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, exam }) => {
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
            Are you sure you want to delete the <span className="font-semibold">{exam?.subject}</span> exam for <span className="font-semibold">{exam?.className}</span>? 
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
                onConfirm(exam.id);
                onClose();
              }}
              className="px-5 py-2.5 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors shadow-sm"
            >
              Delete Exam
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ExamsPage = () => {
  const [exams, setExams] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedExamType, setSelectedExamType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentExam, setCurrentExam] = useState(null);

  useEffect(() => {
    setExams(dummyExams);
  }, []);

  const handleSaveExam = (exam, mode) => {
    if (mode === 'add') {
      setExams(prev => [...prev, exam]);
    } else {
      setExams(prev => 
        prev.map(e => e.id === exam.id ? exam : e)
      );
    }
  };

  const handleDeleteExam = (examId) => {
    setExams(prev => prev.filter(e => e.id !== examId));
  };

  const handleEditClick = (examId) => {
    const exam = exams.find(e => e.id === examId);
    if (exam) {
      setCurrentExam(exam);
      setIsEditModalOpen(true);
    }
  };

  const handleDeleteClick = (examId) => {
    const exam = exams.find(e => e.id === examId);
    if (exam) {
      setCurrentExam(exam);
      setIsDeleteModalOpen(true);
    }
  };

  const itemsPerPage = 2;
  const now = new Date();

  const filteredExams = exams.filter((exam) => {
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

            <button 
              className="bg-purple-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-sm hover:bg-purple-600 transition-colors"
              onClick={() => setIsAddModalOpen(true)}
            >
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
                <Actions 
                  onEdit={() => handleEditClick(exam.id)}
                  onDelete={() => handleDeleteClick(exam.id)}
                />
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

        {/* Modals */}
        <ExamModal 
          isOpen={isAddModalOpen} 
          onClose={() => setIsAddModalOpen(false)} 
          onSave={handleSaveExam}
          mode="add"
        />
        
        <ExamModal 
          isOpen={isEditModalOpen} 
          onClose={() => setIsEditModalOpen(false)} 
          onSave={handleSaveExam}
          exam={currentExam}
          mode="edit"
        />
        
        <ConfirmDeleteModal 
          isOpen={isDeleteModalOpen} 
          onClose={() => setIsDeleteModalOpen(false)} 
          onConfirm={handleDeleteExam}
          exam={currentExam}
        />
      </div>
    </section>
  );
};

export default ExamsPage;