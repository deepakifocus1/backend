import { CookieOptions } from "./../types";
import { Response } from "express";
import { IUser } from "../models/user/userTypes";
import jwt from "jsonwebtoken";
import envConfig from "../config/env";

const sendToken = (
  user: IUser,
  statusCode: number,
  message: string,
  res: Response,
  rememberMe: boolean
): void => {
  const tokenExpiry = rememberMe ? "8d" : "1d";

  const token = jwt.sign({ id: user._id }, envConfig.jwtSecret, {
    expiresIn: tokenExpiry,
  });

  const options: CookieOptions = {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production",
  };

  if (rememberMe) {
    options.expires = new Date(Date.now() + parseInt(envConfig.cookieExpiry));
    console.log(process.env.COOKIE_EXPIRATION);
  }

  res
    .status(statusCode)
    .cookie("token", token, options)
    .send({
      status: "success",
      message: message,
      token,
      data: {
        user: user,
      },
    });
};

export default sendToken;
