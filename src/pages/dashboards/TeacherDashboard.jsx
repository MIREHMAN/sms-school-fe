// src/components/dashboards/TeacherDashboard.jsx
import React, { useState } from 'react';
import { 
  Users, BookOpen, CalendarDays, Award, 
  FileText, Clock, Mail, CheckCircle,
  Bookmark, ClipboardList, MessageSquare
} from 'lucide-react';
import { motion } from 'framer-motion';

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState('classes');

  const classes = [
    { id: 1, name: 'Mathematics 101', time: 'Mon/Wed 9:00 AM', students: 24, assignments: 2 },
    { id: 2, name: 'Advanced Biology', time: 'Tue/Thu 11:00 AM', students: 18, assignments: 1 },
    { id: 3, name: 'English Literature', time: 'Fri 1:00 PM', students: 22, assignments: 0 },
  ];

  const upcomingTasks = [
    { id: 1, task: 'Grade Math assignments', due: 'Tomorrow', priority: 'high' },
    { id: 2, task: 'Prepare Biology lab', due: 'In 2 days', priority: 'medium' },
    { id: 3, task: 'Submit attendance reports', due: 'Friday', priority: 'low' },
  ];

  const announcements = [
    { id: 1, title: 'Staff meeting reminder', date: 'May 10, 2023', read: false },
    { id: 2, title: 'New curriculum guidelines', date: 'May 8, 2023', read: true },
    { id: 3, title: 'Professional development', date: 'May 5, 2023', read: true },
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
          Teacher Dashboard
        </motion.h1>
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <CalendarDays className="w-5 h-5" /> Schedule
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
          { icon: <BookOpen className="w-6 h-6" />, value: '3', label: 'Active Classes' },
          { icon: <Users className="w-6 h-6" />, value: '64', label: 'Total Students' },
          { icon: <FileText className="w-6 h-6" />, value: '3', label: 'Pending Assignments' },
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
                <div className="bg-blue-100 p-3 rounded-lg text-blue-600 flex-shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium">{classItem.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <Clock className="w-4 h-4" />
                    <span>{classItem.time}</span>
                  </div>
                  <div className="flex gap-4 mt-3">
                    <span className="text-sm text-gray-600 flex items-center gap-1">
                      <Users className="w-4 h-4" /> {classItem.students} students
                    </span>
                    <span className="text-sm text-gray-600 flex items-center gap-1">
                      <FileText className="w-4 h-4" /> {classItem.assignments} assignments
                    </span>
                  </div>
                </div>
                <button className="text-blue-600 text-sm font-medium">View</button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Tasks */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <ClipboardList className="w-5 h-5" /> Upcoming Tasks
            </h2>
            <div className="space-y-3">
              {upcomingTasks.map((task) => (
                <motion.div 
                  whileTap={{ scale: 0.98 }}
                  key={task.id}
                  className="border-l-4 border-blue-500 pl-4 py-3 hover:bg-blue-50/50 rounded-r transition-colors cursor-pointer"
                >
                  <h3 className="font-medium">{task.task}</h3>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-sm text-gray-500">Due {task.due}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      task.priority === 'high' ? 'bg-red-100 text-red-800' :
                      task.priority === 'medium' ? 'bg-amber-100 text-amber-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {task.priority}
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
              <Mail className="w-5 h-5" /> Announcements
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
                    <Mail className="w-4 h-4" />
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

export default TeacherDashboard;