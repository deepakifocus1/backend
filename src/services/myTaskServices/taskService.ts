import Task from "../../models/mytask/taskModel";
import mongoose from "mongoose";
import { ErrorHandler } from "../../utils/errorHandler";
import { ERROR_MESSAGES } from "../../constants/errorMessages";

export const createTask = async (taskData: any) => {
  return await Task.create(taskData);
};

export const getAllTasks = async () => {
  return await Task.find()
    .sort({ updatedAt: -1 })
    .populate([
      { path: "projectId", select: "name" },
      { path: "assignedTo", select: "name" },
      { path: "assignedBy", select: "name" },
    ]);
};

export const getTaskById = async (taskId: string) => {
  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    throw new ErrorHandler(400, ERROR_MESSAGES.INVALID_TASK_ID);
  }

  const task = await Task.findById(taskId).populate([
    { path: "projectId", select: "name" },
    { path: "assignedTo", select: "name" },
    { path: "assignedBy", select: "name" },
  ]);

  if (!task) {
    throw new ErrorHandler(404, ERROR_MESSAGES.TASK_NOT_FOUND);
  }

  return task;
};

export const updateTask = async (
  taskId: string,
  taskUpdates: any = {},
  commentId?: string,
  commentText?: string,
  clarificationText?: string
) => {
  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    throw new ErrorHandler(400, "Invalid task ID");
  }

  const task = await Task.findById(taskId);
  if (!task) {
    throw new ErrorHandler(404, "Task not found");
  }

  if (commentText) {
    if (commentId) {
      return await Task.findOneAndUpdate(
        { _id: taskId, "comments._id": commentId },
        { $set: { "comments.$.text": commentText } },
        { new: true }
      );
    }
    return await Task.findByIdAndUpdate(
      taskId,
      { $push: { comments: { text: commentText } } },
      { new: true }
    );
  }

  if (clarificationText && commentId) {
    return await Task.findOneAndUpdate(
      { _id: taskId, "comments._id": commentId },
      {
        $set: {
          "comments.$.clarification": {
            text: clarificationText,
            createdAt: new Date(),
          },
        },
      },
      { new: true }
    );
  }

  const updateQuery: any = { ...taskUpdates };

  if (task.status === "Pending" && updateQuery.status === "In Progress") {
    updateQuery.startTrackingTime = new Date();
  }

  if (task.status === "In Progress" && updateQuery.status === "Completed") {
    if (task.startTrackingTime) {
      const startTime = new Date(task.startTrackingTime).getTime();
      const endTime = new Date().getTime();

      updateQuery.actualTime =
        Math.round(((endTime - startTime) / (1000 * 60 * 60)) * 100) / 100; // More precise calculation with 2 decimal places
    }
  }

  const updatedTask = await Task.findByIdAndUpdate(taskId, updateQuery, {
    new: true,
    runValidators: true,
  });

  return updatedTask;
};

export const deleteTask = async (taskId: string) => {
  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    throw new ErrorHandler(400, ERROR_MESSAGES.INVALID_ID);
  }

  const task = await Task.findByIdAndDelete(taskId);

  if (!task) {
    throw new ErrorHandler(404, ERROR_MESSAGES.TASK_NOT_FOUND);
  }

  return task;
};
