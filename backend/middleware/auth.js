import jwt from "jsonwebtoken";
import User from "../models/usermodel.js";
// import User from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
  try {
    // Get token from cookies
    const token = req.cookies?.token;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: No token found in cookies" });
    }

    //  Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.userId) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: Invalid token middleware" });
    }

    // Find user in DB
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: User not found middleware" });
    }

    // Attach user info to req
    req.user = user;

    // Pass control to next middleware/controller
    next();

  } catch (error) {
    res
      .status(401)
      .json({ success: false, message: "Unauthorized middleware", error: error.message });
  }
};
