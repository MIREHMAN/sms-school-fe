import React, { useState } from 'react';
import { Users, Calendar, Clock, ChevronDown, Search, PlusCircle, Filter, MoreHorizontal, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

// Mock data
const attendanceData = [
  { name: 'Ayesha Khan', grade: '10', date: '2025-04-30', status: 'Present', avatar: '/api/placeholder/40/40' },
  { name: 'Ali Raza', grade: '9', date: '2025-04-30', status: 'Absent', avatar: '/api/placeholder/40/40' },
  { name: 'Zainab Tariq', grade: '8', date: '2025-04-30', status: 'Present', avatar: '/api/placeholder/40/40' },
  { name: 'Hassan Ahmed', grade: '10', date: '2025-04-30', status: 'Late', avatar: '/api/placeholder/40/40' },
  { name: 'Fatima Shah', grade: '9', date: '2025-04-30', status: 'Present', avatar: '/api/placeholder/40/40' },
  { name: 'Omar Malik', grade: '8', date: '2025-04-30', status: 'Absent', avatar: '/api/placeholder/40/40' },
];

const StatusBadge = ({ status }) => {
  let bgColor = 'bg-gray-100';
  let textColor = 'text-gray-800';
  let borderColor = 'border-gray-300';
  let Icon = null;
  
  if (status === 'Present') {
    bgColor = 'bg-green-100';
    textColor = 'text-green-800';
    borderColor = 'border-green-300';
    Icon = CheckCircle;
  } else if (status === 'Absent') {
    bgColor = 'bg-red-100';
    textColor = 'text-red-800';
    borderColor = 'border-red-300';
    Icon = XCircle;
  } else if (status === 'Late') {
    bgColor = 'bg-yellow-100';
    textColor = 'text-yellow-800';
    borderColor = 'border-yellow-300';
    Icon = AlertCircle;
  }

  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${bgColor} ${textColor} border ${borderColor} transition-all duration-300 hover:shadow-sm`}
    >
      {Icon && <Icon size={14} className="animate-pulse" />}
      {status}
    </span>
  );
};

const AttendanceListPage = () => {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [activeTab, setActiveTab] = useState('today');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-xl shadow-sm">
      {/* Header section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Users className="text-blue-600" size={24} />
          <h1 className="text-2xl font-bold text-gray-800">Attendance Dashboard</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <div className={`relative transition-all duration-300 ${searchFocused ? 'w-64' : 'w-48'}`}>
            <input
              type="text"
              placeholder="Search students..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
          
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
            onClick={() => alert('Mark attendance clicked')}
          >
            <PlusCircle size={18} />
            <span>Mark Attendance</span>
          </button>
        </div>
      </div>

      {/* Tabs & Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex border-b border-gray-200">
          <button 
            className={`px-4 py-2 font-medium text-sm transition-all ${activeTab === 'today' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('today')}
          >
            Today
          </button>
          <button 
            className={`px-4 py-2 font-medium text-sm transition-all ${activeTab === 'week' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('week')}
          >
            This Week
          </button>
          <button 
            className={`px-4 py-2 font-medium text-sm transition-all ${activeTab === 'month' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('month')}
          >
            This Month
          </button>
        </div>
        
        <div className="relative">
          <button 
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all"
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          >
            <Filter size={16} />
            Filters
            <ChevronDown size={16} className={`transition-transform duration-300 ${isFiltersOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isFiltersOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg p-3 z-10 border border-gray-200 animate-fade-in">
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
                <select className="w-full p-2 border border-gray-300 rounded-md text-sm">
                  <option>All Grades</option>
                  <option>Grade 8</option>
                  <option>Grade 9</option>
                  <option>Grade 10</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select className="w-full p-2 border border-gray-300 rounded-md text-sm">
                  <option>All Status</option>
                  <option>Present</option>
                  <option>Absent</option>
                  <option>Late</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button className="text-sm text-blue-600 font-medium hover:text-blue-800">Apply</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Date indicator */}
      <div className="flex items-center gap-2 mb-4 bg-blue-50 p-3 rounded-lg">
        <Calendar size={18} className="text-blue-600" />
        <span className="text-sm font-medium text-blue-800">Wednesday, April 30, 2025</span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  Date
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  Status
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {attendanceData.map((record, idx) => (
              <tr 
                key={idx} 
                className={`transition-colors duration-200 ${hoveredRow === idx ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                onMouseEnter={() => setHoveredRow(idx)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={record.avatar} 
                      alt={record.name} 
                      className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                    />
                    <div>
                      <div className="font-medium text-gray-800">{record.name}</div>
                      <div className="text-xs text-gray-500">ID: STU-{1000 + idx}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-md bg-blue-100 text-blue-800 text-xs font-medium">
                    Grade {record.grade}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{record.date}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={record.status} />
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <p className="text-sm text-gray-600">Showing {attendanceData.length} of {attendanceData.length} students</p>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50" disabled>
            Previous
          </button>
          <button className="px-3 py-1 rounded-md bg-blue-100 text-blue-800 font-medium">1</button>
          <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50" disabled>
            Next
          </button>
        </div>
      </div>
      
      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
};

export default AttendanceListPage;