import axios from "axios";

const axiosUnSecureInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_SERVER_BASE_URL,
});

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_REACT_APP_SERVER_BASE_URL ||
    "https://jsonplaceholder.typicode.com/",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    const { accessToken } = authData;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    if (config.headers["Content-Type"] === undefined)
      config.headers["Content-Type"] = "application/json";

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export function makeRequest(url, options) {
  return axiosInstance(url, options)
    .then((res) => res.data)
    .catch((error) => Promise.reject(error?.response ?? "Error"));
}
export { axiosUnSecureInstance };

export default axiosInstance;
