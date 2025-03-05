import { ErrorHandler } from "../utils/errorHandler";

const errorHandlerMiddleware = (
  err: ErrorHandler,
  req: any,
  res: any,
  next: any
) => {
  if (err.name == "NotFound") {
    err.message = "Resource not found!";
  } else {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "internal server error";
  }
  res.status(err.statusCode).json({
    status: "error",
    message: err.message,
  });
};

export default errorHandlerMiddleware;
