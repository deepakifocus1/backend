import mongoose, { Schema, Document } from "mongoose";

// Define the interface for ActivityLog document
export interface IActivityLog extends Document {
  activityType:
    | "Task assigned"
    | "Project assigned"
    | "Task updated"
    | "Project removed";
  assignedBy: mongoose.Types.ObjectId;
  assignedTo: mongoose.Types.ObjectId;
  task: string;
  timestamp: Date;
}

// Define the schema for ActivityLog
const activityLogSchema = new Schema<IActivityLog>(
  {
    activityType: {
      type: String,
      enum: [
        "Task assigned",
        "Project assigned",
        "Task updated",
        "Project removed",
      ],
      required: true,
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User model
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User model
      required: true,
    },
    task: { type: String },
  },
  { timestamps: true }
);

// Create the ActivityLog model with type IActivityLog
const ActivityLog = mongoose.model<IActivityLog>(
  "ActivityLog",
  activityLogSchema
);

export default ActivityLog;
