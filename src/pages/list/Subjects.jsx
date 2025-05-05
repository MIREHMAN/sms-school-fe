import React, { useState, useEffect } from 'react';
import TableSearch from '@/components/TableSearch';
import SubjectCard from '@/components/SubjectPage/Components/SubjectCard';
import AddSubjectModal from '@/components/SubjectPage/Components/AddSubjectModal';
import { iconComponents, colorOptions } from '@/components/SubjectPage/Utils/subjectUtils'
import { Book } from 'lucide-react';
import IconComponent from '@/components/SubjectPage/Components/IconComponent';

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

  const handleAddSubject = () => {
    if (newSubject.trim()) {
      setSubjects([...subjects, { name: newSubject, icon: selectedIcon, color: selectedColor }]);
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

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">

        {/* Top Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
              Subjects
              {/* <div className={`h-1 w-32 bg-purple-500 mt-2 rounded-full transform transition-all duration-700 ${isLoaded ? 'scale-x-100' : 'scale-x-0'}`}></div> */}
            </h1>
            <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} transition-all duration-500 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              Manage your educational subjects
            </p>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            <TableSearch />
            <button
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-sm hover:shadow transition-all duration-300 transform hover:scale-105"
              onClick={() => setShowModal(true)}
            >
              Add Subject
            </button>
          </div>
        </div>

        {/* Subject Cards */}
        {filteredSubjects.length === 0 ? (
          <div className="text-center py-16 animate-fadeIn">
            <Book size={48} className="mx-auto mb-4 opacity-40" />
            <p className="text-xl font-medium">No subjects found</p>
            <p className="mt-2">Try adjusting your search or add a new subject</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredSubjects.map((subject, index) => (
              <SubjectCard
                key={index}
                subject={subject}
                index={index}
                isLoaded={isLoaded}
                isDarkMode={isDarkMode}
                confirmDelete={confirmDelete}
                deleteConfirm={deleteConfirm}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add Subject Modal */}
      {showModal && (
        <AddSubjectModal
          newSubject={newSubject}
          setNewSubject={setNewSubject}
          selectedIcon={selectedIcon}
          setSelectedIcon={setSelectedIcon}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          handleAddSubject={handleAddSubject}
          setShowModal={setShowModal}
          isDarkMode={isDarkMode}
          iconComponents={iconComponents}
          colorOptions={colorOptions}
        />
      )}
    </div>
  );
}
