import express from "express";
import {
  createActivityLogController,
  getAllActivityLogsController,
  getActivityLogsByUserController,
  getActivityLogsByTypeController,
  deleteActivityLogController,
  updateActivityLogController,
} from "../../controllers/myTaskControllers/activityLogController";
import { isAuthenticatedUser } from "../../../middlewares/isAuthenticatedUser";

const router = express.Router();

router.post("/", isAuthenticatedUser, createActivityLogController);

router.get("/", isAuthenticatedUser, getAllActivityLogsController);

router.get(
  "/:assignedBy",
  isAuthenticatedUser,
  getActivityLogsByUserController
);

router.get(
  "/type/:activityType",
  isAuthenticatedUser,
  getActivityLogsByTypeController
);

router.delete("/:logId", isAuthenticatedUser, deleteActivityLogController);

router.put("/:logId", isAuthenticatedUser, updateActivityLogController);

export default router;
