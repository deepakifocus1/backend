import { registerUser } from "./authServices";
import {
  generateAndUpdatePassword,
  sendCreateDataEmail,
  updateDataEmail,
} from "../utils/emailHandler";
import { ERROR_MESSAGES } from "../constants/errorMessages";
import { SUCCESS_MESSAGE } from "../constants/message";

import { ErrorHandler } from "../utils/errorHandler";
import { updateUserByEmployeeId } from "./userServices";

export const emailService = async (
  name: string,
  email: string,
  employeeId: string,
  role: string
) => {
  const user = await registerUser({
    role,
    employeeId,
    name,
    email,
    password: SUCCESS_MESSAGE.DEFAULT_PASS,
  });
  if (!user) {
    throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
  }
  const tempPassword = await generateAndUpdatePassword(user);

  const userCredential = await sendCreateDataEmail(user, tempPassword);
  if (!userCredential) {
    throw new ErrorHandler(404, ERROR_MESSAGES.EMAIL_ERROR);
  }
  return SUCCESS_MESSAGE.CREDENTIAL_EMAIL;
};

export const updateEmailService = async (
  name: string,
  email: string,
  employeeId: string,
  role: string
) => {
  const user = await updateUserByEmployeeId(employeeId, email);
  const updatedEmail = await updateDataEmail(user);
  if (!updatedEmail) {
    throw new ErrorHandler(404, ERROR_MESSAGES.EMAIL_ERROR);
  }
  return SUCCESS_MESSAGE.CREDENTIAL_EMAIL;
};
