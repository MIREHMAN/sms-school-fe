export const ROUTES = Object.freeze({
  homePage: "/",
  aboutPage: "/about",

  // List pages
  teachers: "/list/teachers",
  students: "/list/students",
  parents: "/list/parents",
  subjects: "/list/subjects",
  classes: "/list/classes",
  lessons: "/list/lessons",
  exams: "/list/exams",
  assignments: "/list/assignments",
  results: "/list/results",
  attendance: "/list/attendance",
  events: "/list/events",
  messages: "/list/messages",
  announcements: "/list/announcements",


  // Detail (single) pages
  teacherDetail: "/teacher/:id",
  studentDetail: "/student/:id",
  parentDetail: "/parent/:id",
  subjectDetail: "/subject/:id",
  classDetail: "/class/:id",
  lessonDetail: "/lesson/:id",
  examDetail: "/exam/:id",
  assignmentDetail: "/assignment/:id",
  resultDetail: "/result/:id",
  attendanceDetail: "/attendance/:id",
  eventDetail: "/event/:id",
  messageDetail: "/message/:id",
  announcementDetail: "/announcement/:id",
});