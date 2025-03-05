import multer from "multer";
import { ErrorHandler } from "../utils/errorHandler";
import { Request } from "express";

const allowedFileTypes = [
  "application/pdf",
  "application/msword",
  "image/png",
  "image/jpeg",
  "image/jpg",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

const FILE_SIZE_LIMIT = 5 * 1024 * 1024;
const storage = multer.memoryStorage();

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (allowedFileTypes.includes(file.mimetype) || file.originalname.match(/\.(txt)$/)) {
    cb(null, true);
  } else {
    cb(
      new ErrorHandler(
        401,
        "Invalid file type, only JPEG, DocX, PNG, PDF, TXT and XLSX are allowed!"
      )
    );
  }
};

const uploadDocumentMiddleware = multer({
  storage: storage,
  limits: {
    fileSize: FILE_SIZE_LIMIT,
  },
  fileFilter: fileFilter,
}); 

export default uploadDocumentMiddleware;