import { makeRequest } from "@/config/makeRequest";

class AssignmentService {
  getAllAssignments() {
    return makeRequest(`assignments`, {
      method: "GET",
    });
  }
  addAssignment(data) {
  console.log("sending data", data);
  return makeRequest("assignments/", {
    method: "POST",
    data, 
  });
}
}
const service = new AssignmentService();
export { service as AssignmentService };
