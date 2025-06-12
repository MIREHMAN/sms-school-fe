import React, { useState } from "react";
import {
  BookOpenCheck,
  Clock,
  CalendarDays,
  MapPin,
  BarChart2,
  ClipboardList,
  AlertCircle,
  Bookmark,
} from "lucide-react";
import Performance from "@/components/Performance";
import Announcements from "@/components/Announcements";

const SingleExamPage = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  // Mock data (replace with API calls)
  const examsData = {
    upcoming: [
      {
        id: 1,
        subject: "Math",
        daysLeft: 33,
        date: "Saturday, May 10",
        time: "10:00 AM",
        duration: "2h 30min",
        location: "Main Campus, Room 301B",
        status: "upcoming"
      },
      {
        id: 2,
        subject: "English",
        daysLeft: 31,
        date: "Monday, May 12",
        time: "09:00 AM",
        duration: "2h",
        location: "Main Campus, Room 205A",
        status: "upcoming"
      },
      {
        id: 3,
        subject: "History",
        daysLeft: 29,
        date: "Wednesday, May 14",
        time: "11:00 AM",
        duration: "1h 45min",
        location: "North Campus, Room 102",
        status: "upcoming"
      },
      {
        id: 4,
        subject: "Biology",
        daysLeft: 27,
        date: "Friday, May 16",
        time: "08:30 AM",
        duration: "2h 15min",
        location: "Science Building, Lab 3",
        status: "upcoming"
      }
    ],
    completed: [
      {
        id: 5,
        subject: "Chemistry",
        score: "A-",
        date: "April 20, 2025",
        feedback: "Excellent work on practical section"
      }
    ]
  };

  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT SECTION (2/3 width) */}
      <div className="w-full xl:w-2/3">
        {/* TOP ROW: Exam Stats Cards */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* EXAM SUMMARY CARD */}
          <div className="bg-blue-100 py-6 px-4 rounded-md flex-1 flex gap-4">
            <div className="w-1/3 flex justify-center">
              <div className="w-36 h-36 rounded-full bg-white flex items-center justify-center">
                <BookOpenCheck size={48} className="text-blue-500" />
              </div>
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <h1 className="text-xl font-semibold">
                Upcoming Exams
              </h1>
              <p className="text-sm text-gray-500">
                {examsData.upcoming.length} scheduled exams in the next month
              </p>
              <div className="flex flex-wrap gap-3 text-xs font-medium">
                <div className="flex items-center gap-2">
                  <AlertCircle size={14} />
                  <span>Next: Math on May 10</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} />
                  <span>33 days until next exam</span>
                </div>
              </div>
            </div>
          </div>

          {/* STATS CARDS */}
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            <InfoCard 
              icon={<BarChart2 size={24} />} 
              title={examsData.upcoming.length} 
              subtitle="Upcoming Exams" 
            />
            <InfoCard 
              icon={<Bookmark size={24} />} 
              title="Math" 
              subtitle="Next Subject" 
            />
            <InfoCard 
              icon={<Clock size={24} />} 
              title="33 days" 
              subtitle="Until Next Exam" 
            />
            <InfoCard 
              icon={<ClipboardList size={24} />} 
              title={examsData.completed.length} 
              subtitle="Completed Exams" 
            />
          </div>
        </div>

        {/* BOTTOM: Tabbed Content */}
        <div className="mt-4 bg-white rounded-md p-4">
          <div className="flex gap-4 border-b pb-2 mb-4">
            <button
              className={`pb-1 ${activeTab === "upcoming" ? "border-b-2 border-blue-500" : ""}`}
              onClick={() => setActiveTab("upcoming")}
            >
              Upcoming Exams
            </button>
            <button
              className={`pb-1 ${activeTab === "completed" ? "border-b-2 border-blue-500" : ""}`}
              onClick={() => setActiveTab("completed")}
            >
              Completed Exams
            </button>
            <button
              className={`pb-1 ${activeTab === "results" ? "border-b-2 border-blue-500" : ""}`}
              onClick={() => setActiveTab("results")}
            >
              Results
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "upcoming" && (
            <div className="space-y-4">
              {examsData.upcoming.map((exam) => (
                <div key={exam.id} className="border rounded-md p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{exam.subject}</h3>
                      <p className="text-sm text-gray-500">{exam.daysLeft} days left</p>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      Upcoming
                    </span>
                  </div>
                  
                  <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                      <CalendarDays size={16} className="text-gray-400" />
                      <span>{exam.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-gray-400" />
                      <span>{exam.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-gray-400" />
                      <span>{exam.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-gray-400" />
                      <span>{exam.location}</span>
                    </div>
                  </div>
                  
                  <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md text-sm">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === "completed" && (
            <div className="space-y-4">
              {examsData.completed.map((exam) => (
                <div key={exam.id} className="border rounded-md p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{exam.subject}</h3>
                      <p className="text-sm text-gray-500">Completed on {exam.date}</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      Completed
                    </span>
                  </div>
                  
                  <div className="mt-3">
                    <div className="flex items-center gap-4">
                      <span className="font-medium">Score:</span>
                      <span className="text-lg font-bold">{exam.score}</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{exam.feedback}</p>
                  </div>
                  
                  <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md text-sm">
                    View Results
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === "results" && (
            <div className="flex items-center justify-center h-64 text-gray-400">
              <p>Exam results will appear here after completion</p>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT SECTION (1/3 width) */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Exam Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            <button className="p-3 rounded-md bg-blue-100">📅 Exam Calendar</button>
            <button className="p-3 rounded-md bg-purple-100">📚 Study Materials</button>
            <button className="p-3 rounded-md bg-pink-100">📝 Practice Tests</button>
            <button className="p-3 rounded-md bg-yellow-100">📊 Past Results</button>
          </div>
        </div>
        <Performance />
        <Announcements />
      </div>
    </div>
  );
};

// Reuse your existing InfoCard component
const InfoCard = ({ icon, title, subtitle }) => (
  <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%]">
    {icon}
    <div>
      <h1 className="text-xl font-semibold">{title}</h1>
      <span className="text-sm text-gray-400">{subtitle}</span>
    </div>
  </div>
);

export default SingleExamPage;