import React, { useEffect, useState } from 'react';
import TableSearch from '@/components/TableSearch';
import FilterButton from '@/components/FilterButton';
import { Link } from 'react-router-dom';
import AddSubjectModal from '@/components/modals/AddSubjectModal';
import { SubjectService } from '@/services/SubjectService';
import { useAsync } from '@/hooks/useAsync';
import { Trash2, Edit, ChevronRight } from 'lucide-react';
import { useUser } from '@/context/UserContext';

export default function SubjectsListPage() {
  const [subjects, setSubjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useUser();

  const { loading, value: fetchedSubjects } = useAsync(() =>
    SubjectService.getAllSubjects()
  );

  useEffect(() => {
    if (fetchedSubjects && Array.isArray(fetchedSubjects.results)) {
      setSubjects(fetchedSubjects.results);
    }
  }, [fetchedSubjects]);

  const filteredSubjects = subjects.filter((subject) =>
    subject.subject_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteSubject = (index) => {
    console.log("Delete subject at index", index);
  };

  const handleEditSubject = (index) => {
    console.log("Edit subject at index", index);
  };

  return (
    <div className="bg-white p-6 rounded-md m-4 mt-0 flex-1">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-lg font-bold text-gray-800">Subjects</h1>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <TableSearch value={searchTerm} onChange={setSearchTerm} />
            <FilterButton />
            <button
              onClick={() => setOpen(true)}
              className="bg-purple-500 text-white px-4 py-2 rounded-full text-sm shadow-sm"
            >
              Add Subject
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16 text-gray-500">Loading subjects...</div>
        ) : filteredSubjects.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p className="text-xl font-medium">No subjects found</p>
            <p className="mt-2">Try adjusting your search or add a new subject.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredSubjects.map((subject, index) => (
              <div
                key={subject.id || index}
                className="relative rounded-xl overflow-hidden group bg-white hover:shadow-lg"
              >
                <div className={`absolute inset-x-0 top-0 h-1 ${subject.color?.split(' ')[0] || 'bg-blue-500'}`} />
                <div className="p-6">
                  <div className={`w-16 h-16 ${subject.color || 'bg-blue-100'} rounded-lg flex items-center justify-center mb-4 mx-auto`}>
                    {/* Icon removed */}
                    <span className="text-gray-700 font-semibold text-xl">
                      {subject.subject_name.charAt(0)}
                    </span>
                  </div>
                  <div className="text-lg font-semibold text-center mb-2 text-gray-800">
                    {subject.subject_name}
                  </div>

                  {user?.role === 'admin' && (
                    <div className="flex justify-center mt-4 space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
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

                <Link to={`/subjects/${subject.subject_name.toLowerCase().replace(/\s+/g, '-')}`}>
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

      {/* Add Subject Modal */}
      <AddSubjectModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
