import React, { useState, useEffect } from 'react';
import { 
  Bookmark, 
  Calendar, 
  BookOpen, 
  CheckCircle, 
  Clock, 
  Filter, 
  Plus, 
  X, 
  ChevronDown, 
  ChevronUp,
  AlertCircle,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState([
    { 
      id: 1,
      title: 'Algebra Worksheet', 
      subject: 'Math', 
      dueDate: '2024-05-10', 
      status: 'Pending',
      priority: 'High',
      description: 'Complete exercises 1-20 on quadratic equations',
      color: 'border-blue-400'
    },
    { 
      id: 2,
      title: 'World War II Essay', 
      subject: 'History', 
      dueDate: '2024-05-15', 
      status: 'Pending',
      priority: 'Medium',
      description: 'Write a 1500-word essay on the causes of World War II',
      color: 'border-yellow-400'
    },
    { 
      id: 3,
      title: 'Lab Report', 
      subject: 'Science', 
      dueDate: '2024-05-20', 
      status: 'Pending',
      priority: 'Medium',
      description: 'Document the results from our photosynthesis experiment',
      color: 'border-green-400'
    },
    { 
      id: 4,
      title: 'Book Summary', 
      subject: 'English', 
      dueDate: '2024-05-25', 
      status: 'Completed',
      priority: 'Low',
      description: 'Write a 2-page summary of "To Kill a Mockingbird"',
      color: 'border-purple-400'
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    id: 0,
    title: '',
    subject: '',
    dueDate: '',
    status: 'Pending',
    priority: 'Medium',
    description: '',
    color: ''
  });

  const [animateButton, setAnimateButton] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);
  const [filters, setFilters] = useState({
    status: 'All',
    subject: 'All',
    priority: 'All'
  });

  // Subject colors
  const subjectColors = {
    'Math': 'border-blue-400',
    'History': 'border-yellow-400',
    'Science': 'border-green-400',
    'English': 'border-purple-400',
    'Art': 'border-pink-400',
    'Physical Education': 'border-red-400',
    'Music': 'border-indigo-400',
    'Computer Science': 'border-cyan-400',
  };

  const subjects = Object.keys(subjectColors);
  
  const priorities = ['High', 'Medium', 'Low'];

  const handleAddAssignment = () => {
    if (newAssignment.title && newAssignment.subject && newAssignment.dueDate) {
      const color = subjectColors[newAssignment.subject] || 'border-gray-400';
      const newId = Math.max(0, ...assignments.map(a => a.id)) + 1;
      
      setAssignments([...assignments, { 
        ...newAssignment, 
        id: newId,
        color 
      }]);
      
      setNewAssignment({
        id: 0,
        title: '',
        subject: '',
        dueDate: '',
        status: 'Pending',
        priority: 'Medium',
        description: '',
        color: ''
      });
      setShowModal(false);
    }
  };

  const toggleStatus = (id) => {
    setAssignments(assignments.map(assignment => {
      if (assignment.id === id) {
        return {
          ...assignment,
          status: assignment.status === 'Completed' ? 'Pending' : 'Completed'
        };
      }
      return assignment;
    }));
  };

  const deleteAssignment = (id) => {
    setAssignments(assignments.filter(assignment => assignment.id !== id));
    if (expandedCard === id) {
      setExpandedCard(null);
    }
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const calculateDaysLeft = (dateString) => {
    const dueDate = new Date(dateString);
    const today = new Date();
    
    // Reset time component for accurate day calculation
    dueDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  // Button animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimateButton(true);
      setTimeout(() => setAnimateButton(false), 1000);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const filteredAssignments = assignments.filter(assignment => {
    return (filters.status === 'All' || assignment.status === filters.status) &&
           (filters.subject === 'All' || assignment.subject === filters.subject) &&
           (filters.priority === 'All' || assignment.priority === filters.priority);
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-6"
        >
          <h1 className="text-3xl font-bold text-gray-800">Assignments</h1>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2 rounded-full ${filterOpen ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <Filter size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={animateButton ? { scale: [1, 1.2, 1] } : {}}
              className="bg-indigo-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-md"
              onClick={() => setShowModal(true)}
            >
              <Plus size={20} />
              <span className="hidden md:inline">Add Assignment</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Filters */}
        <AnimatePresence>
          {filterOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-xl shadow-md mb-6 overflow-hidden"
            >
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select 
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      value={filters.status}
                      onChange={(e) => setFilters({...filters, status: e.target.value})}
                    >
                      <option value="All">All Status</option>
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <select 
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      value={filters.subject}
                      onChange={(e) => setFilters({...filters, subject: e.target.value})}
                    >
                      <option value="All">All Subjects</option>
                      {subjects.map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select 
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      value={filters.priority}
                      onChange={(e) => setFilters({...filters, priority: e.target.value})}
                    >
                      <option value="All">All Priorities</option>
                      {priorities.map(priority => (
                        <option key={priority} value={priority}>{priority}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Assignment List */}
        <AnimatePresence>
          {filteredAssignments.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-xl shadow-md p-8 text-center"
            >
              <BookOpen size={48} className="mx-auto mb-4 text-gray-400" />
              <h2 className="text-xl font-semibold text-gray-700 mb-2">No Assignments Found</h2>
              <p className="text-gray-500 mb-4">
                {assignments.length === 0 
                  ? "Add your first assignment to get started" 
                  : "Try changing your filters to see more assignments"}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-indigo-500 text-white px-4 py-2 rounded-full inline-flex items-center gap-2"
                onClick={() => setShowModal(true)}
              >
                <Plus size={18} />
                <span>Add Assignment</span>
              </motion.button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              <AnimatePresence>
                {filteredAssignments.map((assignment) => {
                  const daysLeft = calculateDaysLeft(assignment.dueDate);
                  let urgencyColor = "text-gray-600";
                  if (assignment.status !== 'Completed') {
                    if (daysLeft < 0) urgencyColor = "text-red-600";
                    else if (daysLeft === 0) urgencyColor = "text-orange-600";
                    else if (daysLeft <= 2) urgencyColor = "text-yellow-600";
                  }
                  
                  return (
                    <motion.div
                      key={assignment.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                      className={`bg-white rounded-xl shadow-sm border-l-4 ${assignment.color}`}
                    >
                      <motion.div className="p-4">
                        <div className="flex items-start justify-between">
                          <div 
                            className="flex-1 cursor-pointer"
                            onClick={() => setExpandedCard(expandedCard === assignment.id ? null : assignment.id)}
                          >
                            <div className="flex items-center gap-2">
                              <h3 className={`text-lg font-semibold ${assignment.status === 'Completed' ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                                {assignment.title}
                              </h3>
                              {assignment.priority === 'High' && (
                                <motion.span 
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full"
                                >
                                  High Priority
                                </motion.span>
                              )}
                            </div>
                            
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <BookOpen size={14} />
                                <span>{assignment.subject}</span>
                              </div>
                              <div className={`flex items-center gap-1 ${urgencyColor}`}>
                                <Calendar size={14} />
                                <span>
                                  {formatDate(assignment.dueDate)}
                                  {assignment.status !== 'Completed' && (
                                    <>
                                      {daysLeft < 0 ? ' (Overdue)' : 
                                       daysLeft === 0 ? ' (Today)' : 
                                       ` (${daysLeft} days left)`}
                                    </>
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => toggleStatus(assignment.id)}
                              className={`p-2 rounded-full transition-colors ${
                                assignment.status === 'Completed' 
                                  ? 'bg-green-100 text-green-600' 
                                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                              }`}
                            >
                              <CheckCircle size={18} />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setExpandedCard(expandedCard === assignment.id ? null : assignment.id)}
                              className="p-2 text-gray-500 hover:text-gray-700"
                            >
                              {expandedCard === assignment.id ? (
                                <ChevronUp size={18} />
                              ) : (
                                <ChevronDown size={18} />
                              )}
                            </motion.button>
                          </div>
                        </div>
                        
                        <AnimatePresence>
                          {expandedCard === assignment.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-4 pt-4 border-t border-gray-100"
                            >
                              <div className="text-gray-700 mb-3">
                                <p className="font-medium mb-1">Description:</p>
                                <p className="text-sm">{assignment.description || "No description provided."}</p>
                              </div>
                              
                              <div className="flex justify-between items-center">
                                <div className="flex gap-1 items-center">
                                  <span className="text-sm text-gray-500">Priority:</span>
                                  <span className={`text-sm font-medium ${
                                    assignment.priority === 'High' ? 'text-red-600' :
                                    assignment.priority === 'Medium' ? 'text-yellow-600' :
                                    'text-green-600'
                                  }`}>
                                    {assignment.priority}
                                  </span>
                                </div>
                                
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => deleteAssignment(assignment.id)}
                                  className="text-red-500 hover:bg-red-50 p-1 rounded text-sm"
                                >
                                  Delete
                                </motion.button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </AnimatePresence>

        {/* Add Assignment Modal */}
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
                  <h2 className="text-xl font-bold text-gray-800">Add New Assignment</h2>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      placeholder="Assignment title"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      value={newAssignment.title}
                      onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <select
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      value={newAssignment.subject}
                      onChange={(e) => setNewAssignment({ ...newAssignment, subject: e.target.value })}
                    >
                      <option value="">Select a subject</option>
                      {subjects.map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-gray-400">
                        <Calendar size={18} />
                      </div>
                      <input
                        type="date"
                        className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        value={newAssignment.dueDate}
                        onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <div className="flex gap-2">
                      {priorities.map(priority => (
                        <motion.button
                          key={priority}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`flex-1 p-2 rounded-lg border ${
                            newAssignment.priority === priority 
                              ? 'bg-indigo-50 border-indigo-500 text-indigo-700' 
                              : 'border-gray-300 text-gray-700'
                          }`}
                          onClick={() => setNewAssignment({ ...newAssignment, priority })}
                        >
                          {priority === 'High' && <AlertCircle size={16} className="inline mr-1 text-red-500" />}
                          {priority === 'Medium' && <Clock size={16} className="inline mr-1 text-yellow-500" />}
                          {priority === 'Low' && <Bookmark size={16} className="inline mr-1 text-green-500" />}
                          {priority}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                    <textarea
                      placeholder="Enter assignment details"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all min-h-20"
                      value={newAssignment.description}
                      onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
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
                      onClick={handleAddAssignment}
                    >
                      Save Assignment
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