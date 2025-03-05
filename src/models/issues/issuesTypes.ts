import mongoose, { Document } from "mongoose";

export enum Priority {
  Low = "Low",
  Medium = "Medium",
  High = "High",
}

export enum Status {
  Open = "Open",
  Closed = "Closed",
  Reopened = "Reopened",
  Pending = "Pending",
  Decline = "Decline",
  InProgress = "InProgress",
  Completed = "Completed",
  Withdrawn = "Withdrawn"
}

export enum Assignee {
  Unassigned = "Unassigned",
  HR = "HR",
  Finance = "Finance",
  ITSupport = "IT Support",
  Admin = "Admin",
  TAG = "TAG",
  Sales = "Sales",
  Marketing = "Marketing",
  SeniorManagement =  "Senior Management"
}
export interface IComment {
  comment: string;
  status: string;
  commentedBy : string;
  userImage : string;
  commentedAt: Date;
  
}

export interface IIssue extends Document {
  userImage: string; 
  issueId: string;
  subject: string;
  issueDescription: string;
  priority: Priority;
  status: Status;
  name : string;
  employeeID : string;
  projectName : string;
  client : string;
  assignedTo: {
    department: string;
   
  };
  comments: IComment[]; 
  createdAt: Date;
  closedAt: Date;
  documentUrls:string[];
}

export interface IDocument extends mongoose.Document {
    name: string;
    url: string;
    createdAt: Date;
  }