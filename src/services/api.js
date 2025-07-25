// src/services/api.js
import { TeacherService } from "@/services/TeacherService"
import { StudentService } from "@/services/StudentService"

export const fetchStudents = async () => {
  const response = await StudentService.getAllStudents();
  return response;
};

export const fetchTeachers = async () => {
  const response = await TeacherService.getAllTeachers();
  return response;
};
