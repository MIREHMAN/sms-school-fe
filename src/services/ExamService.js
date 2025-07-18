import { makeRequest } from "@/config/makeRequest";

class ExamService {
  // GET all exams
  getAllExams() {
    return makeRequest("exams", {
      method: "GET",
    });
  }

  // GET a single exam by ID
  getExamById(id) {
    return makeRequest(`exams/${id}`, {
      method: "GET",
    });
  }

  // POST: Add a new exam
  addExam(data) {
    console.log("Sending data", data);
    return makeRequest("exams/", {
      method: "POST",
      data,
    });
  }

  // PUT: Fully update an existing exam
  updateExam(id, data) {
    return makeRequest(`exams/${id}/`, {
      method: "PUT",
      data,
    });
  }

  // PATCH: Partially update an exam
  patchExam(id, data) {
    return makeRequest(`exams/${id}/`, {
      method: "PATCH",
      data,
    });
  }

  // DELETE: Delete an exam
  deleteExam(id) {
    return makeRequest(`exams/${id}/`, {
      method: "DELETE",
    });
  }
}

const service = new ExamService();
export { service as ExamService };
