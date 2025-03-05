import multer from "multer";
import { Request } from "express";
import { ERROR_MESSAGES } from "../constants/errorMessages";

const FILE_SIZE_LIMIT = 5 * 1024 * 1024;
const storage = multer.memoryStorage();

const allowedTypes = ["image.jpeg", "image/png", "image/gif", "image/jpeg"];

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error(ERROR_MESSAGES.INVALID_IMAGE));
  }
  cb(null, true);
};

const upload = multer({
  storage : storage,
  limits: {
    fileSize: FILE_SIZE_LIMIT,
  },
  fileFilter: fileFilter,
});

export const uploadImageMiddleware = upload.single("image");

