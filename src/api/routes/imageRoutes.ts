import { Router } from "express";
import { uploadImageMiddleware } from "../../middlewares/imageUpload";
import {
  uploadImage,
  getImages,
  deleteImage,
} from "../controllers/imageController";
import { isAuthenticatedUser } from "../../middlewares/isAuthenticatedUser";

const router = Router();

router.post("/upload", isAuthenticatedUser, uploadImageMiddleware, uploadImage);
router.get("/images", isAuthenticatedUser, getImages);
router.delete("/:imageId", isAuthenticatedUser, deleteImage);

export default router;
