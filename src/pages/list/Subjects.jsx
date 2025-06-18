import React, { useEffect, useState } from 'react';
import {
  Plus, X, Book, ChevronRight, BookOpen, Check,
  Trash2, Edit, Award, Calculator, Globe,
  Microscope, FlaskRound as Flask, Binary, Atom, Map, PenTool
} from 'lucide-react';
import TableSearch from '@/components/TableSearch';
import FilterButton from '@/components/FilterButton';
import { useUser } from '@/context/UserContext';
import { Link } from 'react-router-dom';

export default function SubjectsListPage() {
  const { user } = useUser();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newSubject, setNewSubject] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('Book');
  const [selectedColor, setSelectedColor] = useState('bg-blue-100 text-blue-600');
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [subjectToDelete, setSubjectToDelete] = useState(null);

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

  useEffect(() => {
    // Simulated API call
    const fetchSubjects = async () => {
      setLoading(true);
      try {
        const mockData = [
          { name: 'Mathematics', icon: 'Calculator', color: 'bg-blue-100 text-blue-600' },
          { name: 'English', icon: 'BookOpen', color: 'bg-green-100 text-green-600' },
          { name: 'History', icon: 'Book', color: 'bg-amber-100 text-amber-600' },
          { name: 'Biology', icon: 'Microscope', color: 'bg-emerald-100 text-emerald-600' },
          { name: 'Chemistry', icon: 'Flask', color: 'bg-purple-100 text-purple-600' },
          { name: 'Computer Science', icon: 'Binary', color: 'bg-indigo-100 text-indigo-600' },
          { name: 'Physics', icon: 'Atom', color: 'bg-red-100 text-red-600' },
          { name: 'Geography', icon: 'Map', color: 'bg-teal-100 text-teal-600' },
        ];
        await new Promise((res) => setTimeout(res, 500)); // Simulate delay
        setSubjects(mockData);
      } catch (err) {
        console.error('Failed to fetch subjects', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  const handleAddSubject = () => {
    if (newSubject.trim()) {
      if (editingIndex !== null) {
        // Update existing subject
        const updatedSubjects = [...subjects];
        updatedSubjects[editingIndex] = {
          name: newSubject,
          icon: selectedIcon,
          color: selectedColor,
        };
        setSubjects(updatedSubjects);
        setEditingIndex(null);
      } else {
        // Add new subject
        setSubjects(prev => [
          ...prev,
          {
            name: newSubject,
            icon: selectedIcon,
            color: selectedColor,
          },
        ]);
      }
      resetForm();
      setShowModal(false);
    }
  };

  const handleEditSubject = (index) => {
    const subject = subjects[index];
    setNewSubject(subject.name);
    setSelectedIcon(subject.icon);
    setSelectedColor(subject.color);
    setEditingIndex(index);
    setShowModal(true);
  };

  const handleDeleteSubject = (index) => {
    setSubjectToDelete(index);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (subjectToDelete !== null) {
      const updated = [...subjects];
      updated.splice(subjectToDelete, 1);
      setSubjects(updated);
      setIsDeleteModalOpen(false);
      setSubjectToDelete(null);
    }
  };

  const resetForm = () => {
    setNewSubject('');
    setSelectedIcon('Book');
    setSelectedColor('bg-blue-100 text-blue-600');
  };

  const filteredSubjects = subjects.filter(subject =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const IconComponent = ({ iconName, size = 24 }) => {
    const Icon = iconComponents[iconName] || Book;
    return <Icon size={size} />;
  };

  return (
    <div className="bg-white p-6 rounded-md flex-1 m-4 mt-0">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="hidden md:block text-lg font-bold text-gray-800">Subjects</h1>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            <TableSearch value={searchTerm} onChange={setSearchTerm} />
            <FilterButton />
            <button
              className="bg-purple-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-sm"
              onClick={() => {
                resetForm();
                setEditingIndex(null);
                setShowModal(true);
              }}
            >
              <Plus size={19} className="lg:hidden" />
              <span className="hidden sm:inline text-sm">Add Subject</span>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16 text-gray-500">Loading subjects...</div>
        ) : filteredSubjects.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <Book size={48} className="mx-auto mb-4 opacity-40" />
            <p className="text-xl font-medium">No subjects found</p>
            <p className="mt-2">Try adjusting your search or add a new subject</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredSubjects.map((subject, index) => (
              <div key={index} className="relative rounded-xl overflow-hidden group bg-white hover:shadow-lg">
                <div className={`absolute inset-x-0 top-0 h-1 ${subject.color.split(' ')[0]}`} />
                <div className="p-6">
                  <div className={`w-16 h-16 ${subject.color} rounded-lg flex items-center justify-center mb-4 mx-auto`}>
                    <IconComponent iconName={subject.icon} />
                  </div>
                  <div className="text-lg font-semibold text-center mb-2 text-gray-800">
                    {subject.name}
                  </div>

                  {user?.role === "admin" && (
                    <div className="flex justify-center mt-4 space-x-2 opacity-0 group-hover:opacity-100">
                      <button
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                        onClick={() => handleDeleteSubject(index)}
                      >
                        <Trash2 size={16} className="text-gray-500" />
                      </button>
                      <button 
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                        onClick={() => handleEditSubject(index)}
                      >
                        <Edit size={16} className="text-gray-500" />
                      </button>
                    </div>
                  )}
                </div>
                <Link to={`/subjects/`}> 
                  <div className="w-full py-3 px-4 bg-gray-50 flex justify-between items-center cursor-pointer hover:bg-blue-50">
                    <span className="text-sm font-medium">View Details</span>
                    <ChevronRight size={16} className="text-blue-500" />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Subject Modal */}
      {showModal && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setShowModal(false)} />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center p-5 border-b border-gray-200">
                <h2 className="text-xl font-bold">
                  {editingIndex !== null ? 'Edit Subject' : 'Add New Subject'}
                </h2>
                <button className="p-1 rounded-full hover:bg-gray-100" onClick={() => setShowModal(false)}>
                  <X size={20} />
                </button>
              </div>

              <div className="p-5">
                <label className="block mb-2 text-sm font-medium">Subject Name</label>
                <input
                  type="text"
                  className="outline-none w-full border p-3 rounded-lg mb-4 border-gray-300 focus:border-purple-500"
                  placeholder="Enter subject name"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                />

                <label className="block mb-2 text-sm font-medium">Choose Icon</label>
                <div className="grid grid-cols-6 gap-2 mb-4">
                  {Object.keys(iconComponents).map((iconName) => (
                    <button
                      key={iconName}
                      className={`p-3 rounded-full flex items-center justify-center ${selectedIcon === iconName
                          ? 'bg-blue-100 text-blue-600 ring-2 ring-blue-500'
                          : 'bg-gray-100 hover:bg-gray-200'
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
                        className={`h-10 rounded-lg ${bgColor} ${textColor} ${selectedColor === color ? 'ring-2 ring-blue-500' : ''
                          }`}
                        onClick={() => setSelectedColor(color)}
                      ></button>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end gap-3 p-5 border-t border-gray-200">
                <button
                  className="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className={`px-4 py-2 bg-purple-500 text-white rounded-full flex items-center gap-2 hover:bg-purple-600 ${!newSubject.trim() ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  onClick={handleAddSubject}
                  disabled={!newSubject.trim()}
                >
                  {editingIndex !== null ? 'Update Subject' : 'Add Subject'}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsDeleteModalOpen(false)} />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center p-5 border-b border-gray-200">
                <h2 className="text-xl font-bold">Confirm Delete</h2>
                <button className="p-1 rounded-full hover:bg-gray-100" onClick={() => setIsDeleteModalOpen(false)}>
                  <X size={20} />
                </button>
              </div>

              <div className="p-5">
                <p className="text-gray-600">
                  Are you sure you want to delete the subject <span className="font-semibold">
                    {subjectToDelete !== null ? subjects[subjectToDelete]?.name : ''}
                  </span>? This action cannot be undone.
                </p>
              </div>

              <div className="flex justify-end gap-3 p-5 border-t border-gray-200">
                <button
                  className="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800"
                  onClick={() => setIsDeleteModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-full flex items-center gap-2 hover:bg-red-600"
                  onClick={confirmDelete}
                >
                  Delete Subject
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}