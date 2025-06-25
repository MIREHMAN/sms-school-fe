// services/authService.js
import { makeUnSecureRequest } from "@/config/makeRequest";

class AuthService {
  login(username, password) {
    console.log("posting login request with", username, password);
    return makeUnSecureRequest("login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        username,
        password,
      },
    });
  }
}

const authService = new AuthService();
export { authService as AuthService };
