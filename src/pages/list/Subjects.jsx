import React, { useState, useEffect } from 'react';
import { Plus, X, Book, Search, ChevronRight, BookOpen, Check, Trash2, Edit, Award, Calculator, Globe, Microscope, FlaskRound as Flask, Binary, Atom, Map, PenTool } from 'lucide-react';

export default function SubjectsListPage() {
  const [subjects, setSubjects] = useState([
    { name: 'Mathematics', icon: 'Calculator', color: 'bg-blue-100 text-blue-600' },
    { name: 'English', icon: 'BookOpen', color: 'bg-green-100 text-green-600' },
    { name: 'History', icon: 'Book', color: 'bg-amber-100 text-amber-600' },
    { name: 'Biology', icon: 'Microscope', color: 'bg-emerald-100 text-emerald-600' },
    { name: 'Chemistry', icon: 'Flask', color: 'bg-purple-100 text-purple-600' },
    { name: 'Computer Science', icon: 'Binary', color: 'bg-indigo-100 text-indigo-600' },
    { name: 'Physics', icon: 'Atom', color: 'bg-red-100 text-red-600' },
    { name: 'Geography', icon: 'Map', color: 'bg-teal-100 text-teal-600' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newSubject, setNewSubject] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('Book');
  const [selectedColor, setSelectedColor] = useState('bg-blue-100 text-blue-600');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const iconComponents = {
    Book, BookOpen, Calculator, Globe, Microscope, 
    Flask, Binary, Atom, Map, PenTool, Award
  };

  const colorOptions = [
    'bg-blue-100 text-blue-600',
    'bg-green-100 text-green-600',
    'bg-amber-100 text-amber-600',
    'bg-emerald-100 text-emerald-600',
    'bg-purple-100 text-purple-600',
    'bg-indigo-100 text-indigo-600',
    'bg-red-100 text-red-600',
    'bg-teal-100 text-teal-600',
    'bg-pink-100 text-pink-600',
  ];

  const handleAddSubject = () => {
    if (newSubject.trim()) {
      setSubjects([...subjects, { 
        name: newSubject, 
        icon: selectedIcon,
        color: selectedColor 
      }]);
      setNewSubject('');
      setSelectedIcon('Book');
      setShowModal(false);
    }
  };

  const confirmDelete = (index) => {
    if (deleteConfirm === index) {
      const newSubjects = [...subjects];
      newSubjects.splice(index, 1);
      setSubjects(newSubjects);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(index);
      setTimeout(() => setDeleteConfirm(null), 2000);
    }
  };

  const filteredSubjects = subjects.filter(subject => 
    subject.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const IconComponent = ({ iconName, size = 24 }) => {
    const Icon = iconComponents[iconName] || Book;
    return <Icon size={size} />;
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
              Subjects
              <div className={`h-1 w-20 bg-blue-500 mt-2 rounded-full transform transition-all duration-300 ${isLoaded ? 'scale-x-100' : 'scale-x-0'}`}></div>
            </h1>
            <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} transition-all duration-500 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              Manage your educational subjects
            </p>
          </div>
          
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className={`relative flex-grow sm:max-w-xs transition-all duration-500 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <input
                type="text"
                placeholder="Search subjects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 pr-4 py-2 rounded-lg w-full border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
              />
              <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
            </div>
            
            {/* <button
              className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} transition-all duration-300`}
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              {isDarkMode ? '🌞' : '🌙'}
            </button>
             */}
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm hover:shadow transition-all duration-300 transform hover:scale-105"
              onClick={() => setShowModal(true)}
            >
              <Plus size={20} />
              <span className="hidden sm:inline">Add Subject</span>
            </button>
          </div>
        </div>

        {filteredSubjects.length === 0 ? (
          <div className={`text-center py-16 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} animate-fadeIn`}>
            <Book size={48} className="mx-auto mb-4 opacity-40" />
            <p className="text-xl font-medium">No subjects found</p>
            <p className="mt-2">Try adjusting your search or add a new subject</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredSubjects.map((subject, index) => (
              <div
                key={index}
                className={`relative rounded-xl overflow-hidden group transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${
                  isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                } ${isDarkMode ? 'bg-gray-800 shadow-gray-800/30' : 'bg-white shadow-sm'}`}
                style={{ 
                  transitionDelay: `${index * 50}ms`,
                  animationDelay: `${index * 50}ms` 
                }}
              >
                <div className={`absolute inset-x-0 top-0 h-1 ${subject.color.split(' ')[0]}`}></div>
                
                <div className="p-6">
                  <div className={`w-16 h-16 ${subject.color} rounded-lg flex items-center justify-center mb-4 mx-auto transition-transform duration-300 group-hover:scale-110`}>
                    <IconComponent iconName={subject.icon} />
                  </div>
                  
                  <div className={`text-lg font-semibold text-center mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    {subject.name}
                  </div>
                  
                  <div className="flex justify-center mt-4 space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button 
                      className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
                      onClick={() => confirmDelete(index)}
                    >
                      {deleteConfirm === index ? (
                        <Check size={16} className="text-red-500" />
                      ) : (
                        <Trash2 size={16} className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      )}
                    </button>
                    <button 
                      className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
                    >
                      <Edit size={16} className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    </button>
                  </div>
                </div>
                
                <div 
                  className={`w-full py-3 px-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} flex justify-between items-center cursor-pointer group-hover:bg-blue-50 transition-colors duration-300 ${isDarkMode && 'group-hover:bg-blue-900'}`}
                >
                  <span className="text-sm font-medium">View Details</span>
                  <ChevronRight size={16} className="text-gray-400 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Subject Modal */}
      {showModal && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 animate-fadeIn"
            onClick={() => setShowModal(false)}
          ></div>
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div 
              className={`bg-white rounded-xl shadow-xl w-full max-w-md animate-scaleIn ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-5 border-b border-gray-200">
                <h2 className="text-xl font-bold">Add New Subject</h2>
                <button 
                  className="p-1 rounded-full hover:bg-gray-100"
                  onClick={() => setShowModal(false)}
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-5">
                <label className="block mb-2 text-sm font-medium">Subject Name</label>
                <input
                  type="text"
                  className={`w-full border p-3 rounded-lg mb-4 ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                      : 'border-gray-300 focus:border-blue-500'
                  } focus:ring focus:ring-blue-200 transition-all`}
                  placeholder="Enter subject name"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  autoFocus
                />
                
                <label className="block mb-2 text-sm font-medium">Choose Icon</label>
                <div className="grid grid-cols-6 gap-2 mb-4">
                  {Object.keys(iconComponents).map((iconName) => (
                    <button
                      key={iconName}
                      className={`p-3 rounded-lg flex items-center justify-center transition-all ${
                        selectedIcon === iconName 
                          ? 'bg-blue-100 text-blue-600 ring-2 ring-blue-500' 
                          : isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                      onClick={() => setSelectedIcon(iconName)}
                    >
                      <IconComponent iconName={iconName} size={20} />
                    </button>
                  ))}
                </div>
                
                <label className="block mb-2 text-sm font-medium">Choose Color</label>
                <div className="grid grid-cols-6 gap-2 mb-6">
                  {colorOptions.map((color) => {
                    const [bgColor, textColor] = color.split(' ');
                    return (
                      <button
                        key={color}
                        className={`h-10 rounded-lg transition-all ${bgColor} ${textColor} ${
                          selectedColor === color ? 'ring-2 ring-blue-500 scale-110' : ''
                        }`}
                        onClick={() => setSelectedColor(color)}
                      ></button>
                    );
                  })}
                </div>
              </div>
              
              <div className="flex justify-end gap-3 p-5 border-t border-gray-200">
                <button
                  className={`px-4 py-2 rounded-lg transition-all ${
                    isDarkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                  }`}
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className={`px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-all ${
                    !newSubject.trim() ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  onClick={handleAddSubject}
                  disabled={!newSubject.trim()}
                >
                  <Plus size={18} />
                  Add Subject
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}