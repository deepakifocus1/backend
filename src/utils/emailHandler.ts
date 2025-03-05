import { IUser } from "../types";
import generator from "generate-password";
import { envConfig } from "../config";
import axios from "axios";
import {
  emailText,
  createDataMail,
  updateDataMailText,
} from "../constants/properties";
import { SUCCESS_MESSAGE } from "../constants/message";

export const generateAndUpdatePassword = async (
  user: IUser
): Promise<string> => {
  const tempPassword = generator.generate({
    length: 16,
    numbers: true,
  });

  user.password = tempPassword;
  await user.save();
  return tempPassword;
};

export const sendTempPasswordEmail = async (
  user: IUser,
  tempPassword: string
): Promise<string> => {
  const text = emailText(user.name, tempPassword);
  const mailOptions = {
    fromAddress: envConfig.senderEmail,
    toAddress: user.email,
    subject: SUCCESS_MESSAGE.SUBJECT,
    body: text,
  };

  const response = await axios.post(
    "https://notification.wiztap.in/emailconsent/sendEmail",
    mailOptions
  );

  return response.data.message;
};

export const sendCreateDataEmail = async (
  user: IUser,
  tempPassword: string
): Promise<string> => {
  const text = createDataMail(
    user.name,
    user.employeeId,
    user.email,
    tempPassword
  );
  const mailOptions = {
    fromAddress: envConfig.senderEmail,
    toAddress: user.email,
    subject: SUCCESS_MESSAGE.MYDATA_SUBJECT,
    body: text,
  };

  const response = await axios.post(
    "https://notification.wiztap.in/emailconsent/sendEmail",
    mailOptions
  );

  return response.data.message;
};

export const updateDataEmail = async (user: IUser): Promise<string> => {
  const text = updateDataMailText(user.name, user.email);
  const mailOptions = {
    fromAddress: envConfig.senderEmail,
    toAddress: user.email,
    subject: SUCCESS_MESSAGE.MYDATA_SUBJECT,
    body: text,
  };

  const response = await axios.post(
    "https://notification.wiztap.in/emailconsent/sendEmail",
    mailOptions
  );

  return response.data.message;
};
