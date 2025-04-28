import React from 'react';
import { Trash2, Check, Edit, ChevronRight } from 'lucide-react';
import IconComponent from './IconComponent';

export default function SubjectCard({ subject, index, isLoaded, isDarkMode, confirmDelete, deleteConfirm }) {
  return (
    <div
      className={`relative rounded-xl overflow-hidden group transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${
        isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      } ${isDarkMode ? 'bg-gray-800 shadow-gray-800/30' : 'bg-white shadow-sm'}`}
      style={{ transitionDelay: `${index * 50}ms` }}
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
          <button className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`} onClick={() => confirmDelete(index)}>
            {deleteConfirm === index ? <Check size={16} className="text-red-500" /> : <Trash2 size={16} />}
          </button>
          <button className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}>
            <Edit size={16} />
          </button>
        </div>
      </div>
      <div className={`w-full py-3 px-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} flex justify-between items-center group-hover:bg-blue-50 transition-colors`}>
        <span className="text-sm font-medium">View Details</span>
        <ChevronRight size={16} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
}
