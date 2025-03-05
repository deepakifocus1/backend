import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/errorHandler";
import { User } from "../models/user/userModel";
import { catchAsyncErrors } from "./catchAsyncErrors";
import { envConfig } from "../config";
import { ERROR_MESSAGES } from "../constants/errorMessages";

export async function jwtVerify(token: string, secret: string): Promise<any> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) return reject(err);
      resolve(decoded);
    });
  });
}

const allowedRoles = [
  "HR",
  "Admin",
  "Finance",
  "TAG",
  "Sales",
  "Marketing",
  "IT Support",
  "Senior Management"
];

export const isAuthenticatedUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }
    if (!token) {
      return next(new ErrorHandler(401, ERROR_MESSAGES.LOGIN_USER));
    }

    const decodedData = await jwtVerify(token, envConfig.jwtSecret);

    let currentUser = await User.findById(decodedData.id)
      .select("+password")
      .exec();
    if (
      req?.params?.employeeId && currentUser?.employeeId !== req?.params?.employeeId &&
      !(currentUser?.role && allowedRoles.includes(currentUser.role))
    ) {
      return res.status(403).json({ message: "Forbidden: Access denied" });
    }

    if (!currentUser) {
      return next(new ErrorHandler(401, ERROR_MESSAGES.NO_USER));
    }

    req.user = currentUser;
    next();
  }
);
