import { Router } from "express";
import uploadFileMiddleware from "../../middlewares/fileUpload";

import {
  uploadEducationalDocumentController,
  getEducationalDocumentsController,
  deleteEducationalDocumentController,
} from "../controllers/educationControllers";
import {
  uploadOfferLetterController,
  getOfferLettersController,
  deleteOfferLetterController,
  uploadRelievingController,
  getRelievingController,
  deleteRelievingController,
  uploadPaySlipController,
  getPaySlipsController,
  deletePaySlipController,
} from "../controllers/employmentControllers";
import {
  uploadCertificateController,
  getCertificateController,
  deleteCertificateController,
} from "../controllers/certificateController";

import { isAuthenticatedUser } from "../../middlewares/isAuthenticatedUser";

const router = Router();

//education
router.post(
  "/educational-documents",
  isAuthenticatedUser,
  uploadFileMiddleware.single("file"),
  uploadEducationalDocumentController
);

router.get(
  "/educational-documents",
  isAuthenticatedUser,
  getEducationalDocumentsController
);

router.delete(
  "/educational-documents/:id",
  isAuthenticatedUser,
  deleteEducationalDocumentController
);

//certification
router.post(
  "/certification-documents",
  isAuthenticatedUser,
  uploadFileMiddleware.single("file"),
  uploadCertificateController
);

router.get(
  "/certification-documents",
  isAuthenticatedUser,
  getCertificateController
);

router.delete(
  "/certification-documents/:id",
  isAuthenticatedUser,
  deleteCertificateController
);

//offerLetter
router.post(
  "/offer-letters",
  isAuthenticatedUser,
  uploadFileMiddleware.single("file"),
  uploadOfferLetterController
);

router.get("/offer-letters", isAuthenticatedUser, getOfferLettersController);

router.delete(
  "/offer-letters/:id",
  isAuthenticatedUser,
  deleteOfferLetterController
);

//relieving
router.post(
  "/relieving-documents",
  isAuthenticatedUser,
  uploadFileMiddleware.single("file"),
  uploadRelievingController
);

router.get("/relieving-documents", isAuthenticatedUser, getRelievingController);

router.delete(
  "/relieving-documents/:id",
  isAuthenticatedUser,
  deleteRelievingController
);

//paySlip
router.post(
  "/payslip-documents",
  isAuthenticatedUser,
  uploadFileMiddleware.single("file"),
  uploadPaySlipController
);

router.get("/payslip-documents", isAuthenticatedUser, getPaySlipsController);

router.delete(
  "/payslip-documents/:id",
  isAuthenticatedUser,
  deletePaySlipController
);

export default router;
