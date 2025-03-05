import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { ErrorHandler } from "../utils/errorHandler";

export const validateRequest = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw new ErrorHandler(400, error.details[0].message);
    }
    next();
  };
};
