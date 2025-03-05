import Consent from "../models/emailConsent/consentModel";
import {
  IConsent,
  ApiResponse,
  IUser,
} from "../models/emailConsent/consentTypes";
import axios from "axios";
import { calculateAge } from "../utils/helperMethods";
import { ErrorHandler } from "../utils/errorHandler";
import { ERROR_MESSAGES } from "../constants/errorMessages";
import { User } from "../models/user/userModel";

export const sendConsent = async (consentPayload: IConsent) => {
  try {
    const userAge = calculateAge(consentPayload.userAge.toString());
    const apiPayload = {
      userEmail: consentPayload.userEmail,
      userName: consentPayload.userName,
      productName: consentPayload.productName || "Drishti",
      userAge: userAge || 21,
      parentEmail: consentPayload.parentEmail || null,
      fromAddress:
        consentPayload.fromAddress || "internal.apps@ifocussystec.in",
    };

    const response = await axios.post(
      "https://notification.wiztap.in/emailconsent/sendConsentEmail",
      apiPayload
    );
    if (response.status !== 200)
      throw new ErrorHandler(500, ERROR_MESSAGES.CONSENT_NOT_SENT);

    const consentInstance = new Consent({
      ...apiPayload,
      DOB: consentPayload.userAge,
      sentBy: consentPayload.sentBy ?? "HR",
    });
    await consentInstance.save();

    return consentInstance;
  } catch (error: any) {
    throw new ErrorHandler(500, ERROR_MESSAGES.CONSENT_NOT_SENT);
  }
};

export const fetchAndUpdateUsers = async (): Promise<IUser[]> => {
  try {
    const existingEmails: string[] = await Consent.distinct("userEmail").exec();

    const { data: apiResponse }: { data: ApiResponse } =
      await axios.get<ApiResponse>(
        "https://notification.wiztap.in/emailconsent/getAll"
      );

    const apiEmails = Object.values(apiResponse).map((user) => user.userEmail);

    const filteredUsers = Object.values(apiResponse).filter((user) =>
      existingEmails.includes(user.userEmail)
    );

    const updatePromises = filteredUsers.map(async (user) => {
      await Consent.updateOne(
        { userEmail: user.userEmail },
        { $set: { ...user, consentRejected: false } },
        { upsert: true }
      ).exec();
    });

    const rejectedEmails = existingEmails.filter(
      (email) => !apiEmails.includes(email)
    );

    const rejectPromises = rejectedEmails.map(async (email) => {
      await Consent.updateOne(
        { userEmail: email },
        { $set: { consentRejected: true, consentGiven: false } }
      ).exec();
    });

    const userEmails = await User.distinct("email").exec();

    const deletePromises = userEmails.map(async (email) => {
      await Consent.deleteOne({ userEmail: email }).exec();
    });

    await Promise.all([
      ...updatePromises,
      ...rejectPromises,
      ...deletePromises,
    ]);

    const updatedUsers = await Consent.find({
      userEmail: { $in: [...apiEmails, ...rejectedEmails] },
    }).exec();

    return updatedUsers;
  } catch (error) {
    throw new ErrorHandler(500, ERROR_MESSAGES.CONSENT_NOT_FETCHED);
  }
};

export const resendConsent = async (consentPayload: IConsent) => {
  try {
    const userAge = calculateAge(consentPayload.userAge.toString());
    const apiPayload = {
      userEmail: consentPayload.userEmail,
      userName: consentPayload.userName,
      productName: consentPayload.productName || "Drishti",
      userAge: userAge || 21,
      parentEmail: consentPayload.parentEmail || null,
      fromAddress:
        consentPayload.fromAddress || "internal.apps@ifocussystec.in",
    };

    const response = await axios.post(
      "https://notification.wiztap.in/emailconsent/sendConsentEmail",
      apiPayload
    );
    if (response.status !== 200)
      throw new ErrorHandler(500, ERROR_MESSAGES.CONSENT_NOT_SENT);
    return "consent resent";
  } catch (error) {
    throw new ErrorHandler(500, ERROR_MESSAGES.CONSENT_NOT_SENT);
  }
};
