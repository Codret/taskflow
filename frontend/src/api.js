// // // src/api.js
// // import axios from "axios";

// // const api = axios.create({
// //   baseURL:
// //     import.meta.env.MODE === "development"
// //       ? "http://localhost:4000" // 👈 Local backend
// //       : "https://your-backend-name.onrender.com", // 👈 Replace with Render backend URL
// //   withCredentials: true, // ✅ Required for cookies (JWT)
// // });

// // export default api;

// import axios from "axios";

// const API_BASE = "http://localhost:5000/api"; // replace with your backend URL

// export const api = axios.create({
//   baseURL: API_BASE,
//   headers: { "Content-Type": "application/json" },
// });


import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
  withCredentials: true,
});

const API_BASE = "http://localhost:5000/api"; // replace with your backend URL

export const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

// Attach token if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// Optional: handle 401 globally
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(err);
  }
);

export default API;
