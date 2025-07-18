import { makeRequest } from "@/config/makeRequest";

class AnnouncementService {
  // GET all announcements
  getAllAnnouncements() {
    return makeRequest("announcements", {
      method: "GET",
    });
  }

  // GET a single announcement by ID
  getAnnouncementById(id) {
    return makeRequest(`announcements/${id}`, {
      method: "GET",
    });
  }

  // POST: Add a new announcement
  addAnnouncement(data) {
    console.log("Sending data", data);
    return makeRequest("announcements/", {
      method: "POST",
      data,
    });
  }

  // PUT: Fully update an existing announcement
  updateAnnouncement(id, data) {
    return makeRequest(`announcements/${id}/`, {
      method: "PUT",
      data,
    });
  }

  // PATCH: Partially update an announcement
  patchAnnouncement(id, data) {
    return makeRequest(`announcements/${id}/`, {
      method: "PATCH",
      data,
    });
  }

  // DELETE: Remove an announcement
  deleteAnnouncement(id) {
    return makeRequest(`announcements/${id}/`, {
      method: "DELETE",
    });
  }
}

const service = new AnnouncementService();
export { service as AnnouncementService };
