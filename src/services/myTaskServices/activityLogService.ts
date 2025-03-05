// import ActivityLog, {
//   IActivityLog,
// } from "../../models/mytask/activityLogModel";
// import mongoose from "mongoose";

// interface IActivityData {
//   activityType:
//     | "Task assigned"
//     | "Project assigned"
//     | "Task updated"
//     | "Project removed";
//   assignedBy: mongoose.Types.ObjectId;
//   assignedTo: mongoose.Types.ObjectId;
//   task: string;
//   timestamp?: Date;
// }

// const createActivityLog = async (
//   activityData: IActivityData
// ): Promise<IActivityLog> => {
//   try {
//     const newLog = new ActivityLog(activityData);
//     await newLog.save();
//     return newLog;
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       throw new Error("Error creating activity log: " + error.message);
//     }
//     throw new Error("An unknown error occurred while creating activity log.");
//   }
// };

// const getAllActivityLogs = async (): Promise<IActivityLog[]> => {
//   try {
//     const logs = await ActivityLog.find()
//       .populate("assignedBy", "name")
//       .populate("assignedTo", "name")
//       .sort({ updatedAt: -1 });

//     return logs;
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       throw new Error("Error retrieving activity logs: " + error.message);
//     }
//     throw new Error(
//       "An unknown error occurred while retrieving activity logs."
//     );
//   }
// };

// const getActivityLogsByUser = async (
//   assignedBy: mongoose.Types.ObjectId
// ): Promise<IActivityLog[]> => {
//   try {
//     const logs = await ActivityLog.find({ assignedBy }).sort({ timestamp: -1 });
//     return logs;
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       throw new Error(
//         "Error retrieving activity logs for the user: " + error.message
//       );
//     }
//     throw new Error(
//       "An unknown error occurred while retrieving activity logs for the user."
//     );
//   }
// };

// const getActivityLogsByType = async (
//   activityType: string
// ): Promise<IActivityLog[]> => {
//   try {
//     const logs = await ActivityLog.find({ activityType }).sort({
//       timestamp: -1,
//     });
//     return logs;
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       throw new Error(
//         "Error retrieving activity logs by type: " + error.message
//       );
//     }
//     throw new Error(
//       "An unknown error occurred while retrieving activity logs by type."
//     );
//   }
// };

// const deleteActivityLog = async (
//   logId: string
// ): Promise<IActivityLog | null> => {
//   try {
//     const deletedLog = await ActivityLog.findByIdAndDelete(logId);
//     if (!deletedLog) {
//       throw new Error("Activity log not found.");
//     }
//     return deletedLog;
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       throw new Error("Error deleting activity log: " + error.message);
//     }
//     throw new Error("An unknown error occurred while deleting activity log.");
//   }
// };

// const updateActivityLog = async (
//   logId: string,
//   updatedData: Partial<IActivityData>
// ): Promise<IActivityLog | null> => {
//   try {
//     const updatedLog = await ActivityLog.findByIdAndUpdate(logId, updatedData, {
//       new: true,
//     });
//     if (!updatedLog) {
//       throw new Error("Activity log not found.");
//     }
//     return updatedLog;
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       throw new Error("Error updating activity log: " + error.message);
//     }
//     throw new Error("An unknown error occurred while updating activity log.");
//   }
// };

// export {
//   createActivityLog,
//   getAllActivityLogs,
//   getActivityLogsByUser,
//   getActivityLogsByType,
//   deleteActivityLog,
//   updateActivityLog,
// };

import ActivityLog, {
  IActivityLog,
} from "../../models/mytask/activityLogModel";
import mongoose from "mongoose";
import { ErrorHandler } from "../../utils/errorHandler";
import { ERROR_MESSAGES } from "../../constants/errorMessages";

interface IActivityData {
  activityType:
    | "Task assigned"
    | "Project assigned"
    | "Task updated"
    | "Project removed";
  assignedBy: mongoose.Types.ObjectId;
  assignedTo: mongoose.Types.ObjectId;
  task: string;
  timestamp?: Date;
}

const createActivityLog = async (
  activityData: IActivityData
): Promise<IActivityLog> => {
  if (!mongoose.Types.ObjectId.isValid(activityData.assignedBy)) {
    throw new ErrorHandler(400, ERROR_MESSAGES.INVALID_ID);
  }

  if (!mongoose.Types.ObjectId.isValid(activityData.assignedTo)) {
    throw new ErrorHandler(400, ERROR_MESSAGES.INVALID_ID);
  }

  const validActivityTypes = [
    "Task assigned",
    "Project assigned",
    "Task updated",
    "Project removed",
  ];
  if (!validActivityTypes.includes(activityData.activityType)) {
    throw new ErrorHandler(400, ERROR_MESSAGES.INVALID_ACTIVITY_TYPE);
  }

  const newLog = new ActivityLog(activityData);
  await newLog.save();
  return newLog;
};

const getAllActivityLogs = async (): Promise<IActivityLog[]> => {
  return await ActivityLog.find()
    .populate("assignedBy", "name")
    .populate("assignedTo", "name")
    .sort({ updatedAt: -1 });
};

const getActivityLogsByUser = async (
  assignedBy: mongoose.Types.ObjectId
): Promise<IActivityLog[]> => {
  if (!mongoose.Types.ObjectId.isValid(assignedBy)) {
    throw new ErrorHandler(400, ERROR_MESSAGES.INVALID_ACTIVITY_ID);
  }

  return await ActivityLog.find({ assignedBy }).sort({ timestamp: -1 });
};

const getActivityLogsByType = async (
  activityType: string
): Promise<IActivityLog[]> => {
  const validActivityTypes = [
    "Task assigned",
    "Project assigned",
    "Task updated",
    "Project removed",
  ];
  if (!validActivityTypes.includes(activityType)) {
    throw new ErrorHandler(400, ERROR_MESSAGES.INVALID_ACTIVITY_TYPE);
  }

  return await ActivityLog.find({ activityType }).sort({ timestamp: -1 });
};

const deleteActivityLog = async (
  logId: string
): Promise<IActivityLog | null> => {
  if (!mongoose.Types.ObjectId.isValid(logId)) {
    throw new ErrorHandler(400, ERROR_MESSAGES.INVALID_ID);
  }

  const deletedLog = await ActivityLog.findByIdAndDelete(logId);
  if (!deletedLog) {
    throw new ErrorHandler(404, ERROR_MESSAGES.ACTIVITY_LOG_NOT_FOUND);
  }

  return deletedLog;
};

const updateActivityLog = async (
  logId: string,
  updatedData: Partial<IActivityData>
): Promise<IActivityLog | null> => {
  if (!mongoose.Types.ObjectId.isValid(logId)) {
    throw new ErrorHandler(400, ERROR_MESSAGES.INVALID_ID);
  }

  const updatedLog = await ActivityLog.findByIdAndUpdate(logId, updatedData, {
    new: true,
  });
  if (!updatedLog) {
    throw new ErrorHandler(404, ERROR_MESSAGES.ACTIVITY_LOG_NOT_FOUND);
  }

  return updatedLog;
};

export {
  createActivityLog,
  getAllActivityLogs,
  getActivityLogsByUser,
  getActivityLogsByType,
  deleteActivityLog,
  updateActivityLog,
};
