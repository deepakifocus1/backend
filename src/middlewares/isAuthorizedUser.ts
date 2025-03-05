import { Request, Response, NextFunction } from "express";
import { ERROR_MESSAGES } from "../constants/errorMessages";

function isAuthorizedUser(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;

    if (!userRole || !roles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: ERROR_MESSAGES.UNAUTHORIZED_USER,
      });
    }
    next();
  };
}

export default isAuthorizedUser;
