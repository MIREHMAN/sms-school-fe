import { makeRequest } from "@/config/makeRequest";

class TeacherService {
  getAllTeachers() {
    return makeRequest(`teachers`, {
      method: "GET",
    });
  }
  addTeacher(data) {
  console.log("sending data", data);
  return makeRequest("teachers/", {
    method: "POST",
    data, 
  });
}




}

const service = new TeacherService();
export { service as TeacherService };
