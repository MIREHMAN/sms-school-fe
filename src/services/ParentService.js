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
