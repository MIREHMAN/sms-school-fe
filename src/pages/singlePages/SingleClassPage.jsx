import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Users,
  BookOpen,
  CalendarDays,
  ClipboardList,
  BarChart2,
  Mail,
  Phone,
  GraduationCap,
} from "lucide-react";
import Performance from "@/components/Performance";
import Announcements from "@/components/Announcements";

const SingleClassPage = () => {
  const { classId } = useParams();
  const [activeTab, setActiveTab] = useState("students");

  // Mock data (replace with API calls)
  const classData = {
    id: classId,
    name: "Grade 6",
    level: "Middle School",
    schedule: "Mon-Fri (8:00 AM - 3:00 PM)",
    capacity: { enrolled: 26, total: 35 },
    homeroomTeacher: "Ms. Johnson",
    contact: { email: "grade6@school.edu", phone: "+1 234 567 890" },
    attendance: { present: 24, absent: 2, late: 0 },
    assignments: [
      { id: 1, title: "Math Homework", due: "2025-06-15" },
      { id: 2, title: "Science Project", due: "2025-06-20" },
    ],
    upcomingExams: [
      { id: 1, subject: "Math", date: "2025-06-25" },
    ],
  };

  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT SECTION (2/3 width) */}
      <div className="w-full xl:w-2/3">
        {/* TOP ROW: Class Info + Stats Cards */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* CLASS INFO CARD */}
          <div className="bg-blue-100 py-6 px-4 rounded-md flex-1 flex gap-4">
            <div className="w-1/3 flex justify-center">
              <div className="w-36 h-36 rounded-full bg-white flex items-center justify-center">
                <Users size={48} className="text-blue-500" />
              </div>
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <h1 className="text-xl font-semibold">
                {classData.name} ({classData.level})
              </h1>
              <p className="text-sm text-gray-500">
                Taught by {classData.homeroomTeacher}. {classData.schedule}
              </p>
              <div className="flex flex-wrap gap-3 text-xs font-medium">
                <div className="flex items-center gap-2">
                  <Mail size={14} />
                  <span>{classData.contact.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={14} />
                  <span>{classData.contact.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={14} />
                  <span>
                    {classData.capacity.enrolled}/{classData.capacity.total} students
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* STATS CARDS */}
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            <InfoCard 
              icon={<BarChart2 size={24} />} 
              title={`${Math.round((classData.attendance.present / classData.capacity.enrolled) * 100)}%`} 
              subtitle="Attendance" 
            />
            <InfoCard 
              icon={<GraduationCap size={24} />} 
              title={classData.name} 
              subtitle="Grade Level" 
            />
            <InfoCard 
              icon={<BookOpen size={24} />} 
              title={classData.assignments.length} 
              subtitle="Active Assignments" 
            />
            <InfoCard 
              icon={<ClipboardList size={24} />} 
              title={classData.upcomingExams.length} 
              subtitle="Upcoming Exams" 
            />
          </div>
        </div>

        {/* BOTTOM: Tabbed Content */}
        <div className="mt-4 bg-white rounded-md p-4">
          <div className="flex gap-4 border-b pb-2 mb-4">
            <button
              className={`pb-1 ${activeTab === "students" ? "border-b-2 border-blue-500" : ""}`}
              onClick={() => setActiveTab("students")}
            >
              Students
            </button>
            <button
              className={`pb-1 ${activeTab === "attendance" ? "border-b-2 border-blue-500" : ""}`}
              onClick={() => setActiveTab("attendance")}
            >
              Attendance
            </button>
            <button
              className={`pb-1 ${activeTab === "assignments" ? "border-b-2 border-blue-500" : ""}`}
              onClick={() => setActiveTab("assignments")}
            >
              Assignments
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "students" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: classData.capacity.enrolled }).map((_, i) => (
                <div key={i} className="border rounded-md p-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <Users size={16} />
                  </div>
                  <div>
                    <h3 className="font-medium">Student {i + 1}</h3>
                    <p className="text-xs text-gray-500">ID: {1000 + i}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "attendance" && (
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-md">
                <h3 className="font-semibold">Today's Attendance</h3>
                <div className="flex gap-6 mt-2">
                  <div>
                    <span className="text-green-600">●</span> Present: {classData.attendance.present}
                  </div>
                  <div>
                    <span className="text-red-600">●</span> Absent: {classData.attendance.absent}
                  </div>
                  <div>
                    <span className="text-yellow-600">●</span> Late: {classData.attendance.late}
                  </div>
                </div>
              </div>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm">
                Take Attendance
              </button>
            </div>
          )}

          {activeTab === "assignments" && (
            <div className="space-y-3">
              {classData.assignments.map((assignment) => (
                <div key={assignment.id} className="border-b pb-3">
                  <h3 className="font-medium">{assignment.title}</h3>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Due: {assignment.due}</span>
                    <button className="text-blue-500">View Details</button>
                  </div>
                </div>
              ))}
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md text-sm">
                + New Assignment
              </button>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT SECTION (1/3 width) */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Class Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            <button className="p-3 rounded-md bg-blue-100">📅 Class Schedule</button>
            <button className="p-3 rounded-md bg-purple-100">👨‍🏫 Teaching Staff</button>
            <button className="p-3 rounded-md bg-pink-100">📝 Upcoming Exams</button>
            <button className="p-3 rounded-md bg-yellow-100">📊 Performance Reports</button>
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

export default SingleClassPage;