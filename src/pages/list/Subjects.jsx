
import React, { useEffect, useState } from 'react';
import {
  Plus, X, Book, ChevronRight, BookOpen, Check,
  Trash2, Edit, Award, Calculator, Globe,
  Microscope, FlaskRound as Flask, Binary, Atom, Map, PenTool
} from 'lucide-react';
import TableSearch from '@/components/TableSearch';
import FilterButton from '@/components/FilterButton';
import { useUser } from '@/context/UserContext';

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
  const [selectedSubject, setSelectedSubject] = useState(null);

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
    const fetchSubjects = async () => {
      setLoading(true);
      try {
        const mockData = [
          { name: 'Mathematics', code: 'MATH-101', grade: 'Grade 9', teacher: 'Mr. Ali (0333-1234567)', icon: 'Calculator', color: 'bg-blue-100 text-blue-600' },
          { name: 'English', code: 'ENG-101', grade: 'Grade 9', teacher: 'Ms. Sara (0345-9876543)', icon: 'BookOpen', color: 'bg-green-100 text-green-600' },
          { name: 'History', code: 'HIS-101', grade: 'Grade 8', teacher: 'Mr. Khan (0301-1122334)', icon: 'Book', color: 'bg-amber-100 text-amber-600' },
          { name: 'Biology', code: 'BIO-101', grade: 'Grade 10', teacher: 'Dr. Asma (0302-2233445)', icon: 'Microscope', color: 'bg-emerald-100 text-emerald-600' },
          { name: 'Chemistry', code: 'CHEM-101', grade: 'Grade 10', teacher: 'Mr. Kamran (0321-5566778)', icon: 'Flask', color: 'bg-purple-100 text-purple-600' },
          { name: 'Computer Science', code: 'CS-101', grade: 'Grade 9', teacher: 'Ms. Noor (0310-1234321)', icon: 'Binary', color: 'bg-indigo-100 text-indigo-600' },
          { name: 'Physics', code: 'PHY-101', grade: 'Grade 10', teacher: 'Sir Usman (0300-9988776)', icon: 'Atom', color: 'bg-red-100 text-red-600' },
          { name: 'Geography', code: 'GEO-101', grade: 'Grade 8', teacher: 'Miss Zoya (0340-4455667)', icon: 'Map', color: 'bg-teal-100 text-teal-600' },
        ];
        await new Promise((res) => setTimeout(res, 500));
        setSubjects(mockData);
      } catch (err) {
        console.error('Failed to fetch subjects', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  const filteredSubjects = subjects.filter(subject =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const IconComponent = ({ iconName, size = 24 }) => {
    const Icon = iconComponents[iconName] || Book;
    return <Icon size={size} />;
  };

  const BasicInfoCard = ({ subject }) => (
    <div className="p-4 border rounded-md shadow bg-white space-y-2">
      <h3 className="text-lg font-bold">Basic Info</h3>
      <p><strong>Name:</strong> {subject.name}</p>
      <p><strong>Code:</strong> {subject.code}</p>
      <p><strong>Class/Grade:</strong> {subject.grade}</p>
      <p><strong>Assigned Teacher:</strong> {subject.teacher}</p>
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-md m-4">
      {/* ...existing header code... */}

      {loading ? (
        <div className="text-center py-16 text-gray-500">Loading subjects...</div>
      ) : filteredSubjects.length === 0 ? (
        <div className="text-center py-16 text-gray-500">No subjects found</div>
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
              </div>
              <button
                className="w-full py-3 px-4 bg-gray-50 flex justify-between items-center hover:bg-blue-50 focus:outline-none"
                onClick={() => setSelectedSubject(subject)}
              >
                <span className="text-sm font-medium">View Details</span>
                <ChevronRight size={16} className="text-blue-500" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Show basic info if subject is selected */}
      {selectedSubject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={() => setSelectedSubject(null)}
            >
              <X size={20} />
            </button>
            <BasicInfoCard subject={selectedSubject} />
          </div>
        </div>
      )}
    </div>
  );
}
