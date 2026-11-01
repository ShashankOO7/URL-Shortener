// src/api/axiosInstance.js
import axios from "axios";
import toast from "react-hot-toast";
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
// Request Interceptor ? attach token if present
api.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("JWT_TOKEN");
      // Check if token exists and is valid
      if (token && token !== "undefined" && token !== "null" && !config.url.includes("/auth/")) {
        // exclude login/register APIs
        const parsedToken = JSON.parse(token);
        if (parsedToken) {
          config.headers.Authorization = `Bearer ${parsedToken}`;
        }
      }
    } catch (error) {
      // If token is invalid, clear it
      console.warn("Invalid token in request interceptor, clearing it:", error);
      localStorage.removeItem("JWT_TOKEN");
    }
    return config;
  },
  (error) => Promise.reject(error)
);
// Response Interceptor ? handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.error || "Something went wrong";
    // ? Rate limited ? show retry message, don't redirect
    if (status === 429) {
      const retryAfter = error.response?.headers?.["retry-after"];
      const body = error.response?.data?.body;
      const msg = body || `Too many requests. Please wait ${retryAfter || "a moment"} and try again.`;
      toast.error(msg, { id: "rate-limit", duration: 4000 });
      return Promise.reject(error);
    }
    // Show toast for any API error
    if(message != "Forbidden")
    {
      toast.error(message, { id: "api-error" });
    }
    
    // ? Unauthorized/JWT error ? clear token + redirect
    if (status === 401 || status === 403) {
      localStorage.removeItem("JWT_TOKEN");
      // Delay redirect so toast is visible
      setTimeout(() => window.location.href = "/login", 1000);
    }
    // Forward error so React Query / components still know
    return Promise.reject(error);
  }
);
export default api;
