import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Award, Plus, X, ChevronRight, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ExamsPage() {
  const [exams, setExams] = useState([
    { id: 1, subject: 'Math', date: '2025-05-10', time: '10:00 AM', duration: '2h 30min', color: 'bg-blue-100 border-blue-400' },
    { id: 2, subject: 'English', date: '2025-05-12', time: '09:00 AM', duration: '2h', color: 'bg-green-100 border-green-400' },
    { id: 3, subject: 'History', date: '2025-05-14', time: '11:00 AM', duration: '1h 30min', color: 'bg-yellow-100 border-yellow-400' },
    { id: 4, subject: 'Biology', date: '2025-05-16', time: '08:30 AM', duration: '2h', color: 'bg-purple-100 border-purple-400' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newExam, setNewExam] = useState({
    id: 0,
    subject: '',
    date: '',
    time: '',
    duration: '',
    color: ''
  });
  
  const [animateButton, setAnimateButton] = useState(false);
  const [filterActive, setFilterActive] = useState(false);
  const [expandedExam, setExpandedExam] = useState(null);

  const colors = [
    'bg-blue-100 border-blue-400',
    'bg-green-100 border-green-400',
    'bg-yellow-100 border-yellow-400',
    'bg-purple-100 border-purple-400',
    'bg-pink-100 border-pink-400',
    'bg-indigo-100 border-indigo-400'
  ];

  const handleAddExam = () => {
    if (newExam.subject && newExam.date && newExam.time && newExam.duration) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const newId = Math.max(0, ...exams.map(exam => exam.id)) + 1;
      
      setExams([...exams, { 
        ...newExam, 
        id: newId,
        color: randomColor 
      }]);
      
      setNewExam({ id: 0, subject: '', date: '', time: '', duration: '', color: '' });
      setShowModal(false);
    }
  };

  const deleteExam = (id) => {
    setExams(exams.filter(exam => exam.id !== id));
    if (expandedExam === id) {
      setExpandedExam(null);
    }
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleFilterClick = () => {
    setFilterActive(!filterActive);
    // Here you would add actual filtering logic
  };

  // Add button animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimateButton(true);
      setTimeout(() => setAnimateButton(false), 1000);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Calculate days left for each exam
  const calculateDaysLeft = (dateString) => {
    const examDate = new Date(dateString);
    const today = new Date();
    const diffTime = examDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-6"
        >
          <h1 className="text-3xl font-bold text-gray-800">Upcoming Exams</h1>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2 rounded-full ${filterActive ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={handleFilterClick}
            >
              <Calendar size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={animateButton ? { scale: [1, 1.2, 1] } : {}}
              className="bg-indigo-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-md"
              onClick={() => setShowModal(true)}
            >
              <Plus size={20} />
              <span className="hidden md:inline">Add Exam</span>
            </motion.button>
          </div>
        </motion.div>

        <AnimatePresence>
          {exams.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-xl shadow-md p-8 text-center"
            >
              <Award size={48} className="mx-auto mb-4 text-gray-400" />
              <h2 className="text-xl font-semibold text-gray-700 mb-2">No Exams Scheduled</h2>
              <p className="text-gray-500 mb-4">Add your first exam to start tracking</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-indigo-500 text-white px-4 py-2 rounded-full inline-flex items-center gap-2"
                onClick={() => setShowModal(true)}
              >
                <Plus size={18} />
                <span>Add Exam</span>
              </motion.button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              <AnimatePresence>
                {exams.map((exam) => (
                  <motion.div
                    key={exam.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className={`rounded-xl shadow-sm border-l-4 bg-white ${exam.color}`}
                  >
                    <motion.div 
                      className="p-4 cursor-pointer"
                      onClick={() => setExpandedExam(expandedExam === exam.id ? null : exam.id)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold text-gray-800">{exam.subject}</h3>
                            <motion.span 
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-0.5 rounded-full"
                            >
                              {calculateDaysLeft(exam.date)} days left
                            </motion.span>
                          </div>
                          <div className="flex items-center gap-4 mt-1 text-gray-600">
                            <div className="flex items-center gap-1">
                              <Calendar size={16} />
                              <span className="text-sm">{formatDate(exam.date)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={16} />
                              <span className="text-sm">{exam.time}</span>
                            </div>
                          </div>
                        </div>
                        <motion.div 
                          animate={{ rotate: expandedExam === exam.id ? 90 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronRight size={20} className="text-gray-500" />
                        </motion.div>
                      </div>
                      
                      <AnimatePresence>
                        {expandedExam === exam.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 pt-4 border-t border-gray-100"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="text-sm text-gray-600 mb-2">
                                  <span className="font-medium">Duration:</span> {exam.duration}
                                </p>
                                <p className="text-sm text-gray-600">
                                  <span className="font-medium">Location:</span> Main Campus, Room 301B
                                </p>
                              </div>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteExam(exam.id);
                                }}
                                className="text-red-500 hover:bg-red-50 p-2 rounded-full"
                              >
                                <Trash2 size={18} />
                              </motion.button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </AnimatePresence>

        {/* Add Exam Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 10 }}
                className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800">Add New Exam</h2>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowModal(false)}
                    className="text-gray-500 hover:text-gray-800 rounded-full p-1"
                  >
                    <X size={20} />
                  </motion.button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <input
                      type="text"
                      placeholder="e.g. Mathematics"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      value={newExam.subject}
                      onChange={(e) => setNewExam({ ...newExam, subject: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-gray-400">
                        <Calendar size={18} />
                      </div>
                      <input
                        type="date"
                        className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        value={newExam.date}
                        onChange={(e) => setNewExam({ ...newExam, date: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-gray-400">
                        <Clock size={18} />
                      </div>
                      <input
                        type="time"
                        className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        value={newExam.time}
                        onChange={(e) => setNewExam({ ...newExam, time: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                    <input
                      type="text"
                      placeholder="e.g. 2h 30min"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      value={newExam.duration}
                      onChange={(e) => setNewExam({ ...newExam, duration: e.target.value })}
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-3 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-indigo-500 text-white rounded-lg font-medium shadow-sm"
                      onClick={handleAddExam}
                    >
                      Save Exam
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}