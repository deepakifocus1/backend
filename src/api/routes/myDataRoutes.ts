import express from "express";
import { isAuthenticatedUser } from "../../middlewares/isAuthenticatedUser";
import {
  createMyDataHandler,
  deleteMyDataHandler,
  fetchMyDataHandler,
  updateMyDataHandler,
  updateMyDataByEmployeeIdHandler,
  deleteMyDataByEmployeeIdHandler,
  fetchMyDataByIdHandler,
  fetchMyDataByEmployeeIdHandler,
} from "../controllers/myDataControllers";
import { validateRequest } from "../../middlewares/validationRequest";
import myDataSchema from "../../validations/myDataValidation";
import isAuthorizedUser from "../../middlewares/isAuthorizedUser";
import { ROLE } from "../../constants/constants";

const router = express.Router();

router.post(
  "/create",
  isAuthenticatedUser,
  validateRequest(myDataSchema),
  isAuthorizedUser(ROLE.HR),
  createMyDataHandler
);

router.put(
  "/update/:id",
  isAuthenticatedUser,
  validateRequest(myDataSchema),
  isAuthorizedUser(ROLE.HR),
  updateMyDataHandler
);

router.put(
  "/update-by-employee-id/:employeeId",
  isAuthenticatedUser,
  isAuthorizedUser(ROLE.HR, ROLE.Employee),
  updateMyDataByEmployeeIdHandler
);

router.get(
  "/get",
  isAuthenticatedUser,
  isAuthorizedUser(ROLE.HR, ROLE.SeniorManagement, ROLE.Manager),
  fetchMyDataHandler
);

router.get("/get-by-id/:id", isAuthenticatedUser, fetchMyDataByIdHandler);

router.get(
  "/get-by-employee-id/:employeeId",
  isAuthenticatedUser,
  fetchMyDataByEmployeeIdHandler
);

router.delete(
  "/delete/:id",
  isAuthenticatedUser,
  isAuthorizedUser(ROLE.HR),
  deleteMyDataHandler
);

router.delete(
  "/delete-by-employee-id/:employeeId",
  isAuthenticatedUser,
  isAuthorizedUser(ROLE.HR),
  deleteMyDataByEmployeeIdHandler
);

export default router;
