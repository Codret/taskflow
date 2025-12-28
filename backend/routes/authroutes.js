import express from "express"
import { getCurrentUser, loginUser, registerUser, updatePassword, updateProfile } from "../controllers/userController.js";

const router = express.Router()

//public links 
router.post("/register" , registerUser)
router.post("/login" , loginUser)

//private links  protect also by middleware 

router.get("/me", getCurrentUser)
router.put("/profile", updateProfile)
router.put("/password", updatePassword)





export default router;