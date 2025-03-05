import { NextFunction, Request, Response } from "express";
import { ERROR_MESSAGES } from "../../constants/errorMessages";
import { SUCCESS_MESSAGE } from "../../constants/message";
import {
  getImagesFromDataBase,
  saveImageUrlToDatabase,
  uploadImageToS3,
  deleteProfileImage,
} from "../../services/imageServices";
import { imageValidationSchema } from "../../validations/imageValidations";
import { ErrorHandler } from "../../utils/errorHandler";
import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors";

export const uploadImage = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
      throw new ErrorHandler(400, ERROR_MESSAGES.NO_FILE);
    }
    const [imageUrl, fileName] = await uploadImageToS3(req.file);
    const { error } = imageValidationSchema.validate({
      url: imageUrl,
      fileName: fileName,
    });
    if (error) {
      throw new ErrorHandler(400, error.details[0].message);
    }
    const newImage = await saveImageUrlToDatabase(imageUrl, fileName);
    res.json({
      status: "Success",
      message: SUCCESS_MESSAGE.FILE_UPLOAD,
      data: newImage,
    });
  }
);

export const getImages = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const images = await getImagesFromDataBase();
    res.status(200).json({
      status: "Success",
      message: SUCCESS_MESSAGE.PROFILES_FETCHED,
      images,
    });
  }
);

export const deleteImage = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { imageId } = req.params;
    if (!imageId) {
      throw new ErrorHandler(400, ERROR_MESSAGES.NO_IMAGE_ID);
    }
    await deleteProfileImage(imageId);
    res.json({ status: "Success", message: SUCCESS_MESSAGE.IMAGE_DELETED });
  }
);
