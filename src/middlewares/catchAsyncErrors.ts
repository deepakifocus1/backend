import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "../utils/errorHandler";

export const catchAsyncErrors =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
      if (error instanceof ErrorHandler) {
        next(new ErrorHandler(error.statusCode, error.message));
      } else {
        next(error);
      }
      
    });
  };
