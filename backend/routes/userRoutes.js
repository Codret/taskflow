import express from "express";
import {
  registerUser,
  loginUser,
  getCurrentUser,
  updateProfile,
  updatePassword,
} from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

/* Public Routes */
router.post("/register", registerUser);
router.post("/login", loginUser);

/* Protected Routes */
router.get("/me", protect, getCurrentUser);
router.put("/profile", protect, updateProfile);
router.put("/password", protect, updatePassword);

export default router;
