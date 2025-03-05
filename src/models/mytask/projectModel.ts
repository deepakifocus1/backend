import mongoose, { Document, Schema } from "mongoose";

export interface IProject extends Document {
  name: string;
  assignedEmployees: {
    employeeId: mongoose.Types.ObjectId;
    assignedBy?: string;
    removedBy?: string;
  }[];
}

const ProjectSchema: Schema<IProject> = new mongoose.Schema({
  name: { type: String, required: true },
  assignedEmployees: [
    {
      employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      assignedBy: { type: String },
      removedBy: { type: String },
    },
  ],
});

const Project = mongoose.model<IProject>("Project", ProjectSchema);
export default Project;
