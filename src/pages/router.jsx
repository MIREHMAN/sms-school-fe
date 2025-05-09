import { Route, Routes } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import DashboardLayout from "@/pages/Layout";
import TeacherListPage from "@/pages/list/Teachers";
import StudentListPage from "@/pages/list/Students";
import SubjectsListPage from "@/pages/list/Subjects";
import ParentListPage from "@/pages/list/Parents";
import ClassesListPage from "@/pages/list/Classes";
import LessonsListPage from "@/pages/list/Lessons";
import ExamsListPage from "@/pages/list//Exams";
import AssignmentsListPage from "@/pages/list/Assingments";
import ResultListPage from "@/pages/list/Results";
import AttendanceListPage from "@/pages/list/Attandence";
import AnnouncementsListPage from "@/pages/list/Announcements";
import AdminDashboard from "@/pages/dashboards/AdminDashboard";
import TeacherDashboard from "@/pages/dashboards/TeacherDashboard";
import StudentDashboard from "@/pages/dashboards/StudentDashboard";
import ParentDashboard from "@/pages/dashboards/ParentDashboard";
import LoginPage from "@/pages/LoginPage";
import SingleTeacherPage from "./singlePages/SingleTeacherPage";
import SingleStudentPage from "./singlePages/SingleStudentPage";
import RoleBasedRedirect from "@/components/RoleBasedRedirect"; // ✅ Import here

export function Router() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<RoleBasedRedirect />} /> {/* ✅ Role-based routing */}

        {/* List Routes */}
        <Route path={ROUTES.teachers} element={<TeacherListPage />} />
        <Route path={ROUTES.students} element={<StudentListPage />} />
        <Route path={ROUTES.parents} element={<ParentListPage />} />
        <Route path={ROUTES.subjects} element={<SubjectsListPage />} />
        <Route path={ROUTES.classes} element={<ClassesListPage />} />
        <Route path={ROUTES.lessons} element={<LessonsListPage />} />
        <Route path={ROUTES.exams} element={<ExamsListPage />} />
        <Route path={ROUTES.assignments} element={<AssignmentsListPage />} />
        <Route path={ROUTES.results} element={<ResultListPage />} />
        <Route path={ROUTES.attendance} element={<AttendanceListPage />} />
        <Route path={ROUTES.announcements} element={<AnnouncementsListPage />} />

        {/* Single Service Routes */}
        <Route path="/teachers/:id" element={<SingleTeacherPage />} />
        <Route path="/students/:id" element={<SingleStudentPage />} />

        {/* Dashboards */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/parent" element={<ParentDashboard />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
}
