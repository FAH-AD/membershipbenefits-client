import axios from "axios";

const instance = axios.create({
  baseURL: 'https://membershiptbenefits-server-1.onrender.com',
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export const get = (url, params = {}, config = {}) =>
  instance.get(url, { params, ...config });

export const post = (url, data = {}, config = {}) =>
  instance.post(url, data, config);

export const put = (url, data = {}, config = {}) =>
  instance.put(url, data, config);

export const deleteUser = (url, config = {}) =>
  instance.delete(url, config);

export const deleteReq = (url, config = {}) =>
  instance.delete(url, config);

export const verifyUser = () => get("/api/verify");

instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("authToken");

    console.log("Request URL:", `${config.baseURL}${config.url}`);
    console.log("Request interceptor - Token:", token ? "Token exists" : "No token found");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Authorization header set");
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    console.log("Response interceptor - Success:", response.status, response.config.url);
    return response;
  },
  function (error) {
    console.log("Response interceptor - Error:", error.response?.status, error.config?.url);
    console.log("Error details:", error.response?.data);

    if (error.response?.status === 401) {
      console.warn("401 Unauthorized - Clearing token and redirecting to login");
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default instance;