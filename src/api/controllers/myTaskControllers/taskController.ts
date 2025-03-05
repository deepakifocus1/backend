import { Request, Response, NextFunction } from "express";
import * as taskService from "../../../services/myTaskServices/taskService";
import { ErrorHandler } from "../../../utils/errorHandler";
import { SUCCESS_MESSAGE } from "../../../constants/message";
import { catchAsyncErrors } from "../../../middlewares/catchAsyncErrors";
import { ERROR_MESSAGES } from "../../../constants/errorMessages";

export const createTask = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const task = await taskService.createTask(req.body);
    res.status(201).json({
      status: "Success",
      message: SUCCESS_MESSAGE.TASK_CREATED,
      data: task,
    });
  }
);

export const getAllTasks = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const tasks = await taskService.getAllTasks();
    res.status(200).json({
      status: "Success",
      message: SUCCESS_MESSAGE.TASKS_RETRIEVED,
      data: tasks,
    });
  }
);

export const getTaskById = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const task = await taskService.getTaskById(req.params.taskId);
    if (!task) {
      throw new ErrorHandler(404, ERROR_MESSAGES.TASK_NOT_FOUND);
    }
    res.status(200).json({
      status: "Success",
      message: SUCCESS_MESSAGE.TASK_RETRIEVED,
      data: task,
    });
  }
);

export const updateTask = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { taskId } = req.params;
    const { commentId, commentText, clarificationText, ...taskUpdates } =
      req.body;

    if (!taskId) {
      return res
        .status(400)
        .json({ status: "Fail", message: "Task ID is required" });
    }

    const updatedTask = await taskService.updateTask(
      taskId,
      taskUpdates,
      commentId,
      commentText,
      clarificationText
    );

    res.status(200).json({
      status: "Success",
      message: "Task updated successfully",
      data: updatedTask,
    });
  }
);

export const deleteTask = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    await taskService.deleteTask(req.params.taskId);
    res.status(200).json({
      status: "Success",
      message: SUCCESS_MESSAGE.TASK_DELETED,
    });
  }
);
