import React from "react";
import { useParams } from "react-router-dom";
import { Video, BookOpen, ClipboardList, Target } from "lucide-react";

const SingleLessonPage = () => {
  const { lessonId } = useParams();

  // Mock data (replace with API calls)
  const lessonData = {
    id: lessonId,
    title: "Humanities - Grade 6",
    subject: "Humanities",
    grade: "Grade 6",
    date: "2025-07-04",
    teacher: "Mr. Smith",
    status: "Upcoming",
    goals: {
      description:
        "Students will understand introduction to humanities, Creation of Universe, Timeline.",
      objectives: [
        "Introduction to Humanities",
        "Creation of Universe",
        "Timeline understanding",
      ],
    },
    topics: [
      "Primary & Secondary Sources",
      "Thematic Connection",
      "Timeline: BC, BCE, AD, CE",
    ],
    videos: [
      "Big Bang Video",
      "Historians",
      "Primary & Secondary Sources",
    ],
    assignments: [
      {
        title: "Comprehension Questions",
        questions: [
          "Why are prophets seeing?",
          "How many prophets mentioned in 'Quan'?",
        ],
        dueDate: "2025-07-11",
      },
    ],
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl shadow-md space-y-2">
        <h1 className="text-2xl font-bold">{lessonData.title}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <p><strong>Subject:</strong> {lessonData.subject}</p>
          <p><strong>Grade:</strong> {lessonData.grade}</p>
          <p><strong>Date:</strong> {lessonData.date}</p>
          <p><strong>Teacher:</strong> {lessonData.teacher}</p>
          <p>
            <strong>Status:</strong>{" "}
            <span className="text-blue-600 font-semibold">{lessonData.status}</span>
          </p>
        </div>
      </div>

      {/* Learning Goals */}
      <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <Target size={20} /> Learning Goals
        </div>
        <p>{lessonData.goals.description}</p>

        <h4 className="font-semibold mt-2">Specific Objectives:</h4>
        <ul className="list-disc pl-5 space-y-1">
          {lessonData.goals.objectives.map((obj, index) => (
            <li key={index}>{obj}</li>
          ))}
        </ul>
      </div>

      {/* Topics */}
      <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <BookOpen size={20} /> Covered Topics
        </div>
        <ul className="list-disc pl-5 space-y-1">
          {lessonData.topics.map((topic, index) => (
            <li key={index}>{topic}</li>
          ))}
        </ul>
      </div>

      {/* Video Resources */}
      <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <Video size={20} /> Video Resources
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lessonData.videos.map((video, index) => (
            <div
              key={index}
              className="border rounded-md p-3 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <Video size={18} />
              </div>
              <div>
                <h3 className="font-medium">{video}</h3>
                <button className="text-blue-500 text-sm hover:underline">Watch</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Assignments */}
      <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <ClipboardList size={20} /> Assignments
        </div>
        {lessonData.assignments.map((assignment, index) => (
          <div key={index} className="border rounded-md p-4 space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{assignment.title}</h3>
              <p className="text-sm text-gray-500">
                Due: {assignment.dueDate}
              </p>
            </div>
            <ul className="list-disc pl-5 space-y-1">
              {assignment.questions.map((q, qIndex) => (
                <li key={qIndex}>{q}</li>
              ))}
            </ul>
            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md text-sm">
              View Submission
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleLessonPage;
