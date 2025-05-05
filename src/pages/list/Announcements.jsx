import React, { useState } from 'react';
import { Bell, Calendar, Plus, Search, Filter, ChevronDown, Pin, MoreVertical, MessageSquare, Share2, Eye, Tag, User } from 'lucide-react';

// Extended mock data
const announcements = [
  {
    id: 1,
    title: 'Mid-Term Exams Start from May 15',
    date: '2025-04-29',
    description: 'Students are informed that mid-term exams will begin from May 15. Timetable will be shared soon.',
    author: 'Principal Office',
    category: 'Academic',
    pinned: true,
    views: 253,
    comments: 15
  },
  {
    id: 2,
    title: 'Eid Holidays Announced',
    date: '2025-04-27',
    description: 'School will remain closed from May 5 to May 9 for Eid holidays. Classes will resume on May 10.',
    author: 'Admin',
    category: 'Holiday',
    pinned: false,
    views: 189,
    comments: 8
  },
  {
    id: 3,
    title: 'Parent-Teacher Meeting',
    date: '2025-04-25',
    description: 'PTM for all grades will be held on May 3, Saturday. Attendance is mandatory.',
    author: 'Academic Coordinator',
    category: 'Meeting',
    pinned: false,
    views: 142,
    comments: 23
  },
  {
    id: 4,
    title: 'Annual Sports Day Schedule Released',
    date: '2025-04-22',
    description: 'The annual sports day will be held on May 20. Students interested in participating should register with their PE teachers by May 5.',
    author: 'Sports Department',
    category: 'Event',
    pinned: false,
    views: 118,
    comments: 12
  }
];

// Category Badge component
const CategoryBadge = ({ category }) => {
  const categoryStyles = {
    Academic: { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-200' },
    Holiday: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' },
    Meeting: { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-200' },
    Event: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' },
    Default: { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' }
  };

  const style = categoryStyles[category] || categoryStyles.Default;

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text} border ${style.border}`}>
      <Tag size={12} />
      {category}
    </span>
  );
};

const AnnouncementsListPage = () => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [expandedAnnouncement, setExpandedAnnouncement] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const toggleExpand = (id) => {
    setExpandedAnnouncement(expandedAnnouncement === id ? null : id);
  };

  // Format date to be more readable
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="max-w-8xl mx-auto p-6 bg-white rounded-xl shadow-sm">
      {/* Header section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Bell className="text-blue-600" size={24} />
          <h1 className="text-2xl font-bold text-gray-800">School Announcements</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <div className={`relative transition-all duration-300 ${searchFocused ? 'w-64' : 'w-48'}`}>
            <input
              type="text"
              placeholder="Search announcements..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
          
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            <Plus size={18} />
            <span>Add Announcement</span>
          </button>
        </div>
      </div>

      {/* Tabs & Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex border-b border-gray-200">
          <button 
            className={`px-4 py-2 font-medium text-sm transition-all ${activeTab === 'all' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('all')}
          >
            All
          </button>
          <button 
            className={`px-4 py-2 font-medium text-sm transition-all ${activeTab === 'pinned' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('pinned')}
          >
            Pinned
          </button>
          <button 
            className={`px-4 py-2 font-medium text-sm transition-all ${activeTab === 'recent' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('recent')}
          >
            Recent
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select className="w-full p-2 border border-gray-300 rounded-md text-sm">
                  <option>All Categories</option>
                  <option>Academic</option>
                  <option>Holiday</option>
                  <option>Meeting</option>
                  <option>Event</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                <select className="w-full p-2 border border-gray-300 rounded-md text-sm">
                  <option>All Time</option>
                  <option>Last Week</option>
                  <option>Last Month</option>
                  <option>Last 3 Months</option>
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

      {/* Announcements grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {announcements.map((announcement) => (
          <div 
            key={announcement.id} 
            className={`border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white transform transition-all duration-300 ${hoveredCard === announcement.id ? 'shadow-md translate-y-[-4px]' : ''}`}
            onMouseEnter={() => setHoveredCard(announcement.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="flex items-center justify-between bg-gray-50 px-4 py-2">
              <div className="flex items-center gap-2">
                <CategoryBadge category={announcement.category} />
                {announcement.pinned && (
                  <span className="inline-flex items-center text-amber-600">
                    <Pin size={14} className="animate-bounce-short" />
                  </span>
                )}
              </div>
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Calendar size={12} />
                {formatDate(announcement.date)}
              </span>
            </div>
            
            <div className="p-5">
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-lg font-semibold text-gray-800">{announcement.title}</h2>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical size={16} />
                </button>
              </div>
              
              <div className={`text-gray-700 mb-4 transition-all duration-300 overflow-hidden ${expandedAnnouncement === announcement.id ? 'max-h-96' : 'max-h-16'}`}>
                <p>{announcement.description}</p>
                {expandedAnnouncement === announcement.id && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">This announcement is for all students and staff. Please ensure you have read the details carefully and take appropriate action if required.</p>
                  </div>
                )}
              </div>
              
              {announcement.description.length > 100 && (
                <button 
                  className="text-sm text-blue-600 font-medium hover:text-blue-800 mb-4 flex items-center gap-1"
                  onClick={() => toggleExpand(announcement.id)}
                >
                  {expandedAnnouncement === announcement.id ? 'Show less' : 'Read more'}
                  <ChevronDown 
                    size={14} 
                    className={`transition-transform duration-300 ${expandedAnnouncement === announcement.id ? 'rotate-180' : ''}`} 
                  />
                </button>
              )}
              
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center text-sm text-gray-600">
                  <User size={14} className="mr-1" /> 
                  <span>{announcement.author}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <Eye size={14} />
                    {announcement.views}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <MessageSquare size={14} />
                    {announcement.comments}
                  </span>
                  <button className="text-gray-400 hover:text-blue-600 transition-colors">
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Load more button */}
      <div className="flex justify-center mt-8">
        <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-800 flex items-center gap-2 transition-all duration-300">
          <span>Load more</span>
          <ChevronDown size={16} />
        </button>
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
        @keyframes bounce-short {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .animate-bounce-short {
          animation: bounce-short 2s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default AnnouncementsListPage;