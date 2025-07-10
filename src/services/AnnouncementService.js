import { makeRequest } from "@/config/makeRequest";

class AnnouncementService {
  getAllAnnouncements() {
    return makeRequest(`announcements`, {
      method: "GET",
    });
  }
  addannouncement(data) {
  console.log("sending data", data);
  return makeRequest("announcements/", {
    method: "POST",
    data, 
  });
}
}
const service = new AnnouncementService();
export { service as AnnouncementService };