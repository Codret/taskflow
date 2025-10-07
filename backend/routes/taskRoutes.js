import express from "express"
import { createTask, deleteTask, getTaskById, getTasks, updateTask } from "../controller/taskController.js"
import { authMiddleware } from "../middleware/auth.js"

const taskRouter = express.Router()

// router.post("/createtask", createTask);
// router.get("/gettask", getTasks);
// router.get("/task/:id", getTaskById);
// router.delete("/delete/:id", deleteTask);
// router.put("/update/:id", updateTask);

taskRouter.route('/gp')
    .get(authMiddleware, getTasks)
    .post( authMiddleware, createTask)

taskRouter.route('/:id/gp')
    .get( authMiddleware, getTaskById)
    .put( authMiddleware, updateTask)
    .delete( authMiddleware, deleteTask)


export default taskRouter;