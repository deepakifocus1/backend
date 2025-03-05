import nodemailer from "nodemailer";
import envConfig from "./env";

let smtpUser: string = envConfig.awsSmtpUser;
let smtpPass: string = envConfig.awsSmtpPass;

export const transporter = nodemailer.createTransport({
  host: "email-smtp.ap-south-1.amazonaws.com",
  port: 465,
  secure: true,
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});
