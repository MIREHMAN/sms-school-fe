import React, { useEffect, useState } from "react";
import {
  Users,
  BookOpen,
  CalendarCheck,
  ClipboardList,
  FileText,
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

// Table Component
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

// Main Page
const SingleClassPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchClassData = async () => {
      const response = {
        id: "class-101",
        name: "Grade 10 - A",
        description: "This class includes students from Grade 10 with a focus on core subjects and collaborative learning.",
        teacher: "Mr. Daniel Edwards",
        email: "daniel.edwards@school.edu",
        students: 28,
        schedule: "Mon - Fri, 8:00 AM - 2:00 PM",
        room: "Room 201",
        subjects: 6,
        lessons: [
          { title: "History - WW2", date: "2025-06-10", subject: "History" },
          { title: "Physics - Newton's Laws", date: "2025-06-09", subject: "Physics" },
        ],
        events: [
          { name: "Science Fair", date: "2025-06-20", type: "Competition" },
          { name: "Parent-Teacher Meeting", date: "2025-06-18", type: "Meeting" },
        ],
        materials: [
          { title: "Class Timetable", link: "#" },
          { title: "Class Guidelines", link: "#" },
        ],
      };

      setTimeout(() => {
        setData(response);
      }, 500);
    };

    fetchClassData();
  }, []);

  if (!data) return <div className="p-4">Loading class data...</div>;

  return (
    <div className="flex-1 p-4 flex flex-col xl:flex-row gap-4">
      {/* LEFT */}
      <div className="w-full xl:w-2/3 space-y-4">
        <div className="bg-white p-4 rounded-md">
          <h1 className="text-2xl font-semibold mb-2">{data.name}</h1>
          <p className="text-sm text-gray-500">Class ID: {data.id}</p>
          <p className="text-gray-600 mt-2">{data.description}</p>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-4">
          <InfoCard icon={<Users />} title="Class Teacher" subtitle={data.teacher} />
          <InfoCard icon={<Users />} title="Students" subtitle={`${data.students} Students`} />
          <InfoCard icon={<CalendarCheck />} title="Schedule" subtitle={data.schedule} />
          <InfoCard icon={<BookOpen />} title="Subjects" subtitle={`${data.subjects} Subjects`} />
          <InfoCard icon={<ClipboardList />} title="Classroom" subtitle={data.room} />
        </div>

        {/* Recent Lessons */}
        <Card title="Recent Lessons" icon={<FileText />}>
          <Table
            headers={["Lesson", "Date", "Subject"]}
            data={data.lessons.map((l) => [l.title, l.date, l.subject])}
          />
        </Card>
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3 space-y-4">
        {/* Events */}
        <Card title="Upcoming Events" icon={<CalendarCheck />}>
          <Table
            headers={["Event", "Date", "Type"]}
            data={data.events.map((e) => [e.name, e.date, e.type])}
          />
        </Card>

        {/* Study Materials */}
        <Card title="Class Materials" icon={<FileDown />}>
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

export default SingleClassPage;
