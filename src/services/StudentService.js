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


// full crud:
// import { makeRequest } from "@/config/makeRequest";

// class StudentService {
//   // GET all students
//   getAllStudents() {
//     return makeRequest("students", {
//       method: "GET",
//     });
//   }

//   // GET a single student by ID
//   getStudentById(id) {
//     return makeRequest(`students/${id}`, {
//       method: "GET",
//     });
//   }

//   // POST: Add a new student
//   addStudent(data) {
//     console.log("Sending data", data);
//     return makeRequest("students/", {
//       method: "POST",
//       data,
//     });
//   }

//   // PUT: Fully update a student
//   updateStudent(id, data) {
//     return makeRequest(`students/${id}/`, {
//       method: "PUT",
//       data,
//     });
//   }

//   // PATCH: Partially update a student
//   patchStudent(id, data) {
//     return makeRequest(`students/${id}/`, {
//       method: "PATCH",
//       data,
//     });
//   }

//   // DELETE: Delete a student
//   deleteStudent(id) {
//     return makeRequest(`students/${id}/`, {
//       method: "DELETE",
//     });
//   }
// }

// const service = new StudentService();
// export { service as StudentService };
