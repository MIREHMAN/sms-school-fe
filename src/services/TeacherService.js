// services/TeacherService.js
import { makeRequest } from "@/config/makeRequest";

class TeacherService {
  getAllTeachers() {
    return makeRequest("teachers", { method: "GET" });
  }

  addTeacher(data) {
    console.log("Sending data", data);
    return makeRequest("teachers/", {
      method: "POST",
      data,
    });
  }

  deleteTeacher(id) {
    return makeRequest(`teachers/${id}/`, {
      method: "DELETE",
    });
  }

  // Optionally include these if needed:
  // getTeacherById(id) { ... }
  // updateTeacher(id, data) { ... }
  // patchTeacher(id, data) { ... }
}

const service = new TeacherService();
export { service as TeacherService };
