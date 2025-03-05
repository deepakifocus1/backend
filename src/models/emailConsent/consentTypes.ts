import mongoose from "mongoose";

export interface IConsent extends mongoose.Document {
  userEmail: string;
  userName: string;
  userAge: number;
  DOB: Date;
  productName: string;
  parentEmail: string;
  fromAddress: string;
  sentBy: string;
  consentSent: boolean;
  consentSentDate: Date;
  consentGiven: boolean;
  consentExpiryDate: Date;
  consentRejected: boolean;
}

export interface IUser {
  userEmail: string;
}

export interface ApiResponse {
  [key: string]: IUser;
}
