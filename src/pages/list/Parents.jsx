import React, { useState, useEffect } from 'react';
import { 
  User, Calendar, BookOpen, FileText, Bell, Settings, 
  MessageSquare, CreditCard, Download, ChevronRight, 
  CheckCircle, XCircle, Mail, Clock
} from 'lucide-react';

export default function ParentPortal() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    // Show notification after 2 seconds
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleCardHover = (id) => {
    setActiveCard(id);
  };

  const handleCardLeave = () => {
    setActiveCard(null);
  };

  // Generate dates for the calendar
  const generateCalendarDates = () => {
    const dates = [];
    const attendanceStatus = ['present', 'present', 'present', 'present', 'absent', 'present', 'weekend', 
                             'present', 'present', 'present', 'late', 'present', 'present', 'weekend',
                             'present', 'present', 'present', 'present', 'present', 'absent', 'weekend',
                             'present', 'present', 'present', 'present', 'present', 'present', 'weekend',
                             'present', 'present'];
    
    for (let i = 0; i < 30; i++) {
      const status = attendanceStatus[i];
      let bgColor = '';
      
      if (status === 'present') bgColor = 'bg-green-100 text-green-800';
      else if (status === 'absent') bgColor = 'bg-red-100 text-red-800';
      else if (status === 'late') bgColor = 'bg-yellow-100 text-yellow-800';
      else bgColor = 'bg-gray-100 text-gray-400';
      
      dates.push(
        <span 
          key={i} 
          className={`py-1 rounded-full w-8 h-8 flex items-center justify-center text-xs ${bgColor} transition-transform hover:scale-110`}
        >
          {i + 1}
        </span>
      );
    }
    return dates;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div 
        className={`max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-6 md:p-8 transition-all duration-700 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 relative">
          Parent Portal
          <div className="h-1 w-20 bg-blue-500 mx-auto mt-2 rounded-full"></div>
        </h1>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 relative">
          <div 
            className={`flex items-center space-x-4 transition-all duration-500 ${
              isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl shadow-md relative overflow-hidden group">
              <User size={32} className="group-hover:scale-110 transition-transform" />
              <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-20 transition-opacity" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">James Smith</h2>
              <p className="text-gray-600 flex items-center">
                <BookOpen size={16} className="mr-1" /> Grade 8
              </p>
            </div>
          </div>
          
          <div 
            className={`mt-4 md:mt-0 bg-gray-50 p-3 rounded-xl shadow-sm transition-all duration-500 ${
              isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <p className="flex items-center text-gray-700 mb-2">
              <CheckCircle size={18} className="mr-2 text-green-500" />
              <span className="font-semibold">Attendance:</span> 
              <span className="ml-1">85%</span>
            </p>
            <p className="flex items-center text-gray-700">
              <Calendar size={18} className="mr-2 text-blue-500" />
              <span className="font-semibold">Upcoming:</span>
              <span className="ml-1">Field Trip - Apr 30</span>
            </p>
          </div>
        </div>
        
        {showNotification && (
          <div 
            className="fixed top-4 right-4 bg-white shadow-lg rounded-lg p-4 flex items-center animate-slideIn z-50"
            onAnimationEnd={() => setTimeout(() => setShowNotification(false), 5000)}
          >
            <Bell size={20} className="text-yellow-500 mr-2" />
            <div>
              <p className="font-medium">New Notice</p>
              <p className="text-sm text-gray-600">Science project deadline extended</p>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div 
              className={`border border-gray-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-gradient-to-br from-white to-gray-50 ${
                activeCard === 'progress' ? 'transform scale-[1.02]' : ''
              }`}
              onMouseEnter={() => handleCardHover('progress')}
              onMouseLeave={handleCardLeave}
            >
              <h3 className="text-lg font-semibold mb-3 flex items-center text-gray-800">
                <FileText size={20} className="mr-2 text-blue-500" />
                Student Progress
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-700 hover:text-blue-600 cursor-pointer transition-colors group">
                  <ChevronRight size={16} className="mr-1 group-hover:translate-x-1 transition-transform" />
                  Exam Results
                </li>
                <li className="flex items-center text-gray-700 hover:text-blue-600 cursor-pointer transition-colors group">
                  <ChevronRight size={16} className="mr-1 group-hover:translate-x-1 transition-transform" />
                  Report Cards
                </li>
                <li className="flex items-center text-gray-700 hover:text-blue-600 cursor-pointer transition-colors group">
                  <ChevronRight size={16} className="mr-1 group-hover:translate-x-1 transition-transform" />
                  Teacher Comments
                </li>
              </ul>
            </div>
            
            <div 
              className={`border border-gray-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-gradient-to-br from-white to-gray-50 ${
                activeCard === 'homework' ? 'transform scale-[1.02]' : ''
              }`}
              onMouseEnter={() => handleCardHover('homework')}
              onMouseLeave={handleCardLeave}
            >
              <h3 className="text-lg font-semibold mb-3 flex items-center text-gray-800">
                <BookOpen size={20} className="mr-2 text-blue-500" />
                Homework & Assignments
              </h3>
              <ul className="space-y-3">
                <li className="text-gray-700 border-l-4 border-yellow-400 pl-3 py-1">
                  <div className="font-medium">Math Assignment 5</div>
                  <div className="text-sm flex items-center text-yellow-600">
                    <Clock size={14} className="mr-1" /> Due: Apr 25
                  </div>
                </li>
                <li className="text-gray-700 border-l-4 border-red-400 pl-3 py-1">
                  <div className="font-medium">Science Project</div>
                  <div className="text-sm flex items-center text-red-600">
                    <Clock size={14} className="mr-1" /> Due: Apr 25
                  </div>
                </li>
              </ul>
            </div>
            
            <div 
              className={`border border-gray-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-gradient-to-br from-white to-gray-50 ${
                activeCard === 'notices' ? 'transform scale-[1.02]' : ''
              }`}
              onMouseEnter={() => handleCardHover('notices')}
              onMouseLeave={handleCardLeave}
            >
              <h3 className="text-lg font-semibold mb-3 flex items-center text-gray-800">
                <Bell size={20} className="mr-2 text-blue-500" />
                Notices & Events
              </h3>
              <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-100">
                <p className="text-gray-700 font-medium flex items-center">
                  <Bell size={16} className="text-yellow-500 mr-2 animate-pulse" />
                  Parent-Teacher Meeting on May 5th
                </p>
                <p className="text-sm text-gray-600 mt-1 ml-6">
                  Please confirm your attendance by April 30th
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div 
              className={`border border-gray-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-gradient-to-br from-white to-gray-50 ${
                activeCard === 'attendance' ? 'transform scale-[1.02]' : ''
              }`}
              onMouseEnter={() => handleCardHover('attendance')}
              onMouseLeave={handleCardLeave}
            >
              <h3 className="text-lg font-semibold mb-3 flex items-center text-gray-800">
                <Calendar size={20} className="mr-2 text-blue-500" />
                Attendance Record
              </h3>
              <div className="grid grid-cols-7 text-center text-gray-700 mb-2">
                <span className="font-medium">S</span>
                <span className="font-medium">M</span>
                <span className="font-medium">T</span>
                <span className="font-medium">W</span>
                <span className="font-medium">T</span>
                <span className="font-medium">F</span>
                <span className="font-medium">S</span>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center">
                {generateCalendarDates()}
              </div>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                    <span className="text-xs">Present</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                    <span className="text-xs">Absent</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>
                    <span className="text-xs">Late</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 border-t border-gray-100 pt-4">
                <p className="flex items-center text-gray-700">
                  <CreditCard size={18} className="mr-2 text-green-500" />
                  <span className="font-semibold">Fee Status:</span>
                  <span className="ml-1">Paid</span>
                </p>
                <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center transition-all hover:bg-blue-600 hover:shadow-md">
                  <Download size={16} className="mr-2" />
                  Download Receipt
                </button>
              </div>
            </div>
            
            <div 
              className={`border border-gray-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-gradient-to-br from-white to-gray-50 ${
                activeCard === 'messages' ? 'transform scale-[1.02]' : ''
              }`}
              onMouseEnter={() => handleCardHover('messages')}
              onMouseLeave={handleCardLeave}
            >
              <h3 className="text-lg font-semibold mb-3 flex items-center text-gray-800">
                <MessageSquare size={20} className="mr-2 text-blue-500" />
                Messages
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mr-2">
                      <User size={16} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Principal</p>
                      <p className="text-xs text-gray-500">Annual Day Celebration</p>
                    </div>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">New</span>
                </div>
                <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-2">
                      <Mail size={16} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Request Meeting</p>
                      <p className="text-xs text-gray-500">Schedule with teachers</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-gray-400" />
                </div>
              </div>
            </div>
            
            <div 
              className={`border border-gray-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-gradient-to-br from-white to-gray-50 ${
                activeCard === 'profile' ? 'transform scale-[1.02]' : ''
              }`}
              onMouseEnter={() => handleCardHover('profile')}
              onMouseLeave={handleCardLeave}
            >
              <h3 className="text-lg font-semibold mb-3 flex items-center text-gray-800">
                <Settings size={20} className="mr-2 text-blue-500" />
                Profile & Settings
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-700 hover:text-blue-600 cursor-pointer transition-colors group">
                  <ChevronRight size={16} className="mr-1 group-hover:translate-x-1 transition-transform" />
                  Contact Information
                </li>
                <li className="flex items-center text-gray-700 hover:text-blue-600 cursor-pointer transition-colors group">
                  <ChevronRight size={16} className="mr-1 group-hover:translate-x-1 transition-transform" />
                  Change Password
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }
        
        .animate-pulse {
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}