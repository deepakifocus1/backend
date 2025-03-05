import { NextFunction, Request, Response } from "express";
import {
  sendConsent,
  fetchAndUpdateUsers,
  resendConsent
} from "../../services/consentService";
import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors";
import { SUCCESS_MESSAGE } from "../../constants/message";

export const sendConsentController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const consentPayload = req.body;

    const consentUser = await sendConsent({
      ...consentPayload,
      sentBy: req?.user?.name,
    });

    res.status(201).json({
      success: true,
      message: SUCCESS_MESSAGE.CONSENT_SENT,
      data: consentUser,
    });
  }
);

export const fetchConsentController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const fetchConsent = await fetchAndUpdateUsers();
    res.json({
      success: true,
      message: SUCCESS_MESSAGE.CONSENT_FETCHED,
      data: fetchConsent,
    });
  }
);


export const resendConsentController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const consentPayload = req.body;

    const consentMsg = await resendConsent({
      ...consentPayload,
    });
    res.status(200).json({
      success: true,
      message: consentMsg,
    });
  }
);

