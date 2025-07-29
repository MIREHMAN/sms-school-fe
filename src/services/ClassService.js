import { makeRequest } from "@/config/makeRequest";

class ClassService {
  // GET all classes
  getAllClasses() {
    return makeRequest("classes/", {
      method: "GET",
    });
  }

  // GET a single class by ID
  getClassById(id) {
    return makeRequest(`classes/${id}`, {
      method: "GET",
    });
  }

  // POST: Add a new class
  addClass(data) {
    console.log("Sending data", data);
    return makeRequest("classes/", {
      method: "POST",
      data,
    });
  }

  // PUT: Update an entire class record by ID
  updateClass(id, data) {
    return makeRequest(`classes/${id}/`, {
      method: "PUT",
      data,
    });
  }

  // PATCH: Update partial data of a class
  patchClass(id, data) {
    return makeRequest(`classes/${id}/`, {
      method: "PATCH",
      data,
    });
  }

  // DELETE: Remove a class by ID
  deleteClass(id) {
    return makeRequest(`classes/${id}/`, {
      method: "DELETE",
    });
  }
}

const service = new ClassService();
export { service as ClassService };
