import { makeRequest } from "@/config/makeRequest";

class ResultService {
  getAllResults() {
    return makeRequest(`results`, {
      method: "GET",
    });
  }
  addResult(data) {
  console.log("sending data", data);
  return makeRequest("results/", {
    method: "POST",
    data, 
  });
}
}
const service = new ResultService();
export { service as ResultService };
