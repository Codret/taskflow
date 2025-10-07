// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:4000" // 👈 Local backend
      : "https://your-backend-name.onrender.com", // 👈 Replace with Render backend URL
  withCredentials: true, // ✅ Required for cookies (JWT)
});

export default api;
