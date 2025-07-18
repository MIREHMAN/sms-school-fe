import { makeRequest } from "@/config/makeRequest";

class ResultService {
  // GET all results
  getAllResults() {
    return makeRequest("results", {
      method: "GET",
    });
  }

  // GET a single result by ID
  getResultById(id) {
    return makeRequest(`results/${id}`, {
      method: "GET",
    });
  }

  // POST: Add a new result
  addResult(data) {
    console.log("Sending data", data);
    return makeRequest("results/", {
      method: "POST",
      data,
    });
  }

  // PUT: Fully update a result
  updateResult(id, data) {
    return makeRequest(`results/${id}/`, {
      method: "PUT",
      data,
    });
  }

  // PATCH: Partially update a result
  patchResult(id, data) {
    return makeRequest(`results/${id}/`, {
      method: "PATCH",
      data,
    });
  }

  // DELETE: Delete a result
  deleteResult(id) {
    return makeRequest(`results/${id}/`, {
      method: "DELETE",
    });
  }
}

const service = new ResultService();
export { service as ResultService };
