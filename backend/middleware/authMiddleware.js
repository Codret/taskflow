// import jwt from "jsonwebtoken";
// import User from "../models/User.js";
// // import User from "../models/User.js";

// export const authMiddleware = async (req, res, next) => {
//   try {
//     // Get token from cookies
//     const token = req.cookies?.token;
//     if (!token) {
//       return res
//         .status(401)
//         .json({ success: false, message: "Unauthorized: No token found in cookies" });
//     }

//     //  Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     if (!decoded?.userId) {
//       return res
//         .status(401)
//         .json({ success: false, message: "Unauthorized: Invalid token middleware" });
//     }

//     // Find user in DB
//     const user = await User.findById(decoded.userId).select("-password");
//     if (!user) {
//       return res
//         .status(401)
//         .json({ success: false, message: "Unauthorized: User not found middleware" });
//     }

//     // Attach user info to req
//     req.user = user;

//     // Pass control to next middleware/controller
//     next();

//   } catch (error) {
//     res
//       .status(401)
//       .json({ success: false, message: "Unauthorized middleware", error: error.message });
//   }
// };


// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// const protect = async (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer "))
//     return res.status(401).json({
//       success: false,
//       message: "Not authorized, token missing",
//     });

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);

//     const user = await User.findById(decoded.id).select("-password");
//     if (!user)
//       return res.status(401).json({
//         success: false,
//         message: "User not found",
//       });

//     req.user = user;
//     next();
//   } catch (error) {
//     res.status(401).json({
//       success: false,
//       message: "Token invalid or expired",
//     });
//   }
// };

// export default protect;.

// middleware/authMiddleware.js
export const protect = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "No token found" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is invalid" });
  }
};


export default protect;