// import express from "express"
// import { createTask, deleteTask, getTaskById, getTasks, updateTask } from "../controller/taskController.js"
// import { authMiddleware } from "../middleware/authMiddleware.js"

// const taskRouter = express.Router()



// taskRouter.route('/gp')
//     .get(authMiddleware, getTasks)
//     .post( authMiddleware, createTask)

// taskRouter.route('/:id/gp')
//     .get( authMiddleware, getTaskById)
//     .put( authMiddleware, updateTask)
//     .delete( authMiddleware, deleteTask)


// export default taskRouter;
import express from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
} from "../controllers/task.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.route("/")
  .get(getTasks)
  .post(createTask);

router.route("/:id")
  .get(getTaskById)
  .put(updateTask)
  .delete(deleteTask);

export default router;

