
import { makeRequest } from "@/config/makeRequest";

class SubjectService {
  // GET all subjects
  getAllSubjects() {
    return makeRequest("subjects", {
      method: "GET",
    });
  }

  // GET a subject by ID
  getSubjectById(id) {
    return makeRequest(`subjects/${id}`, {
      method: "GET",
    });
  }

  // POST: Add a new subject
  addSubject(data) {
    console.log("Sending data", data);
    return makeRequest("subjects/", {
      method: "POST",
      data,
    });
  }

  // PUT: Fully update a subject
  updateSubject(id, data) {
    return makeRequest(`subjects/${id}/`, {
      method: "PUT",
      data,
    });
  }

  // PATCH: Partially update a subject
  patchSubject(id, data) {
    return makeRequest(`subjects/${id}/`, {
      method: "PATCH",
      data,
    });
  }

  // DELETE: Delete a subject
  deleteSubject(id) {
    return makeRequest(`subjects/${id}/`, {
      method: "DELETE",
    });
  }
}

const service = new SubjectService();
export { service as SubjectService };

