import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  BookOpen,
  CalendarDays,
  Video,
  FileText,
  ClipboardList,
  Users,
  BarChart2,
  Bookmark,
} from "lucide-react";
import Performance from "@/components/Performance";
import Announcements from "@/components/Announcements";

const SingleLessonPage = () => {
  const { lessonId } = useParams();
  const [activeTab, setActiveTab] = useState("goals");

  // Mock data (replace with API calls)
  const lessonData = {
    id: lessonId,
    title: "Humanities - Grade 6",
    subject: "Humanities",
    grade: "Grade 6",
    date: "2025-07-04",
    teacher: "Mr. Smith",
    status: "Upcoming", // or "Completed"
    goals: {
      description: "Students will understand introduction to humanities, Creation of Universe, Timeline.",
      objectives: [
        "Introduction to Humanities",
        "Creation of Universe",
        "Timeline understanding"
      ]
    },
    topics: [
      "Primary & Secondary Sources",
      "Thematic Connection",
      "Timeline: BC, BCE, AD, CE"
    ],
    videos: [
      "Big Bang Video",
      "Historians",
      "Primary & Secondary Sources"
    ],
    assignments: [
      {
        title: "Comprehension Questions",
        questions: [
          "Why are prophets seeing?",
          "How many prophets mentioned in 'Quan'?"
        ],
        dueDate: "2025-07-11"
      }
    ]
  };

  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT SECTION (2/3 width) */}
      <div className="w-full xl:w-2/3">
        {/* TOP ROW: Lesson Info + Stats Cards */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* LESSON INFO CARD */}
          <div className="bg-blue-100 py-6 px-4 rounded-md flex-1 flex gap-4">
            <div className="w-1/3 flex justify-center">
              <div className="w-36 h-36 rounded-full bg-white flex items-center justify-center">
                <BookOpen size={48} className="text-blue-500" />
              </div>
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <h1 className="text-xl font-semibold">
                {lessonData.title}
              </h1>
              <p className="text-sm text-gray-500">
                {lessonData.goals.description}
              </p>
              <div className="flex flex-wrap gap-3 text-xs font-medium">
                <div className="flex items-center gap-2">
                  <CalendarDays size={14} />
                  <span>{lessonData.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={14} />
                  <span>{lessonData.teacher}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bookmark size={14} />
                  <span>{lessonData.subject}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ClipboardList size={14} />
                  <span>{lessonData.grade}</span>
                </div>
              </div>
            </div>
          </div>

          {/* STATS CARDS */}
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            <InfoCard 
              icon={<BarChart2 size={24} />} 
              title={lessonData.status} 
              subtitle="Status" 
            />
            <InfoCard 
              icon={<FileText size={24} />} 
              title={lessonData.topics.length} 
              subtitle="Topics" 
            />
            <InfoCard 
              icon={<Video size={24} />} 
              title={lessonData.videos.length} 
              subtitle="Videos" 
            />
            <InfoCard 
              icon={<ClipboardList size={24} />} 
              title={lessonData.assignments.length} 
              subtitle="Assignments" 
            />
          </div>
        </div>

        {/* BOTTOM: Tabbed Content */}
        <div className="mt-4 bg-white rounded-md p-4">
          <div className="flex gap-4 border-b pb-2 mb-4">
            <button
              className={`pb-1 ${activeTab === "goals" ? "border-b-2 border-blue-500" : ""}`}
              onClick={() => setActiveTab("goals")}
            >
              Goals & Objectives
            </button>
            <button
              className={`pb-1 ${activeTab === "topics" ? "border-b-2 border-blue-500" : ""}`}
              onClick={() => setActiveTab("topics")}
            >
              Topics
            </button>
            <button
              className={`pb-1 ${activeTab === "resources" ? "border-b-2 border-blue-500" : ""}`}
              onClick={() => setActiveTab("resources")}
            >
              Resources
            </button>
            <button
              className={`pb-1 ${activeTab === "assignments" ? "border-b-2 border-blue-500" : ""}`}
              onClick={() => setActiveTab("assignments")}
            >
              Assignments
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "goals" && (
            <div className="space-y-4">
              <h3 className="font-semibold">Learning Goals</h3>
              <p>{lessonData.goals.description}</p>
              
              <h3 className="font-semibold mt-4">Specific Objectives</h3>
              <ul className="list-disc pl-5 space-y-2">
                {lessonData.goals.objectives.map((obj, index) => (
                  <li key={index}>{obj}</li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "topics" && (
            <div className="space-y-4">
              <h3 className="font-semibold">Covered Topics</h3>
              <ul className="list-disc pl-5 space-y-2">
                {lessonData.topics.map((topic, index) => (
                  <li key={index}>{topic}</li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "resources" && (
            <div className="space-y-4">
              <h3 className="font-semibold">Video Resources</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {lessonData.videos.map((video, index) => (
                  <div key={index} className="border rounded-md p-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <Video size={16} />
                    </div>
                    <div>
                      <h3 className="font-medium">{video}</h3>
                      <button className="text-blue-500 text-sm">Watch</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "assignments" && (
            <div className="space-y-4">
              {lessonData.assignments.map((assignment, index) => (
                <div key={index} className="border rounded-md p-4">
                  <h3 className="font-semibold">{assignment.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">Due: {assignment.dueDate}</p>
                  
                  <h4 className="font-medium mt-3">Questions:</h4>
                  <ul className="list-disc pl-5 space-y-1 mt-2">
                    {assignment.questions.map((q, qIndex) => (
                      <li key={qIndex}>{q}</li>
                    ))}
                  </ul>
                  
                  <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md text-sm">
                    View Submission
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT SECTION (1/3 width) */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Lesson Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            <button className="p-3 rounded-md bg-blue-100">📅 Add to Calendar</button>
            <button className="p-3 rounded-md bg-purple-100">📚 Related Lessons</button>
            <button className="p-3 rounded-md bg-pink-100">👨‍🏫 Contact Teacher</button>
            <button className="p-3 rounded-md bg-yellow-100">📂 Lesson Materials</button>
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

export default SingleLessonPage;