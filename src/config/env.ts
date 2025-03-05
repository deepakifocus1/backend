import dotenv from "dotenv";
import { EnvConfig } from "../types";

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: envFile });


const envConfig: EnvConfig = {
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  mongoURI: process.env.MONGO_URI ?? "",
  jwtSecret: process.env.JWT_SECRET!,
  jwtShortExpiry: process.env.JWT_SHORT_EXPIRATION ?? "1d",
  jwtLongExpiry: process.env.JWT_LONG_EXPIRATION ?? "8d",
  cookieExpiry: process.env.COOKIE_EXPIRATION ?? "604800000",
  senderEmail: process.env.SENDER_EMAIL ?? "",
  awsSmtpUser: process.env.AWS_SMTP_USER ?? "",
  awsSmtpPass: process.env.AWS_SMTP_PASS ?? "",
};

export default envConfig;
