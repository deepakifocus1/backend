import express from "express";
import * as projectController from "../../controllers/myTaskControllers/projectController";
import { isAuthenticatedUser } from "../../../middlewares/isAuthenticatedUser";

const router = express.Router();

router.post("/", isAuthenticatedUser, projectController.createProject);
router.get("/", isAuthenticatedUser, projectController.getAllProjects);
router.get("/:id", isAuthenticatedUser, projectController.getProjectById);
router.put(
  "/assign",
  isAuthenticatedUser,
  projectController.assignEmployeeController
);
router.put("/remove", isAuthenticatedUser, projectController.removeEmployee);
router.delete("/:id", isAuthenticatedUser, projectController.deleteProject);

export default router;
