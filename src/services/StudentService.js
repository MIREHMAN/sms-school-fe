import { makeRequest } from "@/config/makeRequest";

class StudentService {
  getAllStudents() {
    return makeRequest(`students`, {
      method: "GET",
    });
  }
  addStudent(data) {
  console.log("sending data", data);
  return makeRequest("students/", {
    method: "POST",
    data, 
  });
}
}
const service = new StudentService();
export { service as StudentService };