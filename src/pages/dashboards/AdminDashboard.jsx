// src/components/dashboards/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { 
  Users, BookOpen, CalendarDays, Award, 
  BarChart2, Mail, ArrowRight, School, 
  ClipboardList, MessageSquare, FileText,
  Settings, UserCog, Bookmark, Clock,
  Shield, CreditCard, PieChart,
  MapPin // Add this import
} from 'lucide-react';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const [activeStat, setActiveStat] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Sample data
  const stats = [
    { icon: <Users className="w-6 h-6" />, value: '1,254', label: 'Students', change: '+5%' },
    { icon: <UserCog className="w-6 h-6" />, value: '84', label: 'Teachers', change: '+2%' },
    { icon: <BookOpen className="w-6 h-6" />, value: '48', label: 'Courses', change: '+3' },
    { icon: <Award className="w-6 h-6" />, value: '89%', label: 'Success Rate', change: '+2%' },
    { icon: <CreditCard className="w-6 h-6" />, value: '$245k', label: 'Revenue', change: '+12%' },
    { icon: <Shield className="w-6 h-6" />, value: '98%', label: 'Attendance', change: '+1%' },
  ];

  const recentActivities = [
    { id: 1, action: 'New student enrolled', time: '2 hours ago', icon: <Users />, user: 'Emma Johnson' },
    { id: 2, action: 'Payment received', time: '5 hours ago', icon: <CreditCard />, amount: '$1,200' },
    { id: 3, action: 'New course added', time: '1 day ago', icon: <BookOpen />, course: 'Advanced Biology' },
    { id: 4, action: 'Staff meeting completed', time: '1 day ago', icon: <School />, participants: '24' },
  ];

  const upcomingEvents = [
    { id: 1, title: 'Board Meeting', date: 'May 15, 2023', time: '2:00 PM', location: 'Conference Room A' },
    { id: 2, title: 'Parent-Teacher Conference', date: 'May 18, 2023', time: '3:00 PM - 7:00 PM', location: 'Main Hall' },
    { id: 3, title: 'School Sports Day', date: 'May 22, 2023', time: '9:00 AM - 3:00 PM', location: 'School Field' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-bold"
        >
          Admin Dashboard
        </motion.h1>
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Settings className="w-5 h-5" /> Settings
          </motion.button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        {['overview', 'students', 'staff', 'finance', 'reports'].map((tab) => (
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              scale: activeStat === index ? 1.03 : 1,
              boxShadow: activeStat === index ? '0 10px 25px -5px rgba(0, 0, 0, 0.1)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            transition={{ duration: 0.3 }}
            className={`bg-white rounded-xl p-5 flex items-center gap-4 cursor-pointer transition-all duration-300 ${
              activeStat === index ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setActiveStat(index)}
          >
            <div className={`p-3 rounded-full ${
              activeStat === index ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
            }`}>
              {stat.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold">{stat.value}</h3>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">{stat.change}</span>
              </div>
              <p className="text-gray-500 text-sm">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 lg:col-span-2"
        >
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <ClipboardList className="w-5 h-5" /> Recent Activities
          </h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <motion.div
                key={activity.id}
                whileHover={{ x: 5 }}
                className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
              >
                <div className="bg-blue-100 p-2 rounded-full text-blue-600 flex-shrink-0">
                  {activity.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium">{activity.action}</h3>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                  {activity.user && <p className="text-sm text-gray-600 mt-1">{activity.user}</p>}
                  {activity.amount && <p className="text-sm text-green-600 mt-1">{activity.amount}</p>}
                  {activity.course && <p className="text-sm text-blue-600 mt-1">{activity.course}</p>}
                  {activity.participants && <p className="text-sm text-gray-600 mt-1">{activity.participants} participants</p>}
                </div>
              </motion.div>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-4 text-blue-600 font-medium flex items-center gap-1"
          >
            View all activities <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <CalendarDays className="w-5 h-5" /> Upcoming Events
          </h2>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <motion.div 
                whileTap={{ scale: 0.98 }}
                key={event.id}
                className="border-l-4 border-blue-500 pl-4 py-3 hover:bg-blue-50/50 rounded-r transition-colors cursor-pointer"
              >
                <h3 className="font-semibold">{event.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <Clock className="w-4 h-4" />
                  <span>{event.date} • {event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-4 text-blue-600 font-medium flex items-center gap-1"
          >
            View all events <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8"
      >
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { icon: <Users className="w-5 h-5" />, label: 'Add Student', color: 'bg-indigo-100 text-indigo-600' },
            { icon: <UserCog className="w-5 h-5" />, label: 'Add Staff', color: 'bg-green-100 text-green-600' },
            { icon: <BookOpen className="w-5 h-5" />, label: 'Create Course', color: 'bg-amber-100 text-amber-600' },
            { icon: <CalendarDays className="w-5 h-5" />, label: 'Schedule Event', color: 'bg-purple-100 text-purple-600' },
            { icon: <CreditCard className="w-5 h-5" />, label: 'Process Payment', color: 'bg-emerald-100 text-emerald-600' },
            { icon: <PieChart className="w-5 h-5" />, label: 'Generate Report', color: 'bg-rose-100 text-rose-600' },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -3, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              whileTap={{ scale: 0.98 }}
              className={`${item.color} p-4 rounded-lg flex flex-col items-center cursor-pointer shadow-sm border border-transparent hover:border-white/20 transition-all`}
            >
              <div className="mb-2 p-2 bg-white/20 rounded-full">{item.icon}</div>
              <span className="font-medium text-sm text-center">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;