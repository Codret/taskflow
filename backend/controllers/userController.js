// import express from "express"
// import User from "../models/User.js"
// import bcrypt from "bcrypt"
// import { genToken } from "../config/genToken.js";
// import validator from "validator"


// // register function 
// export const registerUser = async (req, res) => {
//     try {
//         const {name, email , password} = req.body; 

//         if(!name || !email || !password ) {
//             return res.status(400).json({ success: false , message : "All Fields are Required"})
//         }

//         if(!validator.isEmail(email)){
//             return res.status(400).json({ success: false , message : "Invalid Email"})
//         }

//         if(password.length > 8){
//             return res.status(400).json({ success: false , message : "Password Must be atleast 8 characters"})

//         }

//      const existingUser = await User.findOne({email}); 
//         if(existingUser) {
//             return res.status(400).json({ success: false , message:"User already exists" })
//          }

//      const hashPassword = await bcrypt.hash(password, 10)

//      const user = await  User.create({
//         name, email , password: hashPassword
//      })

//      const token = genToken(user._id)

//      return res.status(201).json({ success: true , message: "User Registered Successfully "})
//     } catch (error) {
//         console.log("register func error");
//         return res.status(500).json({ success: false , message: error.message })
        
//     }
// }


// export const loginUser = async (req, res) => {
//     try {
//          const {email, password } = req.body ; 

//         if( !email || !password ) {
//             return res.status(400).json({ success: false , message : "All Fields are Required"})
//         }

//         if(!validator.isEmail(email)){
//             return res.status(400).json({ success: false , message : "Invalid Email"})
//         }

//         const user = await User.findOne({email})

//     if(!user) {
//        return res.status(400).json({ success: false ,message: "Invalid Credentials"})
//     }

//     const isMatch = await bcrypt.compare(password, user.password); 
//     if(!isMatch) {
//         return res.status(400).json({ message: "Invalid Credentials"})
//     }

//     const token = genToken(user._id); 

//     res.cookie("token" , token , { 
//         httponly :true, 
//         secure: process.env.NODE_ENV === "production",
//         sameSite:"strict"
//     })

//     return res.json({ success: true , message: "Login Successfull" ,  user: {id: user._id , name: user.name, email: user.email }})
//     } catch (error) {
//         console.log("login func error")
//         return res.status(500).json({success: false ,message: error.message})
        
//     }
// }


// export const getCurrentUser = async(req, res)=> {
// try {
//     const user = await User.findById(req.user.id).select("name email")

//     if(!user) {
//         return res.status(400).json({ success: false , message: "User not found "})
//     }

//     return res.json({success:true , user})
    
// } catch (error) {
//     res.status(500).json({success:false , message: "Server error"})
// }
// }


// //update User Profile  

// export const updateProfile = async(req, res) =>{
//     const {name , email } = req.body; 

//     if (!name || !email || !validator.isEmail(email)) {
//         return res.status(400).json({ success: false , message: "Valid Name and Email required "})
//     }

//     try {
//         const exists = await User.findOne( { email, id: {$ne : req.user.id} } );

//         if(exists) {
//             return res.status(400).json({ success:false , message: "Email already exists by another users"})
//         }
//         const user =  await User.findByIdAndUpdate( req.user.id , {name , email}, {
//             new:true, runValidators: true , select: "name email"
//         })
//         return res.status(200).json({success:true , user})
//     } catch (error) {
//         return res.status(500).json({ success:false , message:"Server error ", error})
//     }
// }


// //change password function 

// export const updatePassword = async (req, res ) => {
//     const {oldPassword, newPassword} = req.body; 
//     if (!oldPassword || !newPassword || newPassword.length < 8) {
//         return res.status(400).json({ success: false, message: "Password is Invalid or too short " });
//     }


//     try {
//         const user = await User.findById(req.user.id).select("+password"); 
//     if(!user){
//        return res.status(400).json({success:false , message:"user not found "})
//     }

//     const isMatch = await bcrypt.compare(oldPassword, user.password); 
//     if(!isMatch) {
//         return res.status(400).json({success:false , message:"Invalid Old Password"})
//     }

//     const salt = await bcrypt.genSalt(10)
//     user.password = await bcrypt.hash(newPassword, salt )

//     await user.save()
//     return res.status(200).json({success:true , message: "Password Changed successfully "})

//     } catch (error) {
//         return res.status(500).json({ success:false , message: "Internal Server Error", error})
//     }
// }


import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";

/* =======================
   JWT TOKEN GENERATOR
======================= */
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const TOKEN_EXPIRE = "24h";

const createToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: TOKEN_EXPIRE,
  });
};

/* =======================
   REGISTER USER
======================= */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password)
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });

    if (!validator.isEmail(email))
      return res.status(400).json({
        success: false,
        message: "Invalid email",
      });

    if (password.length < 8)
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = createToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* =======================
   LOGIN USER
======================= */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({
        success: false,
        message: "Email and password required",
      });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });

    const token = createToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* =======================
   GET CURRENT USER
======================= */
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("name email");

    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* =======================
   UPDATE PROFILE
======================= */
export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email || !validator.isEmail(email))
      return res.status(400).json({
        success: false,
        message: "Valid name and email required",
      });

    const emailExists = await User.findOne({
      email,
      _id: { $ne: req.user.id },
    });

    if (emailExists)
      return res.status(409).json({
        success: false,
        message: "Email already in use",
      });

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true, runValidators: true }
    ).select("name email");

    res.json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* =======================
   UPDATE PASSWORD
======================= */
export const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword || newPassword.length < 8)
      return res.status(400).json({
        success: false,
        message: "Password invalid or too short",
      });

    const user = await User.findById(req.user.id).select("password");

    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch)
      return res.status(401).json({
        success: false,
        message: "Current password incorrect",
      });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
