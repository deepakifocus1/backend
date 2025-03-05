import { Request, Response, NextFunction } from "express";
import {
  uploadEducationalDocument,
  getEducationalDocuments,
  deleteEducationalDocument,
} from "../../services/fileUploadService";
import { ERROR_MESSAGES } from "../../constants/errorMessages";
import { SUCCESS_MESSAGE } from "../../constants/message";

import { ErrorHandler } from "../../utils/errorHandler";
import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors";

export const uploadEducationalDocumentController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
      throw new ErrorHandler(400, ERROR_MESSAGES.FILE_MISSING);
    }
    const document = await uploadEducationalDocument(req.file);
    res.status(201).json({
      status: "Success",
      message: SUCCESS_MESSAGE.FILE_UPLOADED,
      document,
    });
  }
);

export const getEducationalDocumentsController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const documents = await getEducationalDocuments();
    res.status(201).json({
      status: "Success",
      message: SUCCESS_MESSAGE.DOCUMENTS_FETCHED,
      documents,
    });
  }
);

export const deleteEducationalDocumentController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    await deleteEducationalDocument(id);
    res.json({ status: "Success", message: SUCCESS_MESSAGE.FILE_DELETED });
  }
);
