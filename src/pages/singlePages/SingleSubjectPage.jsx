import React from "react";
import {
  CalendarDays,
  Mail,
  Phone,
  Droplet,
  CalendarClock,
  BarChart2,
  BookOpen,
  Users,
} from "lucide-react";
import Performance from "@/components/Performance";
import Announcements from "@/components/Announcements";

const SingleSubjectPage = ({
  icon = "👨‍🎓", // Default icon if not provided
  subject = "Mathematics",
  overview = "Comprehensive course covering fundamental mathematical concepts.",
  topics = ["Algebra", "Geometry", "Calculus", "Statistics"],
  instructor = "Sarah Johnson",
  email = "teacher@gmail.com",
  schedule = { days: "Mon, Wed, Fri", time: "9:00 AM - 10:30 AM" },
  room = "Room 205",
  textbook = "Advanced Mathematics 10th Edition",
  pdfLink = "#",
}) => {
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
                src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Student"
                className="w-36 h-36 rounded-full object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <h1 className="text-xl font-semibold">John Doe</h1>
              <p className="text-sm text-gray-500">
                High school student specializing in Science and Mathematics.
              </p>
              <div className="flex flex-wrap gap-3 text-xs font-medium">
                <div className="flex items-center gap-2">
                  <Droplet size={14} />
                  <span>B+</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarClock size={14} />
                  <span>Grade 11</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={14} />
                  <span>student@gmail.com</span>
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
            <InfoCard icon={<BarChart2 size={24} />} title="3.8" subtitle="GPA" />
            <InfoCard icon={<Users size={24} />} title="5" subtitle="Subjects" />
            <InfoCard icon={<BookOpen size={24} />} title="Science" subtitle="Major" />
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
          <h1 className="text-xl font-semibold mb-4">Subject Details: {subject}</h1>
          
          <section className="mb-6">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <span>📝</span> Overview
            </h3>
            <p className="text-gray-600 mt-2">{overview}</p>
          </section>

          <section className="mb-6">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <span>📂</span> Topics
            </h3>
            <ul className="list-disc pl-5 mt-2 grid grid-cols-2 gap-2">
              {topics.map((topic, idx) => (
                <li key={idx} className="text-gray-600">{topic}</li>
              ))}
            </ul>
          </section>

          <section className="mb-6">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <span>👩‍🏫</span> Instructor
            </h3>
            <p className="text-gray-600 mt-2"><strong>{instructor}</strong></p>
            <p className="text-gray-600">Email: <a href={`mailto:${email}`} className="text-blue-500">{email}</a></p>
          </section>

          <section className="mb-6">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <span>📅</span> Schedule
            </h3>
            <p className="text-gray-600 mt-2"><strong>Days:</strong> {schedule.days}</p>
            <p className="text-gray-600"><strong>Time:</strong> {schedule.time}</p>
            <p className="text-gray-600"><strong>Room:</strong> {room}</p>
          </section>

          <section>
            <h3 className="text-lg font-medium flex items-center gap-2">
              <span>📚</span> Textbook
            </h3>
            <p className="text-gray-600 mt-2"><strong>{textbook}</strong></p>
            <p className="mt-2">
              <a href={pdfLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 flex items-center gap-1">
                <span>🔗</span> Download PDF
              </a>
            </p>
          </section>
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            <button className="p-3 rounded-md bg-blue-100">📚 My Subjects</button>
            <button className="p-3 rounded-md bg-purple-100">📅 My Schedule</button>
            <button className="p-3 rounded-md bg-pink-100">📝 My Assignments</button>
            <button className="p-3 rounded-md bg-blue-100">📊 My Grades</button>
            <button className="p-3 rounded-md bg-yellow-100">🏆 My Achievements</button>
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

export default SingleSubjectPage;