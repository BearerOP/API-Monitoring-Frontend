import axios from "axios";
import { getToken } from "@/Services/AuthService"; // Create a utility to get the token

// Determine baseURL based on environment
const baseURL =
  import.meta.env.VITE_APP_ENV === "development"
    ? "http://localhost:8080" // Development URL
    // : "https://up-status.onrender.com";
: 'https://13.235.99.19:8080/'; // Production URL

const Path = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the token in the headers only for certain requests
Path.interceptors.request.use(
  (config) => {
    // Only add the token for endpoints that require it
    if (
      !config.url.includes("/forgot-password") &&
      !config.url.includes("/reset-password")
    ) {
      const token = getToken();
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default Path;
