import { makeRequest } from "@/config/makeRequest";

class ExamService {
  getAllExams() {
    return makeRequest(`exams`, {
      method: "GET",
    });
  }
  addExam(data) {
  console.log("sending data", data);
  return makeRequest("exams/", {
    method: "POST",
    data, 
  });
}
}
const service = new ExamService();
export { service as ExamService };
