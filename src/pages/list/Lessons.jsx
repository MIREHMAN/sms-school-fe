// ModernLessonPlans.jsx

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Book, 
  Code, 
  DollarSign, 
  BookOpen, 
  ChevronRight, 
  Users, 
  Calendar, 
  Target, 
  ListChecks, 
  Video, 
  FileText,
  Plus,
  Clock,
  Search,
  LayoutGrid,
  List,
  X
} from "lucide-react";

const LessonsListPage = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedLayout, setSelectedLayout] = useState('grid');
  const [showModal, setShowModal] = useState(false);
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLessonGrade, setNewLessonGrade] = useState('Grade 6');
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const toggleSection = (index) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  const gradeOptions = ['Grade 6', 'Grades 7 & 8', 'Grade 9', 'Grade 10'];
  const categoryOptions = ['Humanities', 'Programming', 'Economics', 'English Grammar'];

  const lessonPlans = [
    {
      id: 1,
      title: "Humanities",
      grade: "Grade 6",
      color: "pink",
      icon: <Book size={22} />,
      objective: "Students will understand: Introduction to Humanities, Creation of Universe, Timeline.",
      topics: ["Primary & Secondary Sources", "Thematic Connections", "Timeline: BC, BCE, AD, CE"],
      videos: [
        { name: "Big Bang Video", url: "https://www.youtube.com/watch?v=GncYOf29uc4" },
        { name: "Historians", url: "https://www.youtube.com/watch?v=EXUr_VfIiSI" },
        { name: "Primary & Secondary Sources", url: "https://www.youtube.com/watch?v=kOXfArLq6uY" }
      ],
      assignments: [
        "Comprehension Questions: Why are prophets sent?",
        "How many prophets mentioned in Quran?"
      ],
      date: "7-04-2025",
      timeStatus: "Today"
    },
    {
      id: 2,
      title: "Programming",
      grade: "Grades 7 & 8",
      color: "green",
      icon: <Code size={22} />,
      objective: "Learn basics of Next.js and Tailwind CSS. Static vs Dynamic websites. Build responsive websites.",
      activities: [
        "Set up VS Code",
        "Practice tags, live server usage",
        "Multi-page responsive website building"
      ],
      assignments: [
        "Oral memorization of commands",
        "Building websites individually"
      ],
      date: "7-04-2025",
      timeStatus: "Tomorrow"
    },
    {
      id: 3,
      title: "Economics",
      grade: "Grade 9",
      color: "purple",
      icon: <DollarSign size={22} />,
      objective: "Understand Hunting-Gathering Stage, Pastoral Stage, Private Property, Exchange Economy.",
      activities: [
        "Barter Trade Simulation",
        "Timeline Drawing: Evolution of Tools"
      ],
      videos: [
        { name: "Hunting & Gathering", url: "https://www.youtube.com/watch?v=GQAJLzsr9zM" },
        { name: "Who are you", url: "https://www.youtube.com/watch?v=GWGbOjlJDkU" }
      ],
      assignments: [
        "Question solving & Dictation tests"
      ],
      date: "7 to 11 Oct",
      timeStatus: "Next week"
    },
    {
      id: 4,
      title: "English Grammar",
      grade: "Grades 7 & 8",
      color: "red",
      icon: <BookOpen size={22} />,
      objective: "Practice Present Simple and Past Simple Tenses through meaningful activities.",
      activities: [
        "Kahoot Quiz",
        "Copy-based exercises",
        "Speaking Activity: \"My Weekend & Weekdays\""
      ],
      assignments: [
        "Quiz results & oral activities"
      ],
      date: "7 to 11 Oct",
      timeStatus: "Today"
    }
  ];

  const handleAddLesson = () => {
    if (newLessonTitle.trim()) {
      // Would add new lesson here
      setShowModal(false);
      setNewLessonTitle('');
    }
  };

  const getFilteredLessons = () => {
    let filtered = lessonPlans;
    
    if (searchQuery) {
      filtered = filtered.filter(lesson => 
        lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson.grade.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedFilter !== 'All') {
      filtered = filtered.filter(lesson => lesson.title === selectedFilter);
    }
    
    return filtered;
  };

  const filteredLessons = getFilteredLessons();

  const getColorClasses = (color) => {
    const colorMap = {
      blue: {
        bg: 'bg-blue-50',
        text: 'text-blue-600',
        border: 'border-blue-200',
        progress: 'bg-blue-500',
        hover: 'group-hover:bg-blue-600',
        light: 'bg-blue-100'
      },
      green: {
        bg: 'bg-emerald-50',
        text: 'text-emerald-600',
        border: 'border-emerald-200',
        progress: 'bg-emerald-500',
        hover: 'group-hover:bg-emerald-600',
        light: 'bg-emerald-100'
      },
      purple: {
        bg: 'bg-violet-50',
        text: 'text-violet-600',
        border: 'border-violet-200',
        progress: 'bg-violet-500',
        hover: 'group-hover:bg-violet-600',
        light: 'bg-violet-100'
      },
      pink: {
        bg: 'bg-pink-50',
        text: 'text-pink-600',
        border: 'border-pink-200',
        progress: 'bg-pink-500',
        hover: 'group-hover:bg-pink-600',
        light: 'bg-pink-100'
      },
      red: {
        bg: 'bg-red-50',
        text: 'text-red-600',
        border: 'border-red-200',
        progress: 'bg-red-500',
        hover: 'group-hover:bg-red-600',
        light: 'bg-red-100'
      }
    };
    
    return colorMap[color] || colorMap.blue;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  const renderLessonCard = (lesson, index) => {
    const colorClasses = getColorClasses(lesson.color);
    const progress = Math.floor(Math.random() * 30) + 50; // Random progress between 50-80%
    
    return (
      <motion.div
        key={lesson.id}
        variants={itemVariants}
        whileHover={{ scale: 1.01 }}
        className="relative rounded-xl p-0 bg-white shadow-sm group border transition-all hover:shadow-md overflow-hidden"
      >
        {/* Top accent bar */}
        <div className={`h-1 w-full ${colorClasses.progress}`}></div>
        
        {/* Corner accent */}
        <div className="absolute -top-8 -right-8 w-16 h-16 rotate-45 bg-opacity-20 transform origin-bottom-left">
          <div className={`w-full h-full ${colorClasses.bg}`}></div>
        </div>
        
        <div className="p-5">
          {/* Header with category pill */}
          <div className="flex justify-between items-center mb-3">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${colorClasses.bg} ${colorClasses.text}`}>
              {lesson.icon}
              <span className="ml-1">{lesson.grade}</span>
            </span>
            <div className="text-sm text-gray-500 flex items-center">
              <Clock size={14} className="mr-1" />
              {lesson.timeStatus}
            </div>
          </div>
          
          {/* Lesson title */}
          <h3 className="font-bold text-lg text-gray-800 mb-1">{lesson.title}</h3>
          
          {/* Objective preview */}
          <p className="text-sm text-gray-500 mb-4 line-clamp-2">{lesson.objective}</p>
          
          {/* Progress bar */}
          <div className="w-full bg-gray-100 rounded-full h-2 mb-3">
            <div 
              className={`${colorClasses.progress} h-2 rounded-full transition-all group-hover:w-full`} 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          {/* Bottom row with date info and button */}
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-gray-500 flex items-center">
              <Calendar size={14} className="mr-1" />
              {lesson.date}
            </span>
            <button 
              className={`${colorClasses.bg} ${colorClasses.text} text-sm font-medium px-3 py-1 rounded-lg flex items-center group-hover:bg-opacity-100 transition-all`} 
              onClick={() => toggleSection(index)}
            >
              View <ChevronRight size={14} className="ml-1 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
        
        {/* Expanded content */}
        <motion.div 
          initial={false}
          animate={{ 
            height: expandedSection === index ? "auto" : 0,
            opacity: expandedSection === index ? 1 : 0
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden border-t border-gray-100"
        >
          <div className="p-5 space-y-4 bg-gray-50">
            <div className="flex items-start gap-3">
              <Target size={20} className={colorClasses.text} />
              <div>
                <h3 className="font-semibold text-gray-700">Objective</h3>
                <p className="text-gray-600">{lesson.objective}</p>
              </div>
            </div>

            {lesson.topics && (
              <div className="flex items-start gap-3">
                <ListChecks size={20} className={colorClasses.text} />
                <div>
                  <h3 className="font-semibold text-gray-700">Topics</h3>
                  <ul className="mt-1 space-y-1">
                    {lesson.topics.map((topic, i) => (
                      <motion.li 
                        key={i}
                        className="flex items-center gap-2 text-gray-600"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <span className={`block w-1 h-1 rounded-full ${colorClasses.progress}`}></span>
                        {topic}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {lesson.activities && (
              <div className="flex items-start gap-3">
                <ListChecks size={20} className={colorClasses.text} />
                <div>
                  <h3 className="font-semibold text-gray-700">Activities</h3>
                  <ul className="mt-1 space-y-1">
                    {lesson.activities.map((activity, i) => (
                      <motion.li 
                        key={i}
                        className="flex items-center gap-2 text-gray-600"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <span className={`block w-1 h-1 rounded-full ${colorClasses.progress}`}></span>
                        {activity}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {lesson.videos && (
              <div className="flex items-start gap-3">
                <Video size={20} className={colorClasses.text} />
                <div>
                  <h3 className="font-semibold text-gray-700">Videos</h3>
                  <div className="mt-2 grid gap-2">
                    {lesson.videos.map((video, i) => (
                      <motion.a
                        key={i}
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${colorClasses.bg} ${colorClasses.text} py-2 px-3 rounded-lg flex items-center gap-2 hover:opacity-90 transition-all`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Video size={16} />
                        <span>{video.name}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {lesson.assignments && (
              <div className="flex items-start gap-3">
                <FileText size={20} className={colorClasses.text} />
                <div>
                  <h3 className="font-semibold text-gray-700">Assignments & Assessment</h3>
                  <ul className="mt-1 space-y-1">
                    {lesson.assignments.map((assignment, i) => (
                      <motion.li 
                        key={i}
                        className="flex items-center gap-2 text-gray-600"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <span className={`block w-1 h-1 rounded-full ${colorClasses.progress}`}></span>
                        {assignment}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    );
  };

  const renderSkeletonCard = (index) => (
    <div key={index} className="border rounded-xl p-5 bg-white shadow animate-pulse">
      <div className="h-1 w-full bg-gray-200 mb-4"></div>
      <div className="flex justify-between mb-3">
        <div className="h-5 w-20 bg-gray-200 rounded-full"></div>
        <div className="h-5 w-16 bg-gray-200 rounded"></div>
      </div>
      <div className="h-6 bg-gray-200 rounded w-2/3 mb-3"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-2 bg-gray-200 rounded-full w-full mb-4"></div>
      <div className="flex justify-between items-center">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-6 bg-gray-200 rounded w-16"></div>
      </div>
    </div>
  );

  const renderLessonRow = (lesson, index) => {
    const colorClasses = getColorClasses(lesson.color);
    return (
      <div 
        key={lesson.id} 
        className="flex items-center bg-white rounded-xl p-4 border shadow-sm hover:shadow-md transition-all"
      >
        <div className={`w-2 h-16 rounded-full mr-4 ${colorClasses.progress}`}></div>
        <div className="flex-grow">
          <div className="flex items-center mb-1">
            <h3 className="font-bold text-lg text-gray-800 mr-3">{lesson.title}</h3>
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${colorClasses.bg} ${colorClasses.text}`}>
              {lesson.grade}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar size={14} className="mr-1" />
            <span>{lesson.date}</span>
            <span className="mx-2">•</span>
            <Clock size={14} className="mr-1" />
            <span>{lesson.timeStatus}</span>
          </div>
        </div>
        <button 
          className={`${colorClasses.bg} ${colorClasses.text} px-4 py-2 rounded-lg ml-4`}
          onClick={() => toggleSection(index)}
        >
          View
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Lesson Plans</h1>
            <p className="text-gray-500 mt-1">Manage your curriculum resources</p>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedLayout('grid')}
              className={`p-2 rounded-md ${selectedLayout === 'grid' ? 'bg-gray-200' : 'bg-gray-100'}`}
            >
              <LayoutGrid size={18} />
            </button>
            <button
              onClick={() => setSelectedLayout('list')}
              className={`p-2 rounded-md ${selectedLayout === 'list' ? 'bg-gray-200' : 'bg-gray-100'}`}
            >
              <List size={18} />
            </button>
          </div>
        </div>
        
        {/* Search and filter */}
        <div className="bg-white shadow-sm rounded-xl p-4 mb-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            {/* Search */}
            <div className="relative flex-grow">
              <input
                type="text"
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-full transition-all"
                placeholder="Search lessons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
            </div>
            
            {/* Category filter */}
            <div className="flex space-x-2 overflow-x-auto pb-1 flex-nowrap">
              <button
                className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap ${
                  selectedFilter === 'All' 
                    ? 'bg-blue-100 text-blue-600 font-medium'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedFilter('All')}
              >
                All
              </button>
              {categoryOptions.map(category => {
                let icon;
                let color;
                
                switch(category) {
                  case 'Humanities': 
                    icon = <Book size={16} />;
                    color = 'text-pink-600';
                    break;
                  case 'Programming': 
                    icon = <Code size={16} />;
                    color = 'text-emerald-600';
                    break;
                  case 'Economics': 
                    icon = <DollarSign size={16} />;
                    color = 'text-violet-600';
                    break;
                  case 'English Grammar': 
                    icon = <BookOpen size={16} />;
                    color = 'text-red-600';
                    break;
                  default: 
                    icon = <Book size={16} />;
                    color = 'text-blue-600';
                }
                
                return (
                  <button
                    key={category}
                    className={`px-3 py-1.5 rounded-lg text-sm flex items-center whitespace-nowrap ${
                      selectedFilter === category
                        ? 'bg-blue-100 text-blue-600 font-medium'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    onClick={() => setSelectedFilter(category)}
                  >
                    <span className={color + " mr-1"}>{icon}</span>
                    <span>{category}</span>
                  </button>
                );
              })}
            </div>
            
            {/* Add button */}
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm whitespace-nowrap"
              onClick={() => setShowModal(true)}
            >
              <Plus size={18} />
              <span>Add Lesson</span>
            </button>
          </div>
        </div>

        {/* Lesson count summary */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">{filteredLessons.length}</span> of <span className="font-medium">{lessonPlans.length}</span> lessons
          </div>
          
          <div className="text-sm">
            <span className="text-gray-500">Sort by: </span>
            <select className="border-none bg-transparent text-gray-800 font-medium focus:outline-none focus:ring-0">
              <option>Newest first</option>
              <option>Subject (A-Z)</option>
              <option>Grade level</option>
            </select>
          </div>
        </div>

        {/* Cards or List */}
        {!isLoaded ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[...Array(4)].map((_, index) => renderSkeletonCard(index))}
          </div>
        ) : (
          <>
            {filteredLessons.length === 0 ? (
              <div className="text-center py-16 text-gray-500 bg-white rounded-xl shadow-sm">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <BookOpen size={24} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-1">No lessons found</h3>
                <p>Try a different search or add a new lesson</p>
                <button
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg inline-flex items-center"
                  onClick={() => setShowModal(true)}
                >
                  <Plus size={16} className="mr-2" />
                  Add a new lesson
                </button>
              </div>
            ) : (
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className={selectedLayout === 'grid' 
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
                  : "space-y-4"
                }
              >
                {filteredLessons.map((lesson, index) => {
                  return selectedLayout === 'grid' 
                    ? renderLessonCard(lesson, index)
                    : renderLessonRow(lesson, index);
                })}
              </motion.div>
            )}
          </>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Add New Lesson</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 hover:rotate-90 transition-transform"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lesson Title</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="Enter lesson title (e.g., Advanced Math)"
                    value={newLessonTitle}
                    onChange={(e) => setNewLessonTitle(e.target.value)}
                    autoFocus
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Grade Level</label>
                  <div className="flex flex-wrap gap-2">
                    {gradeOptions.map(grade => (
                      <button
                        key={grade}
                        type="button"
                        className={`px-3 py-1.5 rounded-lg text-sm flex items-center ${
                          newLessonGrade === grade
                            ? 'bg-blue-100 text-blue-600 border-2 border-blue-300'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-transparent'
                        }`}
                        onClick={() => setNewLessonGrade(grade)}
                      >
                        <Users size={16} className="mr-1" />
                        <span>{grade}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="pt-2">
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 flex items-start">
                    <div className="text-blue-500 mt-0.5 mr-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="16" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                      </svg>
                    </div>
                    <p className="text-sm text-blue-700">
                      You can add more details like objectives, topics, and resources after creating the lesson.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-800 font-medium transition-colors"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm disabled:opacity-50 disabled:pointer-events-none"
                  onClick={handleAddLesson}
                  disabled={!newLessonTitle.trim()}
                >
                  Add Lesson
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonsListPage;

