// services/TeacherService.js
import { makeRequest } from "@/config/makeRequest";

class TeacherService {
  getAllTeachers() {
    return makeRequest("teachers", { method: "GET" });
  }

  getTeacherById(id) {
    return makeRequest(`teachers/${id}/`, {
      method: "GET",
    });
  }

  addTeacher(data) {
    console.log("Sending data", data);
    return makeRequest("teachers/", {
      method: "POST",
      data,
    });
  }

  updateTeacher(id, data) {
    return makeRequest(`teachers/${id}/`, {
      method: "PUT",
      data,
    });
  }

  patchTeacher(id, data) {
    return makeRequest(`teachers/${id}/`, {
      method: "PATCH",
      data,
    });
  }

  deleteTeacher(id) {
    return makeRequest(`teachers/${id}/`, {
      method: "DELETE",
    });
  }
}

const service = new TeacherService();
export { service as TeacherService };
