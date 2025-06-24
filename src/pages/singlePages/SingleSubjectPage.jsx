import React, { useEffect, useState } from "react";
import {
  BookOpen,
  FileText,
  Users,
  CalendarCheck,
  ClipboardList,
  FileDown,
} from "lucide-react";

// Reusable Info Card
const InfoCard = ({ icon, title, subtitle }) => (
  <div className="bg-white p-4 rounded-md flex items-start gap-3">
    <div className="text-blue-500">{icon}</div>
    <div>
      <h3 className="text-md font-medium">{title}</h3>
      <p className="text-sm text-gray-600">{subtitle}</p>
    </div>
  </div>
);

// Card Container
const Card = ({ title, icon, children }) => (
  <div className="bg-white p-4 rounded-md">
    <h3 className="text-md font-semibold flex items-center gap-2 mb-2">
      {icon} {title}
    </h3>
    {children}
  </div>
);

// Basic Table Component
const Table = ({ headers, data }) => (
  <div className="overflow-x-auto">
    <table className="text-sm w-full border">
      <thead className="bg-gray-100">
        <tr>
          {headers.map((h, i) => (
            <th key={i} className="text-left p-2 border-b text-gray-700">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i} className="border-b hover:bg-gray-50">
            {row.map((cell, j) => (
              <td key={j} className="p-2">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Main Page Component
const SingleSubjectPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulated API response with `id`
    const fetchData = async () => {
      const response = {
        id: "subj-123",
        subject: "Mathematics",
        overview:
          "Comprehensive course covering fundamental mathematical concepts.",
        topics: ["Algebra", "Geometry", "Calculus", "Statistics"],
        instructor: "Sarah Johnson",
        email: "teacher@gmail.com",
        schedule: { days: "Mon, Wed, Fri", time: "9:00 AM - 10:30 AM" },
        room: "Room 205",
        textbook: "Advanced Mathematics 10th Edition",
        pdfLink: "#",
        assignments: [
          { title: "Algebra Worksheet", due: "2025-06-15", status: "Submitted" },
          { title: "Geometry Project", due: "2025-06-20", status: "Pending" },
        ],
        exams: [
          { name: "Midterm", date: "2025-06-05", score: "85%" },
          { name: "Quiz 3", date: "2025-06-01", score: "92%" },
        ],
        materials: [
          { title: "Lecture Notes - Algebra", link: "#" },
          { title: "Geometry Slides", link: "#" },
        ],
        attendance: "Present: 24 / 28 classes (85.7%)",
      };

      // Simulate loading delay
      setTimeout(() => {
        setData(response);
      }, 500);
    };

    fetchData();
  }, []);

  if (!data) return <div className="p-4">Loading subject data...</div>;

  return (
    <div className="flex-1 p-4 flex flex-col xl:flex-row gap-4">
      {/* LEFT */}
      <div className="w-full xl:w-2/3 space-y-4">
        <div className="bg-white p-4 rounded-md">
          <h1 className="text-2xl font-semibold mb-2 flex items-center gap-2">
             {data.subject}
          </h1>
          <p className="text-sm text-gray-500">Subject ID: {data.id}</p>
          <p className="text-gray-600 mt-2">{data.overview}</p>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-4">
          <InfoCard icon={<Users />} title="Instructor" subtitle={data.instructor} />
          <InfoCard icon={<BookOpen />} title="Textbook" subtitle={data.textbook} />
          <InfoCard
            icon={<CalendarCheck />}
            title="Schedule"
            subtitle={`${data.schedule.days}, ${data.schedule.time}`}
          />
          <InfoCard icon={<ClipboardList />} title="Room" subtitle={data.room} />
        </div>

        {/* Topics */}
        <div className="bg-white p-4 rounded-md">
          <h2 className="text-lg font-semibold mb-2">Topics Covered</h2>
          <ul className="list-disc pl-5 grid grid-cols-2 gap-1 text-gray-700">
            {data.topics.map((topic, idx) => (
              <li key={idx}>{topic}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3 space-y-4">
        {/* Assignments */}
        <Card title="Recent Assignments" icon={<FileText />}>
          <Table
            headers={["Title", "Due", "Status"]}
            data={data.assignments.map((a) => [a.title, a.due, a.status])}
          />
        </Card>

        {/* Exams */}
        <Card title="Recent Exams" icon={<FileText />}>
          <Table
            headers={["Exam", "Date", "Score"]}
            data={data.exams.map((e) => [e.name, e.date, e.score])}
          />
        </Card>

        {/* Materials */}
        <Card title="Study Materials" icon={<FileDown />}>
          <ul className="text-sm text-blue-600 space-y-1">
            {data.materials.map((m, idx) => (
              <li key={idx}>
                <a href={m.link} target="_blank" rel="noopener noreferrer">
                  {m.title}
                </a>
              </li>
            ))}
          </ul>
        </Card>

       
      </div>
    </div>
  );
};

export default SingleSubjectPage;
