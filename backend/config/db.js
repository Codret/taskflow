import mongoose from "mongoose"
import dotenv from "dotenv";

dotenv.config(); // Load .env

const connectDB =async () => {
   try {

    await mongoose.connect(process.env.MONGODB_URL)
    console.log("db connected")
   } catch (error) {
    console.log("db connection error", error.message)
   }
}

export default connectDB


