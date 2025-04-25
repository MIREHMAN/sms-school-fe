import { Route, Routes } from "react-router-dom";

// Routes URLs
import { ROUTES } from "../constants/routes";

// Components

import Home from "./Home";
import DashboardLayout from "./Layout";
import TeacherListPage from "./list/Teachers";
import StudentListPage from "./list/Students";
import SubjectsListPage from "./list/Subjects";
import LessonsPage from "./Lessons";
import ParentListPage from "./list/Parents";



export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Home />} />
        <Route path={ROUTES.teachers} element={<TeacherListPage />} />
        <Route path={ROUTES.students} element={<StudentListPage />} />
        <Route path={ROUTES.parents} element={<ParentListPage />} />
        <Route path={ROUTES.subjects} element={<SubjectsListPage />} />
        <Route path={ROUTES.classes} element={<ParentListPage />} />
        <Route path={ROUTES.lessons} element={<LessonsPage/>} />
        <Route path={ROUTES.exams} element={<ParentListPage />} />
        <Route path={ROUTES.assignments} element={<ParentListPage />} />
        <Route path={ROUTES.results} element={<ParentListPage />} />
        <Route path={ROUTES.attendance} element={<ParentListPage />} />
        <Route path={ROUTES.events} element={<ParentListPage />} />
        <Route path={ROUTES.messages} element={<ParentListPage />} />
        <Route path={ROUTES.announcements} element={<ParentListPage />} />
     
      </Route>
    </Routes>
  );
}
