import { makeRequest } from "../config/makeRequest";
class TestService {
  getAllPosts() {
    return makeRequest(`posts`, {
      method: "GET",
      // data: { message, parentId },
    });
  }
}

const service = new TestService();
export { service as testService };
