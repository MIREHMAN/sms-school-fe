import { Route, Routes } from "react-router-dom";

// Routes URLs
import { ROUTES } from "../constants/routes";

// Components

import Home from "./Home";
import DashboardLayout from "./Layout";
import TeacherListPage from "./list/Teachers";
import StudentListPage from "./list/Students";
import ParentsListPage from "./list/Parents";
import LessonsPage from "./Lessons";



export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Home />} />
        <Route path={ROUTES.teachers} element={<TeacherListPage />} />
        <Route path={ROUTES.students} element={<StudentListPage />} />
        <Route path={ROUTES.parents} element={<ParentsListPage />} />
        <Route path={ROUTES.subjects} element={<ParentsListPage />} />
        <Route path={ROUTES.classes} element={<ParentsListPage />} />
        <Route path={ROUTES.lessons} element={<LessonsPage/>} />
        <Route path={ROUTES.exams} element={<ParentsListPage />} />
        <Route path={ROUTES.assignments} element={<ParentsListPage />} />
        <Route path={ROUTES.results} element={<ParentsListPage />} />
        <Route path={ROUTES.attendance} element={<ParentsListPage />} />
        <Route path={ROUTES.events} element={<ParentsListPage />} />
        <Route path={ROUTES.messages} element={<ParentsListPage />} />
        <Route path={ROUTES.announcements} element={<ParentsListPage />} />
     
      </Route>
    </Routes>
  );
}
