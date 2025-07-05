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
import SingleSubjectPage from "./singlePages/SingleSubjectPage";  
import SingleStudentPage from "./singlePages/SingleStudentPage";
import SingleClassPage from "./singlePages/SingleClassPage";
import SingleLessonPage from "./singlePages/SingleLessonPage";
import SingleExamPage from "./singlePages/SingleExamPage";

import RoleBasedRedirect from "@/components/RoleBasedRedirect";
import ProtectedRoute from "@/components/ProtectedRoute";

export function Router() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* Redirect to dashboard based on role */}
        <Route index element={<RoleBasedRedirect />} />

        {/* List Routes - allow all roles (optional: restrict per role) */}
        <Route
          path={ROUTES.teachers}
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <TeacherListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.students}
          element={
            <ProtectedRoute allowedRoles={["admin", "teacher"]}>
              <StudentListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.parents}
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ParentListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.subjects}
          element={
            <ProtectedRoute allowedRoles={["admin", "teacher"]}>
              <SubjectsListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.classes}
          element={
            <ProtectedRoute allowedRoles={["admin", "teacher"]}>
              <ClassesListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.lessons}
          element={
            <ProtectedRoute allowedRoles={["admin", "teacher"]}>
              <LessonsListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.exams}
          element={
            <ProtectedRoute allowedRoles={["admin", "teacher"]}>
              <ExamsListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.assignments}
          element={
            <ProtectedRoute allowedRoles={["admin", "teacher"]}>
              <AssignmentsListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.results}
          element={
            <ProtectedRoute allowedRoles={["admin", "teacher"]}>
              <ResultListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.attendance}
          element={
            <ProtectedRoute allowedRoles={["admin", "teacher"]}>
              <AttendanceListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.announcements}
          element={
            <ProtectedRoute allowedRoles={["admin", "teacher"]}>
              <AnnouncementsListPage />
            </ProtectedRoute>
          }
        />

        {/* Single Pages */}
        <Route
          path="/teachers/:id"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <SingleTeacherPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/students/:id"
          element={
            <ProtectedRoute allowedRoles={["admin", "teacher"]}>
              <SingleStudentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/subjects"
          element={
            <ProtectedRoute allowedRoles={["admin", "teacher"]}>
              <SingleSubjectPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/classes"
          element={
            <ProtectedRoute allowedRoles={["admin", "teacher"]}>
              <SingleClassPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lessons"
          element={
            <ProtectedRoute allowedRoles={["admin", "teacher"]}>
              <SingleLessonPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/exams"
          element={
            <ProtectedRoute allowedRoles={["admin", "teacher"]}>
              <SingleExamPage />
            </ProtectedRoute>
          }
        />

        {/* Dashboards */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/parent"
          element={
            <ProtectedRoute allowedRoles={["parent"]}>
              <ParentDashboard />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Catch-all route */}
      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
}
