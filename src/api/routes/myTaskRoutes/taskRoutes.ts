import express from "express";
import * as taskController from "../../controllers/myTaskControllers/taskController";
import { isAuthenticatedUser } from "../../../middlewares/isAuthenticatedUser";

const router = express.Router();

router.post("/", isAuthenticatedUser, taskController.createTask);
router.get("/", isAuthenticatedUser, taskController.getAllTasks);
router.get("/:taskId", isAuthenticatedUser, taskController.getTaskById);
router.put("/:taskId", isAuthenticatedUser, taskController.updateTask);
router.delete("/:taskId", isAuthenticatedUser, taskController.deleteTask);

export default router;
