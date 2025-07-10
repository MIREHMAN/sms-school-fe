import { makeRequest } from "@/config/makeRequest";

class LessonService {
  getAllLessons() {
    return makeRequest(`lessons`, {
      method: "GET",
    });
  }
  addLesson(data) {
  console.log("sending data", data);
  return makeRequest("lessons/", {
    method: "POST",
    data, 
  });
}
}
const service = new LessonService();
export { service as LessonService };
