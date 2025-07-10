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
