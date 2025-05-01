// src/components/dashboards/StudentDashboard.jsx
import React, { useState } from 'react';
import { 
  BookOpen, CalendarDays, FileText, Award,
  Clock, CheckCircle, BarChart2, MessageSquare,
  Bookmark, Users, Bell
} from 'lucide-react';
import { motion } from 'framer-motion';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('classes');

  const classes = [
    { id: 1, name: 'Mathematics 101', teacher: 'Mr. Johnson', time: 'Mon/Wed 9:00 AM', grade: 'A-' },
    { id: 2, name: 'Advanced Biology', teacher: 'Ms. Williams', time: 'Tue/Thu 11:00 AM', grade: 'B+' },
    { id: 3, name: 'English Literature', teacher: 'Mrs. Smith', time: 'Fri 1:00 PM', grade: 'A' },
  ];

  const assignments = [
    { id: 1, class: 'Mathematics', title: 'Algebra Homework', due: 'Tomorrow', status: 'pending' },
    { id: 2, class: 'Biology', title: 'Lab Report', due: 'In 3 days', status: 'in-progress' },
    { id: 3, class: 'English', title: 'Essay Draft', due: 'Next Week', status: 'not-started' },
  ];

  const announcements = [
    { id: 1, title: 'School trip permission slips', date: 'May 10, 2023', read: false },
    { id: 2, title: 'Library hours extended', date: 'May 8, 2023', read: true },
    { id: 3, title: 'Sports day schedule', date: 'May 5, 2023', read: true },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-bold"
        >
          Student Dashboard
        </motion.h1>
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Bell className="w-5 h-5" /> Notifications
          </motion.button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        {['classes', 'assignments', 'grades', 'messages'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { icon: <BookOpen className="w-6 h-6" />, value: '3', label: 'Current Classes' },
          { icon: <FileText className="w-6 h-6" />, value: '3', label: 'Pending Assignments' },
          { icon: <Award className="w-6 h-6" />, value: '3.7', label: 'GPA' },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-5 flex items-center gap-4 shadow-sm border border-gray-100"
          >
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              {stat.icon}
            </div>
            <div>
              <h3 className="text-xl font-bold">{stat.value}</h3>
              <p className="text-gray-500 text-sm">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Classes */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 lg:col-span-2"
        >
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5" /> My Classes
          </h2>
          <div className="space-y-4">
            {classes.map((classItem) => (
              <motion.div
                key={classItem.id}
                whileHover={{ x: 5 }}
                className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer border border-gray-100"
              >
                <div className={`p-3 rounded-lg flex-shrink-0 ${
                  classItem.grade === 'A' ? 'bg-green-100 text-green-600' :
                  classItem.grade === 'A-' ? 'bg-blue-100 text-blue-600' :
                  classItem.grade === 'B+' ? 'bg-amber-100 text-amber-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium">{classItem.name}</h3>
                  <p className="text-sm text-gray-600">{classItem.teacher}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <Clock className="w-4 h-4" />
                    <span>{classItem.time}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className={`text-lg font-bold ${
                    classItem.grade === 'A' ? 'text-green-600' :
                    classItem.grade === 'A-' ? 'text-blue-600' :
                    classItem.grade === 'B+' ? 'text-amber-600' :
                    'text-gray-600'
                  }`}>{classItem.grade}</span>
                  <button className="text-blue-600 text-sm font-medium">View</button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Assignments */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" /> Upcoming Assignments
            </h2>
            <div className="space-y-3">
              {assignments.map((assignment) => (
                <motion.div 
                  whileTap={{ scale: 0.98 }}
                  key={assignment.id}
                  className="border-l-4 border-blue-500 pl-4 py-3 hover:bg-blue-50/50 rounded-r transition-colors cursor-pointer"
                >
                  <h3 className="font-medium">{assignment.title}</h3>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-sm text-gray-500">{assignment.class}</span>
                    <span className="text-sm text-gray-500">Due {assignment.due}</span>
                  </div>
                  <div className="mt-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      assignment.status === 'pending' ? 'bg-red-100 text-red-800' :
                      assignment.status === 'in-progress' ? 'bg-amber-100 text-amber-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {assignment.status.replace('-', ' ')}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Announcements */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5" /> Announcements
            </h2>
            <div className="space-y-3">
              {announcements.map((announcement) => (
                <motion.div
                  whileHover={{ x: 5 }}
                  key={announcement.id}
                  className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                >
                  <div className={`p-2 rounded-full ${
                    announcement.read ? 'bg-gray-100 text-gray-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    <Bell className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-medium ${
                      announcement.read ? 'text-gray-600' : 'text-gray-900'
                    }`}>{announcement.title}</h3>
                    <p className="text-sm text-gray-500">{announcement.date}</p>
                  </div>
                  {!announcement.read && (
                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;