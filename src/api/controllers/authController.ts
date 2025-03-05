import { Request, Response, NextFunction } from "express";
import {
  registerUser as registerUserService,
  loginUser as loginUserService,
  updatePassword as updatePasswordService,
  forgotPassword as forgotPasswordService,
} from "../../services/authServices";
import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors";
import sendToken from "../../utils/token";
import { SUCCESS_MESSAGE } from "../../constants/message";

export const registerUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const userPayload = req.body;
    const userInstance = await registerUserService(userPayload);
    sendToken(userInstance, 201, SUCCESS_MESSAGE.REGISTER_USER, res, false);
  }
);

export const loginUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, rememberMe } = req.body;
    const userInstance = await loginUserService(email, password);
    sendToken(
      userInstance,
      200,
      SUCCESS_MESSAGE.LOGIN_USER_CONTROLLER,
      res,
      rememberMe
    );
  }
);

export const logoutUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({
      status: "Success",
      message: SUCCESS_MESSAGE.LOGOUT_USER,
    });
  }
);

export const updatePassword = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { oldPassword, newPassword } = req.body;
    if (req.user) {
      const userId = req.user._id;
      const userInstance = await updatePasswordService(
        userId,
        oldPassword,
        newPassword
      );
      res.status(200).json({
        success: true,
        message: SUCCESS_MESSAGE.UPDATE_PASSWORD,
        data: userInstance,
      });
    }
  }
);

export const forgotPassword = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;
      const message = await forgotPasswordService(email);
      res.status(200).json({
        status: "Success",
        message: SUCCESS_MESSAGE.RESET_PASSWORD_SENT,
      });
    } catch (error: any) {
      res.status(404).json({
        status: "error",
        message: error.message,
      });
    }
  }
);
