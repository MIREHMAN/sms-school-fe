import { makeRequest } from "@/config/makeRequest";

class ParentService {
  getAllParents() {
    return makeRequest(`parents`, {
      method: "GET",
    });
  }
  addParent(data) {
  console.log("sending data", data);
  return makeRequest("parents/", {
    method: "POST",
    data, 
  });
}
}
const service = new ParentService();
export { service as ParentService };

// full crud:
// import { makeRequest } from "@/config/makeRequest";

// class ParentService {
//   // GET all parents
//   getAllParents() {
//     return makeRequest("parents", {
//       method: "GET",
//     });
//   }

//   // GET a single parent by ID
//   getParentById(id) {
//     return makeRequest(`parents/${id}`, {
//       method: "GET",
//     });
//   }

//   // POST: Add a new parent
//   addParent(data) {
//     console.log("Sending data", data);
//     return makeRequest("parents/", {
//       method: "POST",
//       data,
//     });
//   }

//   // PUT: Fully update a parent
//   updateParent(id, data) {
//     return makeRequest(`parents/${id}/`, {
//       method: "PUT",
//       data,
//     });
//   }

//   // PATCH: Partially update a parent
//   patchParent(id, data) {
//     return makeRequest(`parents/${id}/`, {
//       method: "PATCH",
//       data,
//     });
//   }

//   // DELETE: Delete a parent
//   deleteParent(id) {
//     return makeRequest(`parents/${id}/`, {
//       method: "DELETE",
//     });
//   }
// }

// const service = new ParentService();
// export { service as ParentService };

