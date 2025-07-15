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


// full crud:
// import { makeRequest } from "@/config/makeRequest";

// class AssignmentService {
//   // GET all assignments
//   getAllAssignments() {
//     return makeRequest("assignments", {
//       method: "GET",
//     });
//   }

//   // GET a single assignment by ID
//   getAssignmentById(id) {
//     return makeRequest(`assignments/${id}`, {
//       method: "GET",
//     });
//   }

//   // POST: Add a new assignment
//   addAssignment(data) {
//     console.log("Sending data", data);
//     return makeRequest("assignments/", {
//       method: "POST",
//       data,
//     });
//   }

//   // PUT: Fully update an assignment
//   updateAssignment(id, data) {
//     return makeRequest(`assignments/${id}/`, {
//       method: "PUT",
//       data,
//     });
//   }

//   // PATCH: Partially update an assignment
//   patchAssignment(id, data) {
//     return makeRequest(`assignments/${id}/`, {
//       method: "PATCH",
//       data,
//     });
//   }

//   // DELETE: Delete an assignment
//   deleteAssignment(id) {
//     return makeRequest(`assignments/${id}/`, {
//       method: "DELETE",
//     });
//   }
// }

// const service = new AssignmentService();
// export { service as AssignmentService };

