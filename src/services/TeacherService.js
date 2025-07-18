import { makeRequest } from "@/config/makeRequest";

class TeacherService {
  // GET all teachers
  getAllTeachers() {
    return makeRequest("teachers", {
      method: "GET",
    });
  }

  // GET a single teacher by ID
  getTeacherById(id) {
    return makeRequest(`teachers/${id}`, {
      method: "GET",
    });
  }

  // POST: Add a new teacher
  addTeacher(data) {
    console.log("Sending data", data);
    return makeRequest("teachers/", {
      method: "POST",
      data,
    });
  }

  // PUT: Fully update a teacher
  updateTeacher(id, data) {
    return makeRequest(`teachers/${id}/`, {
      method: "PUT",
      data,
    });
  }

  // PATCH: Partially update a teacher
  patchTeacher(id, data) {
    return makeRequest(`teachers/${id}/`, {
      method: "PATCH",
      data,
    });
  }

  // DELETE: Delete a teacher
  deleteTeacher(id) {
    return makeRequest(`teachers/${id}/`, {
      method: "DELETE",
    });
  }
}

const service = new TeacherService();
export { service as TeacherService };

