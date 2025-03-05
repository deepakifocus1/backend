import mongoose, { Schema, Document } from "mongoose";

interface Clarification {
  text: string;
  createdAt?: Date;
}

interface Comment {
  text: string;
  clarification: Clarification;
  createdAt?: Date;
}

interface ITask extends Document {
  projectId: mongoose.Types.ObjectId;
  description: string;
  assignedTo: mongoose.Types.ObjectId;
  startDate: Date;
  endDate: Date;
  expectedTime: number;
  startTrackingTime?: Date;
  actualTime?: number;
  priority: "High" | "Medium" | "Low";
  status: "Pending" | "In Progress" | "Completed";
  comments: Comment[];
  assignedBy?: mongoose.Types.ObjectId;
}

const ClarificationSchema = new Schema({
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const CommentSchema = new Schema({
  text: { type: String, required: true },
  clarification: ClarificationSchema,
  createdAt: { type: Date, default: Date.now },
});

const TaskSchema = new Schema<ITask>(
  {
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    description: { type: String, required: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User", required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    expectedTime: { type: Number, required: true },
    startTrackingTime: { type: Date },
    actualTime: { type: Number },
    priority: { type: String, enum: ["High", "Medium", "Low"], required: true },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
    comments: [CommentSchema],
    assignedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model<ITask>("Task", TaskSchema);
