import { makeRequest } from "@/config/makeRequest";

class SubjectService {
  getAllSubjects() {
    return makeRequest(`subjects`, {
      method: "GET",
    });
  }
  addSubject(data) {
  console.log("sending data", data);
  return makeRequest("students/", {
    method: "POST",
    data, 
  });
}
}
const service = new SubjectService();
export { service as SubjectService };
