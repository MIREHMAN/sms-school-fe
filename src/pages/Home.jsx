// // LessonPlans.jsx

// import React from "react";

// const LessonPlans = () => {
//   return (
//     <div className="bg-gray-50 text-gray-800 min-h-screen">
//       <header className="bg-cyan-300 text-black p-4 border border-black shadow-md rounded">
//         <h1 className="text-2xl font-bold text-center">📚Sample Lesson Plans 2025</h1>
//       </header>

//       <main className="p-6 space-y-10">

//         {/* Humanities Section */}
//         <section className="bg-white p-6 rounded-2xl shadow-md">
//           <h2 className="text-xl font-bold mb-2 text-pink-400">Humanities - Grade 6</h2>
//           <p className="font-semibold">Objective:</p>
//           <p>Students will understand: Introduction to Humanities, Creation of Universe, Timeline.</p>
//           <div className="mt-4">
//             <p className="font-semibold">Topics:</p>
//             <ul className="list-disc list-inside">
//               <li>Primary & Secondary Sources</li>
//               <li>Thematic Connections</li>
//               <li>Timeline: BC, BCE, AD, CE</li>
//             </ul>
//           </div>
//           <div className="mt-4">
//             <p className="font-semibold">Videos:</p>
//             <div className="space-y-2">
//               <a className="text-blue-500 underline" href="https://www.youtube.com/watch?v=GncYOf29uc4" target="_blank">Big Bang Video</a><br />
//               <a className="text-blue-500 underline" href="https://www.youtube.com/watch?v=EXUr_VfIiSI" target="_blank">Historians</a><br />
//               <a className="text-blue-500 underline" href="https://www.youtube.com/watch?v=kOXfArLq6uY" target="_blank">Primary & Secondary Sources</a>
//             </div>
//           </div>
//           <div className="mt-4">
//             <p className="font-semibold">Assignments & Assessment:</p>
//             <ul className="list-disc list-inside">
//               <li>Comprehension Questions: Why are prophets sent?</li>
//               <li>How many prophets mentioned in Quran?</li>
//             </ul>
//           </div>
//           <p className="mt-2 text-sm text-gray-600">Date: 7-04-2025</p>
//         </section>

//         {/* Programming Section */}
//         <section className="bg-white p-6 rounded-2xl shadow-md">
//           <h2 className="text-xl font-bold mb-2 text-green-700">Programming - Grades 7 & 8</h2>
//           <p className="font-semibold">Objective:</p>
//           <p>Learn basics of Next.js and Tailwind CSS. Static vs Dynamic websites. Build responsive websites.</p>
//           <div className="mt-4">
//             <p className="font-semibold">Activities:</p>
//             <ul className="list-disc list-inside">
//               <li>Set up VS Code</li>
//               <li>Practice tags, live server usage</li>
//               <li>Multi-page responsive website building</li>
//             </ul>
//           </div>
//           <div className="mt-4">
//             <p className="font-semibold">Assignment & Assessment:</p>
//             <ul className="list-disc list-inside">
//               <li>Oral memorization of commands</li>
//               <li>Building websites individually</li>
//             </ul>
//           </div>
//           <p className="mt-2 text-sm text-gray-600">Date: 7-04-2025</p>
//         </section>

//         {/* Economics Section */}
//         <section className="bg-white p-6 rounded-2xl shadow-md">
//           <h2 className="text-xl font-bold mb-2 text-purple-700">Economics - Grade 9</h2>
//           <p className="font-semibold">Objective:</p>
//           <p>Understand Hunting-Gathering Stage, Pastoral Stage, Private Property, Exchange Economy.</p>
//           <div className="mt-4">
//             <p className="font-semibold">Activities:</p>
//             <ul className="list-disc list-inside">
//               <li>Barter Trade Simulation</li>
//               <li>Timeline Drawing: Evolution of Tools</li>
//             </ul>
//           </div>
//           <div className="mt-4">
//             <p className="font-semibold">Videos:</p>
//             <div className="space-y-2">
//               <a className="text-blue-500 underline" href="https://www.youtube.com/watch?v=GQAJLzsr9zM" target="_blank">Hunting & Gathering</a><br />
//               <a className="text-blue-500 underline" href="https://www.youtube.com/watch?v=GWGbOjlJDkU" target="_blank">Who are you</a>
//             </div>
//           </div>
//           <div className="mt-4">
//             <p className="font-semibold">Assignments & Assessment:</p>
//             <ul className="list-disc list-inside">
//               <li>Question solving & Dictation tests</li>
//             </ul>
//           </div>
//           <p className="mt-2 text-sm text-gray-600">Date: 7 to 11 Oct</p>
//         </section>

//         {/* English Grammar Section */}
//         <section className="bg-white p-6 rounded-2xl shadow-md">
//           <h2 className="text-xl font-bold mb-2 text-red-700">English Grammar - Grades 7 & 8</h2>
//           <p className="font-semibold">Objective:</p>
//           <p>Practice Present Simple and Past Simple Tenses through meaningful activities.</p>
//           <div className="mt-4">
//             <p className="font-semibold">Activities:</p>
//             <ul className="list-disc list-inside">
//               <li>Kahoot Quiz</li>
//               <li>Copy-based exercises</li>
//               <li>Speaking Activity: "My Weekend & Weekdays"</li>
//             </ul>
//           </div>
//           <div className="mt-4">
//             <p className="font-semibold">Assignment & Assessment:</p>
//             <ul className="list-disc list-inside">
//               <li>Quiz results & oral activities</li>
//             </ul>
//           </div>
//           <p className="mt-2 text-sm text-gray-600">Date: 7 to 11 Oct</p>
//         </section>

//       </main>
//     </div>
//   );
// };

// export default LessonPlans;


// import React, { useState } from 'react';

// const subjects = ["Humanities", "Mathematics", "Science", "Urdu"];
// const students = Array.from({ length: 25 }, (_, i) => `Student ${i + 1}`);

// function getRandomMarks() {
//   return Math.floor(Math.random() * 61) + 40; // Marks between 40 and 100
// }

// function assignGrade(avg) {
//   if (avg >= 90) return 'A+';
//   if (avg >= 80) return 'A';
//   if (avg >= 70) return 'B';
//   if (avg >= 60) return 'C';
//   if (avg >= 50) return 'D';
//   return 'F';
// }

// const generateResults = () => {
//   return students.map((name) => {
//     const marks = subjects.map(getRandomMarks);
//     const total = marks.reduce((a, b) => a + b, 0);
//     const average = total / subjects.length;
//     const grade = assignGrade(average);
//     return { name, marks, total, average: average.toFixed(2), grade };
//   });
// };

// const ResultSheet = () => {
//   const [results] = useState(generateResults());

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Grade 7 Result Sheet</h1>
//       <table className="table-auto w-full border-collapse border border-gray-400">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border border-gray-400 px-2 py-1 text-center">Name</th>
//             {subjects.map((subject) => (
//               <th key={subject} className="border border-gray-400 px-2 py-1 text-center">{subject}</th>
//             ))}
//             <th className="border border-gray-400 px-2 py-1 text-center">Total</th>
//             <th className="border border-gray-400 px-2 py-1 text-center">Average</th>
//             <th className="border border-gray-400 px-2 py-1 text-center">Grade</th>
//           </tr>
//         </thead>
//         <tbody>
//           {results.map((student, index) => (
//             <tr key={index}>
//               <td className="border border-gray-400 px-2 py-1 text-center">{student.name}</td>
//               {student.marks.map((mark, i) => (
//                 <td key={i} className="border border-gray-400 px-2 py-1 text-center">{mark}</td>
//               ))}
//               <td className="border border-gray-400 px-2 py-1 text-center">{student.total}</td>
//               <td className="border border-gray-400 px-2 py-1 text-center">{student.average}</td>
//               <td className="border border-gray-400 px-2 py-1 text-center">{student.grade}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ResultSheet;

// import React, { useState } from 'react';

// const subjects = ["Humanities", "Mathematics", "Science", "Urdu"];
// const students = Array.from({ length: 25 }, (_, i) => `Student ${i + 1}`);

// function getRandomMarks() {
//   return Math.floor(Math.random() * 61) + 40; // Marks between 40 and 100
// }

// function assignGrade(avg) {
//   if (avg >= 90) return 'A+';
//   if (avg >= 80) return 'A';
//   if (avg >= 70) return 'B';
//   if (avg >= 60) return 'C';
//   if (avg >= 50) return 'D';
//   return 'F';
// }

// const generateResults = () => {
//   return students.map((name) => {
//     const marks = subjects.map(getRandomMarks);
//     const total = marks.reduce((a, b) => a + b, 0);
//     const average = total / subjects.length;
//     const grade = assignGrade(average);
//     return { name, marks, total, average: average.toFixed(2), grade };
//   });
// };

// const examLinks = [
//   { grade: 6, url: "/exam-grade-6" },
//   { grade: 7, url: "/exam-grade-7" },
//   { grade: 8, url: "/exam-grade-8" },
//   { grade: 9, url: "/exam-grade-9" },
//   { grade: 10, url: "/exam-grade-10" },
// ];

// const datesheet = [
//   { date: "2025-05-01", subject: "English" },
//   { date: "2025-05-03", subject: "Mathematics" },
//   { date: "2025-05-05", subject: "Science" },
//   { date: "2025-05-07", subject: "Urdu" },
//   { date: "2025-05-09", subject: "Social Studies" },
// ];

// const ResultSheet = () => {
//   const [results] = useState(generateResults());

//   return (
//     <div className="p-4">
//       <div className="mb-6">
//         <h2 className="text-xl font-semibold mb-2">Exam Links</h2>
//         <ul className="list-disc list-inside">
//           {examLinks.map((link) => (
//             <li key={link.grade}>
//               <a href={link.url} className="text-blue-600 underline">Grade {link.grade} Exam</a>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="mb-6">
//         <h2 className="text-xl font-semibold mb-2">Sample Datesheet (Grade 6–10)</h2>
//         <table className="table-auto w-full border-collapse border border-gray-400 mb-4">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border border-gray-400 px-2 py-1 text-center">Date</th>
//               <th className="border border-gray-400 px-2 py-1 text-center">Subject</th>
//             </tr>
//           </thead>
//           <tbody>
//             {datesheet.map((item, index) => (
//               <tr key={index}>
//                 <td className="border border-gray-400 px-2 py-1 text-center">{item.date}</td>
//                 <td className="border border-gray-400 px-2 py-1 text-center">{item.subject}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ResultSheet;


import React from 'react';

const assignments = [
  { grade: 6, subject: "Science", task: "Write a report on water cycle", due: "2025-05-10" },
  { grade: 7, subject: "Mathematics", task: "Complete the algebra worksheet", due: "2025-05-11" },
  { grade: 8, subject: "Humanities", task: "Essay on historical event", due: "2025-05-12" },
  { grade: 9, subject: "Urdu", task: "Translate a paragraph into Urdu", due: "2025-05-13" },
  { grade: 10, subject: "Science", task: "Prepare a presentation on climate change", due: "2025-05-14" },
];

const StudentAssignments = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Student Assignments (Grade 6–10)</h2>
      <table className="table-auto w-full border-collapse border border-gray-400">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 px-2 py-1 text-center">Grade</th>
            <th className="border border-gray-400 px-2 py-1 text-center">Subject</th>
            <th className="border border-gray-400 px-2 py-1 text-center">Task</th>
            <th className="border border-gray-400 px-2 py-1 text-center">Due Date</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-400 px-2 py-1 text-center">{item.grade}</td>
              <td className="border border-gray-400 px-2 py-1 text-center">{item.subject}</td>
              <td className="border border-gray-400 px-2 py-1 text-center">{item.task}</td>
              <td className="border border-gray-400 px-2 py-1 text-center">{item.due}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentAssignments;
