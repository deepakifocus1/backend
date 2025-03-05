import mongoose from "mongoose";
import { IFile } from "./filesTypes";

const documentSchema = new mongoose.Schema<IFile>({
  name: { type: String, required: true },
  url: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const EducationDocument = mongoose.model<IFile>(
  "EducationDocument",
  documentSchema
);

export const CertificationDocument = mongoose.model<IFile>(
  "CertificationDocument",
  documentSchema
);

export const OfferLetterDocument = mongoose.model<IFile>(
  "OfferLetterDocument",
  documentSchema
);

export const RelievingLetterDocument = mongoose.model<IFile>(
  "RelievingLetterDocument",
  documentSchema
);

export const PaySlipDocument = mongoose.model<IFile>(
  "PaySlipDocument",
  documentSchema
);
