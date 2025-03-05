import express from "express";
import {
  loginUser,
  registerUser,
  updatePassword,
  logoutUser,
  forgotPassword,
} from "../controllers/authController";
import {
  fetchUsers,
  updateUser,
  deleteUser,
  updateUserByEmployee,
} from "../controllers/userControllers";

import { isAuthenticatedUser } from "../../middlewares/isAuthenticatedUser";
import { validateRequest } from "../../middlewares/validationRequest";
import loginSchema from "../../validations/loginValidation";
import {
  userSchema,
  forgetPasswordSchema,
  updatePasswordSchema,
} from "../../validations/userValidations";

const router = express.Router();

router.post("/register", validateRequest(userSchema), registerUser);
router.post("/login", validateRequest(loginSchema), loginUser);
router.post("/logout", logoutUser);
router.put(
  "/update-password",
  isAuthenticatedUser,
  validateRequest(updatePasswordSchema),
  updatePassword
);
router.post(
  "/forgot-password",
  validateRequest(forgetPasswordSchema),
  forgotPassword
);

router.get("/get", isAuthenticatedUser, fetchUsers);
router.put("/update/:id", isAuthenticatedUser, updateUser);
router.put("/:employeeId", isAuthenticatedUser, updateUserByEmployee);
router.delete("/delete/:id", isAuthenticatedUser, deleteUser);
export default router;
