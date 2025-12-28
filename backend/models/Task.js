// import mongoose from "mongoose";

// const taskSchema = new mongoose.Schema({
//     title : {
//         type:String, 
//         required: true ,
//         trim:true 
//     },
//     description: {
//         type:String, 
//         required:true, 
//         default:'',
//         trim:true
//     },
//     priority:{
//         type:String, 
//         required : true , 
//         enum: ['Low', 'Medium', 'High'], default:'Low'
//     },
//     dueDate:{
//         type:Date,
//     }, 
//     owner:{
//         type:mongoose.Schema.Types.ObjectId, 
//         ref:"User", 
//         required:true
//     }, 
//     completed:{
//         type:Boolean, 
//         default:"false"
//     },
//     createAt:{
//         type:Date, 
//         default:Date.now
//     }
// })

// const Task = mongoose.model("Task", taskSchema)

// export default Task;


import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      default: ""
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low"
    },
    status: {
      type: String,
      enum: ["todo", "in-progress", "done"],
      default: "todo"
    },
    dueDate: {
      type: Date
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    completed: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true } // createdAt & updatedAt
);

export default mongoose.model("Task", taskSchema);
