import { makeRequest } from "@/config/makeRequest";

class LessonService {
  // GET all lessons
  getAllLessons() {
    return makeRequest("lessons", {
      method: "GET",
    });
  }

  // GET a single lesson by ID
  getLessonById(id) {
    return makeRequest(`lessons/${id}`, {
      method: "GET",
    });
  }

  // POST: Add a new lesson
  addLesson(data) {
    console.log("Sending data", data);
    return makeRequest("lessons/", {
      method: "POST",
      data,
    });
  }

  // PUT: Fully update a lesson
  updateLesson(id, data) {
    return makeRequest(`lessons/${id}/`, {
      method: "PUT",
      data,
    });
  }

  // PATCH: Partially update a lesson
  patchLesson(id, data) {
    return makeRequest(`lessons/${id}/`, {
      method: "PATCH",
      data,
    });
  }

  // DELETE: Delete a lesson
  deleteLesson(id) {
    return makeRequest(`lessons/${id}/`, {
      method: "DELETE",
    });
  }
}

const service = new LessonService();
export { service as LessonService };
