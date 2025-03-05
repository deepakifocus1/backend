// src/models/issues/issuesModel.ts
import mongoose, { Schema } from "mongoose";
import { IIssue } from "../../types/issueIndex";
import { PRIORITIES, STATUSES } from "../../constants/issueConstants";
import { IDocument } from "./issuesTypes";

const commentSchema: Schema = new Schema({
  comment: {
    type: String,
  },
  status: {
    type: String,
    required: [true, "Please provide the status"],
  },
  commentedBy: {
    type: String,
  },
  userImage: {
    type: String,
  },
  commentedAt: {
    type: Date,
    default: Date.now,
  },
  
});

const issueSchema: Schema = new Schema({
  userImage:{
    type: String, 
  },
  issueId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  employeeID: {
    type: String,
  },
  client: {
    type: String,
  },
  projectName: {
    type: String,
  }, 
  subject: {
    type: String,
    required: [true, "Please Provide Subject"],
  },
  issueDescription: {
    type: String,
    required: [true, "Please Provide Issue Description"],
  },
  priority: {
    type: String,
    enum: PRIORITIES,
    default: "Low",
  },
  status: {
    type: String,
    enum: STATUSES,
    default: "Open",
  },
  assignedTo: {
    department: {
      type: String,
      required: true
    }
  },
  comments: [commentSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  closedAt: {
    type: Date,
  },
  documentUrls:[String],
});

const documentSchema = new mongoose.Schema<IDocument>({
  name: { type: String, required: true },
  url: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const sequenceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: Number,
    required: true,
  },
});



export const Sequence = mongoose.model('Sequence', sequenceSchema);

export const Document = mongoose.model<IDocument>("Document", documentSchema);

export const Issue = mongoose.model<IIssue>("Issue", issueSchema);
