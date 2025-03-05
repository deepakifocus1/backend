import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors";
import {
  createMyData,
  fetchMyData,
  updateMyData,
  deleteMyData,
  deleteMyDataByEmployeeId,
  fetchMyDataById,
  fetchMyDataByEmployeeId,
  updateMyDataAndUserByEmployeeId,
} from "../../services/myDataServices";
import { ERROR_MESSAGES } from "../../constants/errorMessages";
import { SUCCESS_MESSAGE } from "../../constants/message";
import { emailService } from "../../services/emailService";

export const createMyDataHandler = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const myData = req.body;
    const { email, name, employeeId, role } = req.body;
    const newMyData = await createMyData(myData);

    if (!newMyData) {
      res
        .status(500)
        .json({ success: false, message: ERROR_MESSAGES.SERVER_ERROR });
    }
    const credential = await emailService(name, email, employeeId, role);

    if (!credential) {
      res.status(400).json({
        status: "error",
        message: ERROR_MESSAGES.EMAIL_ERROR,
      });
    }
    res.status(201).json({
      success: true,
      message: SUCCESS_MESSAGE.CREATE_DATA,
      data: newMyData,
    });
  }
);

export const fetchMyDataHandler = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { myDataList, taggingCounts } = await fetchMyData();
    res.status(200).json({
      success: true,
      message: SUCCESS_MESSAGE.FETCH_DATA,
      data: myDataList,
      taggingCounts,
    });
  }
);

export const updateMyDataHandler = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const myDataId = req.params.id;
    const updateData = req.body;
    const updatedMyData = await updateMyData(myDataId, updateData);
    res.status(200).json({
      success: true,
      message: SUCCESS_MESSAGE.UPDATE_DATA,
      data: updatedMyData,
    });
  }
);

export const fetchMyDataByEmployeeIdHandler = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const employeeId = req.params.employeeId;
    const myDataInstance = await fetchMyDataByEmployeeId(employeeId);
    res.status(200).json({
      success: true,
      message: SUCCESS_MESSAGE.FETCH_DATA,
      data: myDataInstance,
    });
  }
);

export const fetchMyDataByIdHandler = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const myDataID = req.params.id;
    const myDataInstance = await fetchMyDataById(myDataID);
    res.status(200).json({
      success: true,
      message: SUCCESS_MESSAGE.FETCH_DATA,
      data: myDataInstance,
    });
  }
);

export const deleteMyDataHandler = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const myDataId = req.params.id;
    const myData = await deleteMyData(myDataId);
    res.status(200).json({
      success: true,
      message: SUCCESS_MESSAGE.DELETE_DATA,
      data: myData,
    });
  }
);

export const deleteMyDataByEmployeeIdHandler = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const employeeId = req.params.employeeId;
    const myData = await deleteMyDataByEmployeeId(employeeId);
    res.status(200).json({
      success: true,
      message: SUCCESS_MESSAGE.DELETE_DATA,
      data: myData,
    });
  }
);

export const updateMyDataByEmployeeIdHandler = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const employeeId = req.params.employeeId;
    const updateData = req.body;

    const updatedMyData = await updateMyDataAndUserByEmployeeId(
      employeeId,
      updateData
    );

    res.status(200).json({
      success: true,
      message: SUCCESS_MESSAGE.UPDATE_DATA,
      data: updatedMyData,
    });
  }
);
