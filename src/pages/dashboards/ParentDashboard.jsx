// src/components/dashboards/ParentDashboard.jsx
import React, { useState } from 'react';
import { 
  Users, BookOpen, CalendarDays, Award, 
  FileText, Clock, Mail, Bell,
  BarChart2, MessageSquare, Bookmark
} from 'lucide-react';
import { motion } from 'framer-motion';

const ParentDashboard = () => {
  const [activeTab, setActiveTab] = useState('children');
  const [activeChild, setActiveChild] = useState(0);

  const children = [
    { id: 1, name: 'Emma Johnson', grade: '8th Grade', gpa: '3.8' },
    { id: 2, name: 'Noah Johnson', grade: '5th Grade', gpa: '4.0' },
  ];

  const childClasses = [
    { id: 1, name: 'Mathematics', teacher: 'Mr. Smith', grade: 'A-' },
    { id: 2, name: 'Science', teacher: 'Ms. Williams', grade: 'B+' },
    { id: 3, name: 'English', teacher: 'Mrs. Brown', grade: 'A' },
  ];

  const assignments = [
    { id: 1, class: 'Mathematics', title: 'Algebra Homework', due: 'Tomorrow', status: 'pending' },
    { id: 2, class: 'Science', title: 'Lab Report', due: 'In 3 days', status: 'in-progress' },
  ];

  const announcements = [
    { id: 1, title: 'Parent-teacher conference', date: 'May 15, 2023', read: false },
    { id: 2, title: 'School fundraiser', date: 'May 10, 2023', read: true },
    { id: 3, title: 'Field trip permission slip', date: 'May 5, 2023', read: true },
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
          Parent Dashboard
        </motion.h1>
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <MessageSquare className="w-5 h-5" /> Message Teacher
          </motion.button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        {['children', 'grades', 'attendance', 'messages'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Children Selector */}
      <div className="flex gap-4 mb-8">
        {children.map((child, index) => (
          <motion.button
            key={child.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveChild(index)}
            className={`px-6 py-4 rounded-xl flex-1 text-left transition-colors ${
              activeChild === index ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200'
            }`}
          >
            <h3 className="font-bold">{child.name}</h3>
            <p className="text-sm">{child.grade}</p>
            {activeChild === index && (
              <div className="flex items-center gap-2 mt-2">
                <Award className="w-4 h-4" />
                <span className="text-sm">GPA: {child.gpa}</span>
              </div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { icon: <BookOpen className="w-6 h-6" />, value: '3', label: 'Current Classes' },
          { icon: <FileText className="w-6 h-6" />, value: '2', label: 'Pending Assignments' },
          { icon: <BarChart2 className="w-6 h-6" />, value: '95%', label: 'Attendance' },
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
            <BookOpen className="w-5 h-5" /> {children[activeChild].name}'s Classes
          </h2>
          <div className="space-y-4">
            {childClasses.map((classItem) => (
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
                </div>
                <div className="flex flex-col items-end">
                  <span className={`text-lg font-bold ${
                    classItem.grade === 'A' ? 'text-green-600' :
                    classItem.grade === 'A-' ? 'text-blue-600' :
                    classItem.grade === 'B+' ? 'text-amber-600' :
                    'text-gray-600'
                  }`}>{classItem.grade}</span>
                  <button className="text-blue-600 text-sm font-medium">Details</button>
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
              <Bell className="w-5 h-5" /> School Announcements
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

export default ParentDashboard;