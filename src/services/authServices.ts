import { ERROR_MESSAGES } from "../constants/errorMessages";
import { User } from "../models/user/userModel";
import { IUser } from "../types";
import { ErrorHandler } from "../utils/errorHandler";
import {
  generateAndUpdatePassword,
  sendTempPasswordEmail,
} from "../utils/emailHandler";

export const registerUser = async (userPayload: any): Promise<IUser> => {
  const { email } = userPayload;
  const userExists = await User.findOne({ email }).exec();
  if (userExists) {
    throw new ErrorHandler(400, ERROR_MESSAGES.ALREADY_EXIST);
  }

  const userInstance = new User(userPayload);
  await userInstance.save();
  return userInstance;
};

export const loginUser = async (
  email: string,
  password: string
): Promise<IUser> => {
  const userInstance = await User.findOne({ email }).select("+password").exec();
  if (userInstance && (await userInstance.comparePassword(password))) {
    return userInstance;
  } else {
    throw new ErrorHandler(400, ERROR_MESSAGES.INVALID_CREDENTIALS);
  }
};

export const updatePassword = async (
  userId: any,
  oldPassword: string,
  newPassword: string
): Promise<IUser> => {
  const userInstance = await User.findById(userId).select("+password").exec();
  if (!userInstance) {
    throw new ErrorHandler(404, ERROR_MESSAGES.USER_NOT_FOUND);
  }
  const isMatch = await userInstance.comparePassword(oldPassword);
  if (!isMatch) {
    throw new ErrorHandler(400, ERROR_MESSAGES.OLD_PASSWORD);
  }
  userInstance.password = newPassword;
  await userInstance.save();
  return userInstance;
};

export const forgotPassword = async (email: string): Promise<string> => {
  const userInstance = await User.findOne({ email }).exec();
  if (!userInstance) {
    throw new ErrorHandler(404, ERROR_MESSAGES.USER_NOT_FOUND);
  }
  const tempPassword = await generateAndUpdatePassword(userInstance);
  const tempPass = await sendTempPasswordEmail(userInstance, tempPassword);

  if (!tempPass) {
    throw new ErrorHandler(404, ERROR_MESSAGES.EMAIL_ERROR);
  }

  return tempPass;
};
