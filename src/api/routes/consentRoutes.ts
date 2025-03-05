import express from "express";
import {
  fetchConsentController,
  sendConsentController,
  resendConsentController
} from "../controllers/consentController";
import { isAuthenticatedUser } from "../../middlewares/isAuthenticatedUser";

const router = express.Router();

router.post("/send-consent", isAuthenticatedUser, sendConsentController);
router.get("/fetch-consent", isAuthenticatedUser, fetchConsentController);
router.post("/resend-consent", isAuthenticatedUser, resendConsentController);

export default router;
