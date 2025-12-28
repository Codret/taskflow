// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";

// dotenv.config();
// connectDB();

// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//   res.send("API Working");
// });

// import authRoutes from "./routes/authRoutes.js";
// import taskRoutes from "./routes/task.routes.js";

// app.use("/api/auth", authRoutes);
// app.use("/api/tasks", taskRoutes);

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () =>
//   console.log(`Server running on http://localhost:${PORT}`)
// );


// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

app.use(cookieParser());

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // allow cookies if needed
  })
);

// Parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get("/", (req, res) => {
  res.send("API is working!");
});

// Import routes
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/task.routes.js";

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
