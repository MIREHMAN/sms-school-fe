import { makeRequest } from "@/config/makeRequest";

class AttandenceService {
  getAllAttandences() {
    return makeRequest(`attandences`, {
      method: "GET",
    });
  }
  addAttandence(data) {
  console.log("sending data", data);
  return makeRequest("attandences/", {
    method: "POST",
    data, 
  });
}
}
const service = new AttandenceService();
export { service as AttandenceService };


// full crud:
// import { makeRequest } from "@/config/makeRequest";

// class AttendanceService {
//   // GET all attendance records
//   getAllAttendances() {
//     return makeRequest("attendances", {
//       method: "GET",
//     });
//   }

//   // GET a single attendance record by ID
//   getAttendanceById(id) {
//     return makeRequest(`attendances/${id}`, {
//       method: "GET",
//     });
//   }

//   // POST: Add a new attendance record
//   addAttendance(data) {
//     console.log("Sending data", data);
//     return makeRequest("attendances/", {
//       method: "POST",
//       data,
//     });
//   }

//   // PUT: Fully update an attendance record
//   updateAttendance(id, data) {
//     return makeRequest(`attendances/${id}/`, {
//       method: "PUT",
//       data,
//     });
//   }

//   // PATCH: Partially update an attendance record
//   patchAttendance(id, data) {
//     return makeRequest(`attendances/${id}/`, {
//       method: "PATCH",
//       data,
//     });
//   }

//   // DELETE: Delete an attendance record
//   deleteAttendance(id) {
//     return makeRequest(`attendances/${id}/`, {
//       method: "DELETE",
//     });
//   }
// }

// const service = new AttendanceService();
// export { service as AttendanceService };

