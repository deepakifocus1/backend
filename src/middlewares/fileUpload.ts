import multer from "multer";
import { ErrorHandler } from "../utils/errorHandler";
import { Request } from "express";
import { ERROR_MESSAGES } from "../constants/errorMessages";

const allowedFileTypes = [
  "application/pdf",
  "application/msword",
  "application/txt",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const FILE_SIZE_LIMIT = 5 * 1024 * 1024;
const storage = multer.memoryStorage();

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new ErrorHandler(401, ERROR_MESSAGES.INVALID_DOC_TYPE));
  }
};

const uploadFileMiddleware = multer({
  storage: storage,
  limits: {
    fileSize: FILE_SIZE_LIMIT,
  },
  fileFilter: fileFilter,
});

export default uploadFileMiddleware;
