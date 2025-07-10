import { makeRequest } from "@/config/makeRequest";

class ClassService {
  getAllClasses() {
    return makeRequest(`classes`, {
      method: "GET",
    });
  }
  addClass(data) {
  console.log("sending data", data);
  return makeRequest("classes/", {
    method: "POST",
    data, 
  });
}
}
const service = new ClassService();
export { service as ClassService };
