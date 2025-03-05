import { Request, Response, NextFunction } from "express";
import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors";

import {
  fetchUsers as fetchUsersService,
  updateUser as updateUserService,
  deleteUser as deleteUserService,
  updateUserByEmployeeId,
} from "../../services/userServices";
import { SUCCESS_MESSAGE } from "../../constants/message";

export const fetchUsers = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const usersData = await fetchUsersService();
    res.status(200).json({
      success: true,
      message: SUCCESS_MESSAGE.FETCH_USER,
      data: usersData,
    });
  }
);

export const updateUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const updateData = req.body;
    const updatedUser = await updateUserService(userId, updateData);
    res.status(200).json({
      success: true,
      message: SUCCESS_MESSAGE.UPDATE_USER,
      data: updatedUser,
    });
  }
);

export const deleteUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const user = await deleteUserService(userId);
    res.status(200).json({
      success: true,
      message: SUCCESS_MESSAGE.DELETE_USER,
      data: user,
    });
  }
);

export const updateUserByEmployee = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const employeeId = req.params.employeeId;
    const updateData = req.body;
    const updatedUser = await updateUserByEmployeeId(employeeId, updateData);
    res.status(200).json({
      success: true,
      message: SUCCESS_MESSAGE.UPDATE_USER,
      data: updatedUser,
    });
  }
);
