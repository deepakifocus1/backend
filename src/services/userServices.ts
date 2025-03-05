import mongoose from "mongoose";
import { User } from "../models/user/userModel";
import { IUser } from "../types";
import { ErrorHandler } from "../utils/errorHandler";
import { ERROR_MESSAGES } from "../constants/errorMessages";
import { checkUniqueIdentifiers } from "./myDataServices";

export const updateUser = async (userId: string, updateData: any) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ErrorHandler(400, "Invalid user ID");
  }
  const user = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  }).exec();
  if (!user) {
    throw new ErrorHandler(404, ERROR_MESSAGES.USER_NOT_FOUND);
  }
  return user;
};

export const deleteUser = async (userId: string) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ErrorHandler(400, ERROR_MESSAGES.INVALID_USER_ID);
  }
  const user = await User.findByIdAndUpdate(
    userId,
    { isActive: false },
    { new: true }
  ).exec();
  if (!user) {
    throw new ErrorHandler(404, ERROR_MESSAGES.USER_NOT_FOUND);
  }
};

export const fetchUsers = async (): Promise<IUser[]> => {
  const usersData = await User.find().exec();
  return usersData;
};

export const fetchUserByEmployeeId = async (employeeId: string) => {
  if (!employeeId) {
    throw new ErrorHandler(400, ERROR_MESSAGES.EMPLOYEE_ID);
  }
  const user = await User.findOne({ employeeId }).exec();
  return user;
};

export const updateUserByEmployeeId = async (
  employeeId: string,
  updateData: any
) => {
  if (!employeeId) {
    throw new ErrorHandler(400, "Employee ID is required");
  }
  await checkUniqueIdentifiers(updateData);
  const user = await User.findOneAndUpdate({ employeeId }, updateData, {
    new: true,
    runValidators: true,
  }).exec();

  if (!user) {
    throw new ErrorHandler(404, ERROR_MESSAGES.USER_NOT_FOUND);
  }

  return user;
};
