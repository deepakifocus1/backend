// import { Request, Response } from "express";
// import mongoose from "mongoose"; // Import mongoose for ObjectId handling
// import {
//   createActivityLog,
//   getAllActivityLogs,
//   getActivityLogsByUser,
//   getActivityLogsByType,
//   deleteActivityLog,
//   updateActivityLog,
// } from "../../../services/myTaskServices/activityLogService"; // Import your service methods

// // Controller to create a new activity log
// const createActivityLogController = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   const { activityType, assignedBy, assignedTo, task, timestamp } = req.body;

//   try {
//     // Ensure assignedBy and assignedTo are ObjectId types
//     const activityData = {
//       activityType,
//       assignedBy: new mongoose.Types.ObjectId(assignedBy),
//       assignedTo: new mongoose.Types.ObjectId(assignedTo),
//       task,
//       timestamp,
//     };

//     const newLog = await createActivityLog(activityData);
//     res.status(201).json(newLog);
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Controller to get all activity logs
// const getAllActivityLogsController = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const logs = await getAllActivityLogs();
//     res.status(200).json(logs);
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Controller to get activity logs by assignedBy (user who performed the activity)
// const getActivityLogsByUserController = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   const { assignedBy } = req.params; // Assuming `assignedBy` is passed as a URL parameter

//   try {
//     const logs = await getActivityLogsByUser(
//       new mongoose.Types.ObjectId(assignedBy)
//     );
//     res.status(200).json(logs);
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Controller to get activity logs by activityType
// const getActivityLogsByTypeController = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   const { activityType } = req.params; // Assuming `activityType` is passed as a URL parameter

//   try {
//     const logs = await getActivityLogsByType(activityType);
//     res.status(200).json(logs);
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Controller to delete an activity log by its ID
// const deleteActivityLogController = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   const { logId } = req.params; // Assuming `logId` is passed as a URL parameter

//   try {
//     const deletedLog = await deleteActivityLog(logId);
//     res.status(200).json(deletedLog);
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Controller to update an activity log
// const updateActivityLogController = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   const { logId } = req.params; // Assuming `logId` is passed as a URL parameter
//   const updatedData = req.body; // Assuming updated data is in the request body

//   // Ensure `assignedBy` and `assignedTo` are ObjectId types if they are provided
//   if (updatedData.assignedBy) {
//     updatedData.assignedBy = new mongoose.Types.ObjectId(
//       updatedData.assignedBy
//     );
//   }
//   if (updatedData.assignedTo) {
//     updatedData.assignedTo = new mongoose.Types.ObjectId(
//       updatedData.assignedTo
//     );
//   }

//   try {
//     const updatedLog = await updateActivityLog(logId, updatedData);
//     res.status(200).json(updatedLog);
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export {
//   createActivityLogController,
//   getAllActivityLogsController,
//   getActivityLogsByUserController,
//   getActivityLogsByTypeController,
//   deleteActivityLogController,
//   updateActivityLogController,
// };

import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import {
  createActivityLog,
  getAllActivityLogs,
  getActivityLogsByUser,
  getActivityLogsByType,
  deleteActivityLog,
  updateActivityLog,
} from "../../../services/myTaskServices/activityLogService";
import { ErrorHandler } from "../../../utils/errorHandler";
import { SUCCESS_MESSAGE } from "../../../constants/message";
import { ERROR_MESSAGES } from "../../../constants/errorMessages";
import { catchAsyncErrors } from "../../../middlewares/catchAsyncErrors";

export const createActivityLogController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { activityType, assignedBy, assignedTo, task, timestamp } = req.body;

    const activityData = {
      activityType,
      assignedBy: new mongoose.Types.ObjectId(assignedBy),
      assignedTo: new mongoose.Types.ObjectId(assignedTo),
      task,
      timestamp,
    };

    const newLog = await createActivityLog(activityData);
    res.status(201).json({
      status: "Success",
      message: SUCCESS_MESSAGE.ACTIVITY_LOG_CREATED,
      data: newLog,
    });
  }
);

export const getAllActivityLogsController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const logs = await getAllActivityLogs();
    res.status(200).json({
      status: "Success",
      message: SUCCESS_MESSAGE.ACTIVITY_LOGS_RETRIEVED,
      data: logs,
    });
  }
);

export const getActivityLogsByUserController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { assignedBy } = req.params;
    const logs = await getActivityLogsByUser(
      new mongoose.Types.ObjectId(assignedBy)
    );
    res.status(200).json({
      status: "Success",
      message: SUCCESS_MESSAGE.ACTIVITY_LOGS_RETRIEVED_BY_USER,
      data: logs,
    });
  }
);

export const getActivityLogsByTypeController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { activityType } = req.params;
    const logs = await getActivityLogsByType(activityType);
    res.status(200).json({
      status: "Success",
      message: SUCCESS_MESSAGE.ACTIVITY_LOGS_RETRIEVED_BY_TYPE,
      data: logs,
    });
  }
);

export const deleteActivityLogController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { logId } = req.params;
    const deletedLog = await deleteActivityLog(logId);
    if (!deletedLog) {
      throw new ErrorHandler(404, ERROR_MESSAGES.ACTIVITY_LOG_NOT_FOUND);
    }
    res.status(200).json({
      status: "Success",
      message: SUCCESS_MESSAGE.ACTIVITY_LOG_DELETED,
      data: deletedLog,
    });
  }
);

export const updateActivityLogController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { logId } = req.params;
    const updatedData = req.body;

    if (updatedData.assignedBy) {
      updatedData.assignedBy = new mongoose.Types.ObjectId(
        updatedData.assignedBy
      );
    }
    if (updatedData.assignedTo) {
      updatedData.assignedTo = new mongoose.Types.ObjectId(
        updatedData.assignedTo
      );
    }

    const updatedLog = await updateActivityLog(logId, updatedData);
    if (!updatedLog) {
      throw new ErrorHandler(404, ERROR_MESSAGES.ACTIVITY_LOG_NOT_FOUND);
    }
    res.status(200).json({
      status: "Success",
      message: SUCCESS_MESSAGE.ACTIVITY_LOG_UPDATED,
      data: updatedLog,
    });
  }
);
