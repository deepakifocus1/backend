import { Request, Response, NextFunction } from "express";
import { ERROR_MESSAGES } from "../../constants/errorMessages";
import { SUCCESS_MESSAGE } from "../../constants/message";
import { ErrorHandler } from "../../utils/errorHandler";

import {
  uploadOfferLetterDocument,
  getOfferLetterDocuments,
  deleteOfferLetterDocument,
  uploadRelievingDocument,
  getRelievingDocuments,
  deleteRelievingDocument,
  uploadPaySlipDocument,
  getPaySlipDocuments,
  deletePaySlipDocument,
} from "../../services/fileUploadService";
import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors";

//offerLetter
export const uploadOfferLetterController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
      throw new ErrorHandler(400, ERROR_MESSAGES.FILE_MISSING);
    }
    const document = await uploadOfferLetterDocument(req.file);
    res.status(201).json({
      status: "Success",
      message: SUCCESS_MESSAGE.FILE_UPLOADED,
      document,
    });
  }
);

export const getOfferLettersController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const documents = await getOfferLetterDocuments();
    res.status(201).json({
      status: "Success",
      message: SUCCESS_MESSAGE.DOCUMENTS_FETCHED,
      documents,
    });
  }
);

export const deleteOfferLetterController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    await deleteOfferLetterDocument(id);
    res.json({ status: "Success", message: SUCCESS_MESSAGE.FILE_DELETED });
  }
);

//relieving
export const uploadRelievingController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
      throw new ErrorHandler(400, ERROR_MESSAGES.FILE_MISSING);
    }
    const document = await uploadRelievingDocument(req.file);
    res.status(201).json({
      status: "Success",
      message: SUCCESS_MESSAGE.FILE_UPLOADED,
      document,
    });
  }
);

export const getRelievingController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const documents = await getRelievingDocuments();
    res.status(201).json({
      status: "Success",
      message: SUCCESS_MESSAGE.DOCUMENTS_FETCHED,
      documents,
    });
  }
);

export const deleteRelievingController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    await deleteRelievingDocument(id);
    res.json({ status: "Success", message: SUCCESS_MESSAGE.FILE_DELETED });
  }
);

//paySlip
export const uploadPaySlipController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
      throw new ErrorHandler(400, ERROR_MESSAGES.FILE_MISSING);
    }
    const document = await uploadPaySlipDocument(req.file);
    res.status(201).json({
      status: "Success",
      message: SUCCESS_MESSAGE.FILE_UPLOADED,
      document,
    });
  }
);

export const getPaySlipsController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const documents = await getPaySlipDocuments();
    res.status(201).json({
      status: "Success",
      message: SUCCESS_MESSAGE.DOCUMENTS_FETCHED,
      documents,
    });
  }
);

export const deletePaySlipController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    await deletePaySlipDocument(id);
    res.json({ status: "Success", message: SUCCESS_MESSAGE.FILE_DELETED });
  }
);
