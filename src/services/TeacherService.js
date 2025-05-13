import { makeUnSecureRequest } from "@/config/makeRequest";

class TeacherService {
  getAllTeachers() {
    return makeUnSecureRequest(`teachers`, {
      method: "GET",
      
    });
  }
}

const service = new TeacherService();
export { service as TeacherService };
