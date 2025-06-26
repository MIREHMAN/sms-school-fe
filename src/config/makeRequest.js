import axios from "axios";

const axiosUnSecureInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_SERVER_BASE_URL || "",
});

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_SERVER_BASE_URL || "",
});

// Add interceptor to attach the token
axiosInstance.interceptors.request.use(
  (config) => {
    try {
      const authData = JSON.parse(localStorage.getItem("SchoolAuthData"));
      const accessToken = authData?.tokens?.access;

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    } catch (err) {
      console.warn("Error parsing auth data:", err);
    }

    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Wrapper for authenticated requests
export function makeRequest(url, options = {}) {
  return axiosInstance({
    url,
    ...options,
  })
    .then((res) => res.data)
    .catch((error) => Promise.reject(error?.response ?? "Error"));
}

// Wrapper for unauthenticated requests
export function makeUnSecureRequest(url, options = {}) {
  const { method = "GET", headers = {}, body } = options;

  return axiosUnSecureInstance({
    url,
    method,
    headers,
    data: body,
  })
    .then((res) => res.data)
    .catch((error) => Promise.reject(error?.response ?? "Error"));
}

export { axiosUnSecureInstance };
export default axiosInstance;
