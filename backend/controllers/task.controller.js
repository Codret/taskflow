// import Task from "../models/Task.js";


// export const createTask = async (req, res) => {
//     try {
//         const {title, description, priority, dueDate, completed}= req.body;

//         const task = new Task ({
//             title, description, priority, dueDate, completed: completed === true || completed ==="yes", owner:req.user.id
//         })
//         const saved =await task.save()
//         return res.status(200).json({ success:true , task: saved})
//     } catch (error) {
//         return res.status(500).json({ message:  error.message})
//     }
// }

// export const getTasks = async(req,res) => {
//     try {
//         const tasks = await Task.find({owner:req.user.id}).sort({createdAt : -1})
//         return res.json({success:true, tasks})
//     } catch (error) {
//         return res.status(500).json({success:false , message: "Internal Server error" , error})
//     }
// }

// //get single task by id must belong to that user

// export const getTaskById = async(req, res) => {
//     try {
//      const task = await Task.findOne({_id : req.params.id, owner: req.user.id})

//     if(!task){
//         return res.status(404).json({success:false , message:"task not found or You Are not Authorised "})
//     }

//     return res.json({success:true , task})
//     } catch (error) {
//         return res.status(500).json({ success:false , message : "Internal server error ", error})
//     }

// }

// //update task 

// // export const updateTask =  async (req, res) => {
// //     try {
// //         const taskId = req.params.id; 
// //         const {title, description , priority, dueDate, completed} = req.body;
// //         const task = await Task.findOneAndUpdate({_id:taskId,owner:req.user.id}, {title, description, priority, dueDate, completed}, {new: true, runValidators:true})

// //         if (!task){
// //             return res.status(404).json({success:false , message: "task not found"})
// //         }
// //         res.status(200).json({success:true , task:task})
// //     } catch (error) {
// //         res.status(500).json({success:false , message:"Intenal Server error", error})
        
// //     }
// // }

// export const updateTask = async (req, res) => {
// try {
//         const data = {...req.body}
//     if(data.completed !== undefined){
//         data.completed = data.completed === "yes" || data.completed=== true;
//     }

//     const updated = await Task.findOneAndUpdate({_id: req.params.id, owner:req.user.id}, data, {new:true, runValidators:true})
//     console.log("updated" , updated)
//     if(!updated){
//        return res.status(404).json({success:false , message: "Task not found or you are not authorized to update it."})
//     }
//     return res.json({success:true , task: updated})
// } catch (err) {
//     return res.status(500).json({success:false , message: err.message})
// }
// }

// // delete task  functions here 
// export const deleteTask = async(req, res)=> { 
//     try {
//         const task = await Task.findOneAndDelete({_id:req.params.id , owner:req.user.id})

//         if(!task){
//            return res.status(404).json({success:false , message:"Task not found or not Authorized "})
//         }

//         return res.status(200).json({success:true , message: "task Deleted Successfully.", deletedTaskId : task._id})
//     } catch (error) {
//         return res.status(500).json({success:false , message:error.message})
//     }
// }

import Task from "../models/Task.js";

/**
 * Create Task
 */
export const createTask = async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      owner: req.user.id
    });

    res.status(201).json({
      success: true,
      task
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Get All Tasks (Logged-in User)
 */
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.user.id }).sort({
      createdAt: -1
    });

    res.json({
      success: true,
      tasks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Get Single Task
 */
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user.id
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    res.json({
      success: true,
      task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Update Task
 */
export const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found or not authorized"
      });
    }

    res.json({
      success: true,
      task: updatedTask
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Delete Task
 */
export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id
    });

    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found or not authorized"
      });
    }

    res.json({
      success: true,
      message: "Task deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


