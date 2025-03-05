import { Request, Response, NextFunction } from "express";
import {
  uploadCertificate,
  getCertificateDocument,
  deleteCertificateDocument,
} from "../../services/fileUploadService";

import { ERROR_MESSAGES } from "../../constants/errorMessages";
import { SUCCESS_MESSAGE } from "../../constants/message";
import { ErrorHandler } from "../../utils/errorHandler";
import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors";

export const uploadCertificateController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
      throw new ErrorHandler(400, ERROR_MESSAGES.FILE_MISSING);
    }
    const document = await uploadCertificate(req.file);
    res.status(201).json({
      status: "Success",
      message: SUCCESS_MESSAGE.FILE_UPLOADED,
      document,
    });
  }
);

export const getCertificateController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const documents = await getCertificateDocument();
    res.status(201).json({
      status: "Success",
      message: SUCCESS_MESSAGE.DOCUMENTS_FETCHED,
      documents,
    });
  }
);

export const deleteCertificateController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    await deleteCertificateDocument(id);
    res.json({ status: "Success", message: SUCCESS_MESSAGE.FILE_DELETED });
  }
);
