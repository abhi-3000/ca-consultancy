import axios from "axios";

// Create a new Axios instance with a base URL
const api = axios.create({
  // The base URL for all our backend API calls
  baseURL: "http://localhost:5000/api",
});

// This is the magic part: an interceptor that runs before every single request.
api.interceptors.request.use(
  async (config) => {
    try {
      // Get the current active session from Clerk
      const session = window.Clerk.session;

      if (session) {
        // Get the JSON Web Token (JWT) from the session
        const token = await session.getToken();

        // If a token exists, add it to the Authorization header
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch (error) {
      console.error("Error getting session token:", error);
    }

    // Return the modified request config so the request can proceed
    return config;
  },
  (error) => {
    // Handle any errors that occur during the request setup
    return Promise.reject(error);
  }
);

export default api;
