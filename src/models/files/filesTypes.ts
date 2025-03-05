import mongoose from "mongoose";

export interface IFile extends mongoose.Document {
  name: string;
  url: string;
  createdAt: Date;
}
