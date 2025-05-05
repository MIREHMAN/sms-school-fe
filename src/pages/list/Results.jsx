import React, { useState } from 'react';
import { 
  PlusCircle, 
  Search, 
  ChevronDown, 
  Download, 
  MoreHorizontal,
  X,
  Check,
  ArrowUpDown,
  User,
  GraduationCap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const resultsData = [
  { id: 1, student: 'Ayesha Khan', grade: '10', subject: 'Math', marks: 92, total: 100, status: 'Pass' },
  { id: 2, student: 'Ali Raza', grade: '9', subject: 'English', marks: 55, total: 100, status: 'Pass' },
  { id: 3, student: 'Zainab Tariq', grade: '8', subject: 'Science', marks: 44, total: 100, status: 'Fail' },
  { id: 4, student: 'Hassan Ahmed', grade: '10', subject: 'Computer', marks: 78, total: 100, status: 'Pass' },
];

const StatusBadge = ({ status }) => {
  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
        status === 'Pass' 
          ? 'bg-green-100 text-green-800 border border-green-300' 
          : 'bg-red-100 text-red-800 border border-red-300'
      }`}
    >
      {status === 'Pass' ? (
        <Check className="w-4 h-4 mr-1" />
      ) : (
        <X className="w-4 h-4 mr-1" />
      )}
      {status}
    </motion.span>
  );
};

const GradeDisplay = ({ grade }) => {
  return (
    <span className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 rounded-md border border-blue-200">
      <GraduationCap className="w-3 h-3 mr-1" />
      Grade {grade}
    </span>
  );
};

export default function ModernResultsPage() {
  const [results, setResults] = useState(resultsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [selectedResult, setSelectedResult] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    
    const sortedResults = [...results].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    
    setResults(sortedResults);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <ArrowUpDown className="w-4 h-4 ml-1 text-gray-400" />;
    }
    
    return sortConfig.direction === 'ascending' ? (
      <ChevronDown className="w-4 h-4 ml-1 text-blue-500" />
    ) : (
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 180 }}
        transition={{ duration: 0.3 }}
      >
        <ChevronDown className="w-4 h-4 ml-1 text-blue-500" />
      </motion.div>
    );
  };

  const filteredResults = results.filter(result => 
    result.student.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getScoreColor = (marks) => {
    if (marks >= 80) return 'text-green-600';
    if (marks >= 60) return 'text-blue-600';
    if (marks >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-8xl mx-auto p-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-sm p-6 mb-6"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Student Results</h1>
              <p className="text-gray-500 mt-1">View and manage student performance data</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search students..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-full md:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm flex items-center transition-all duration-200"
                onClick={() => setIsModalOpen(true)}
              >
                <PlusCircle className="w-5 h-5 mr-2" />
                Add Result
              </motion.button>
              
              <motion.button 
              
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-3 py-2 rounded-lg shadow-sm flex items-center transition-all duration-200"
              >
                <a href='/reult.pdf'download><Download className="w-5 h-5" /></a>
              </motion.button>

            </div>
          </div>
          
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('student')}
                  >
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2 text-gray-400" />
                      Student Name
                      {getSortIcon('student')}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center">
                      <GraduationCap className="w-4 h-4 mr-2 text-gray-400" />
                      Grade
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('marks')}
                  >
                    <div className="flex items-center">
                      Marks
                      {getSortIcon('marks')}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <AnimatePresence>
                  {filteredResults.length > 0 ? (
                    filteredResults.map((result) => (
                      <motion.tr 
                        key={result.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        whileHover={{ backgroundColor: '#f9fafb' }}
                        className="hover:bg-gray-50 transition-colors duration-150 ease-in-out"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 font-medium">{result.student.charAt(0)}</span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{result.student}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <GradeDisplay grade={result.grade} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                            <motion.div 
                              className={`h-2.5 rounded-full ${result.status === 'Pass' ? 'bg-blue-600' : 'bg-red-500'}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${(result.marks / result.total) * 100}%` }}
                              transition={{ duration: 1, delay: 0.2 }}
                            ></motion.div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className={`text-sm font-medium ${getScoreColor(result.marks)}`}>
                              {result.marks}
                            </span>
                            <span className="text-xs text-gray-500">
                              out of {result.total}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={result.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button 
                            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                            onClick={() => setSelectedResult(result)}
                          >
                            <MoreHorizontal className="w-5 h-5" />
                          </button>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center">
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-gray-500"
                        >
                          <Search className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                          <p className="text-lg font-medium">No results found</p>
                          <p className="text-sm text-gray-400">Try adjusting your search terms</p>
                        </motion.div>
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
      
      {/* Add Result Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden"
            >
              <div className="flex justify-between items-center border-b p-4">
                <h3 className="text-lg font-medium text-gray-900">Add New Result</h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-4 space-y-4">
                <div>
                  <label htmlFor="student" className="block text-sm font-medium text-gray-700 mb-1">
                    Student Name
                  </label>
                  <input
                    type="text"
                    id="student"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter student name"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
                      Grade
                    </label>
                    <input
                      type="text"
                      id="grade"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="e.g. 10"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="total" className="block text-sm font-medium text-gray-700 mb-1">
                      Total
                    </label>
                    <input
                      type="number"
                      id="total"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="100"
                      defaultValue="100"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="marks" className="block text-sm font-medium text-gray-700 mb-1">
                    Marks
                  </label>
                  <input
                    type="number"
                    id="marks"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="0"
                  />
                </div>
              </div>
              
              <div className="bg-gray-50 px-4 py-3 flex justify-end gap-3 border-t">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none"
                >
                  Save Result
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Student Details Popup */}
      <AnimatePresence>
        {selectedResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedResult(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-600 text-2xl font-medium">{selectedResult.student.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{selectedResult.student}</h3>
                    <p className="text-gray-500">Grade {selectedResult.grade}</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">Performance</p>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <motion.div 
                        className={`h-3 rounded-full ${selectedResult.status === 'Pass' ? 'bg-blue-600' : 'bg-red-500'}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${(selectedResult.marks / selectedResult.total) * 100}%` }}
                        transition={{ duration: 1 }}
                      ></motion.div>
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className={`text-lg font-bold ${getScoreColor(selectedResult.marks)}`}>
                        {selectedResult.marks}/{selectedResult.total}
                      </span>
                      <span className="text-sm font-medium">
                        {Math.round((selectedResult.marks / selectedResult.total) * 100)}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Status</p>
                      <StatusBadge status={selectedResult.status} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Grade</p>
                      <GradeDisplay grade={selectedResult.grade} />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none flex items-center"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Edit Result
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}