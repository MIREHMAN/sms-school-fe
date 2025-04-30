import { Route, Routes } from "react-router-dom";

// Routes URLs
import { ROUTES } from "../constants/routes";

// Components

import Home from "./Home";
import DashboardLayout from "./Layout";
import TeacherListPage from "./list/Teachers";
import StudentListPage from "./list/Students";
import SubjectsListPage from "./list/Subjects";
import ParentListPage from "./list/Parents";
import ClassesListPage from "./list/Classes";
import LessonsListPage from "./list/Lessons";
import ExamsListPage from "./list/Exams";
import AssignmentsListPage from "@/pages/list/Assingments";
import ResultListPage from "./list/Results";
import AttendanceListPage from "@/pages/list/Attandence"
import AnnouncementsListPage from "@/pages/list/Announcements"




export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Home />} />
        <Route path={ROUTES.teachers} element={<TeacherListPage />} />
        <Route path={ROUTES.students} element={<StudentListPage />} />
        <Route path={ROUTES.parents} element={<ParentListPage />} />
        <Route path={ROUTES.subjects} element={<SubjectsListPage />} />
        <Route path={ROUTES.classes} element={<ClassesListPage />} />
        <Route path={ROUTES.lessons} element={<LessonsListPage/>} />
        <Route path={ROUTES.exams} element={<ExamsListPage />} />
        <Route path={ROUTES.assignments} element={<AssignmentsListPage />} />
        <Route path={ROUTES.results} element={<ResultListPage />} />
        <Route path={ROUTES.attendance} element={<AttendanceListPage />} />
        <Route path={ROUTES.events} element={<ParentListPage />} />
        <Route path={ROUTES.messages} element={<ParentListPage />} />
        <Route path={ROUTES.announcements} element={<AnnouncementsListPage />} />
     
      </Route>
    </Routes>
  );
}
