import express from "express"
import env from "dotenv"
env.config()
import cors from "cors"
import { connectDB } from "./config/db.js"
import authroutes from "./routes/authroutes.js"
import cookieParser from "cookie-parser"
import taskRouter from "./routes/taskRoutes.js"

const app = express()
const port = process.env.PORT || 4000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,  
  })
);
app.use(express.json()); 
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


//routes  
app.get("/", (req , res) => {
    res.send("Api working")
})

app.use("/api/auth",authroutes)
app.use("/api/tasks", taskRouter)

app.listen(port, () => {
    console.log(`server is running on Port- ${port}`);
    connectDB()
    
}) 

