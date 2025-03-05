import {
  EducationDocument,
  CertificationDocument,
  OfferLetterDocument,
  RelievingLetterDocument,
  PaySlipDocument,
} from "../models/files/filesModel";

import { getDocuments, deleteDocumentFile } from "./commonDocumentService";
import {
  EDUCATIONAL_FILE_FOLDER,
  EMPLOYMENT_FILE_FOLDER,
  CERTIFICATE_FILE_FOLDER,
} from "../constants/constants";
import { uploadFile } from "./commonDocumentService";

//education
export const uploadEducationalDocument = uploadFile(
  EDUCATIONAL_FILE_FOLDER,
  EducationDocument
);
export const getEducationalDocuments = async () => {
  return await getDocuments(EducationDocument);
};
export const deleteEducationalDocument = async (fileId: string) => {
  return await deleteDocumentFile(fileId, EducationDocument);
};

// Certification
export const uploadCertificate = uploadFile(
  CERTIFICATE_FILE_FOLDER,
  CertificationDocument
);
export const getCertificateDocument = async () => {
  return await getDocuments(CertificationDocument);
};
export const deleteCertificateDocument = async (fileId: string) => {
  return await deleteDocumentFile(fileId, CertificationDocument);
};

//offerLetter
export const uploadOfferLetterDocument = uploadFile(
  EMPLOYMENT_FILE_FOLDER,
  OfferLetterDocument
);
export const getOfferLetterDocuments = async () => {
  return await getDocuments(OfferLetterDocument);
};
export const deleteOfferLetterDocument = async (fileId: string) => {
  return await deleteDocumentFile(fileId, OfferLetterDocument);
};

//relieving letter
export const uploadRelievingDocument = uploadFile(
  EMPLOYMENT_FILE_FOLDER,
  RelievingLetterDocument
);
export const getRelievingDocuments = async () => {
  return await getDocuments(RelievingLetterDocument);
};
export const deleteRelievingDocument = async (fileId: string) => {
  return await deleteDocumentFile(fileId, RelievingLetterDocument);
};

//paySlip
export const uploadPaySlipDocument = uploadFile(
  EMPLOYMENT_FILE_FOLDER,
  PaySlipDocument
);
export const getPaySlipDocuments = async () => {
  return await getDocuments(PaySlipDocument);
};
export const deletePaySlipDocument = async (fileId: string) => {
  return await deleteDocumentFile(fileId, PaySlipDocument);
};
