import React from "react";
import {
  CalendarDays,
  Mail,
  Phone,
  Droplet,
  CalendarClock,
  BarChart2,
  BookOpen,
  GraduationCap,
  Users,
} from "lucide-react";
import Performance from "@/components/Performance";
import Announcements from "@/components/Announcements";

// Replace with actual components or remove if not used


const SingleStudentPage = () => {
  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER INFO CARD */}
          <div className="bg-blue-100 py-6 px-4 rounded-md flex-1 flex gap-4">
            <div className="w-1/3">
              <img
                src="https://images.pexels.com/photos/5414817/pexels-photo-5414817.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt=""
                className="w-36 h-36 rounded-full object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <h1 className="text-xl font-semibold">Cameron Moran</h1>
              <p className="text-sm text-gray-500">
                Passionate learner currently enrolled in Grade 6.
              </p>
              <div className="flex flex-wrap gap-3 text-xs font-medium">
                <div className="flex items-center gap-2">
                  <Droplet size={14} />
                  <span>A+</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarClock size={14} />
                  <span>January 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={14} />
                  <span>user@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={14} />
                  <span>+1 234 567</span>
                </div>
              </div>
            </div>
          </div>

          {/* SMALL CARDS */}
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            <InfoCard icon={<BarChart2 size={24} />} title="90%" subtitle="Attendance" />
            <InfoCard icon={<GraduationCap size={24} />} title="6th" subtitle="Grade" />
            <InfoCard icon={<BookOpen size={24} />} title="18" subtitle="Lessons" />
            <InfoCard icon={<Users size={24} />} title="6A" subtitle="Class" />
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
          <h1 className="text-xl font-semibold mb-4">Student's Schedule</h1>
          {/* Calendar Placeholder */}
          <div className="border border-gray-200 rounded-md h-full flex items-center justify-center text-gray-400">
            <p className="text-sm">Calendar view coming soon...</p>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            <button className="p-3 rounded-md bg-blue-100">📚 Student's Lessons</button>
            <button className="p-3 rounded-md bg-purple-100">👨‍🏫 Student's Teachers</button>
            <button className="p-3 rounded-md bg-pink-100">📝 Student's Exams</button>
            <button className="p-3 rounded-md bg-blue-100">📂 Student's Assignments</button>
            <button className="p-3 rounded-md bg-yellow-100">📊 Student's Results</button>
          </div>
        </div>
        <Performance />
        <Announcements />
      </div>
    </div>
  );
};

const InfoCard = ({ icon, title, subtitle }) => (
  <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%]">
    {icon}
    <div>
      <h1 className="text-xl font-semibold">{title}</h1>
      <span className="text-sm text-gray-400">{subtitle}</span>
    </div>
  </div>
);

export default SingleStudentPage;
