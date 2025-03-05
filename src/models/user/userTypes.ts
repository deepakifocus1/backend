import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  id: number;
  employeeId: string;
  name: string;
  role: string;
  phone: number;
  email: string;
  password: string;
  client: string;
  isActive: boolean;
  team: string;
  projects: mongoose.Types.ObjectId[];
  comparePassword: (password: string) => Promise<boolean>;
}
