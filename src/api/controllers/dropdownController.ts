import { Request, Response, NextFunction } from "express";
import { SUCCESS_MESSAGE } from "../../constants/message";
import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors";
import {
  createOrUpdateDropDown,
  fetchAllDropdowns,
  updateOption,
  deleteOption,
} from "../../services/dropdownService";
import mongoose from "mongoose";
import { UpdateDropdownBody } from "../../models/dropdown/dropdownTypes";
import { ErrorHandler } from "../../utils/errorHandler";
import { ERROR_MESSAGES } from "../../constants/errorMessages";

export const createDropdownController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const dropdownPayload = req.body;

    const dropdownData = await createOrUpdateDropDown(dropdownPayload);

    res.status(201).json({
      success: true,
      message: SUCCESS_MESSAGE.DROPDOWN_CREATED,
      data: dropdownData,
    });
  }
);

export const fetchAllDropdownsController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const [dropdowns, supervisors] = await fetchAllDropdowns();

    res.status(200).json({
      success: true,
      data: {
        dropdowns,
        supervisors,
      },
    });
  }
);

export const updateDropdownController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const dropdownId = req.params.id;
    const { optionId, newValue } = req.body as UpdateDropdownBody;

    if (
      !mongoose.Types.ObjectId.isValid(dropdownId) ||
      !mongoose.Types.ObjectId.isValid(optionId)
    )
      throw new ErrorHandler(400, ERROR_MESSAGES.INVALID_OPTION_ID);

    const updatedDropdown = await updateOption(
      new mongoose.Types.ObjectId(dropdownId),
      new mongoose.Types.ObjectId(optionId),
      newValue
    );

    if (!updatedDropdown)
      throw new ErrorHandler(404, ERROR_MESSAGES.OPTION_NOT_FOUND);

    res.status(200).json({
      success: true,
      message: "dropdown updated",
      data: updatedDropdown,
    });
  }
);

export const deleteDropdownOptionController = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const dropdownId = req.params.id;
    const { optionId } = req.body;

    if (
      !mongoose.Types.ObjectId.isValid(dropdownId) ||
      !mongoose.Types.ObjectId.isValid(optionId)
    )
      throw new ErrorHandler(400, ERROR_MESSAGES.INVALID_OPTION_ID);

    const updatedDropdown = await deleteOption(
      new mongoose.Types.ObjectId(dropdownId),
      new mongoose.Types.ObjectId(optionId as string)
    );

    if (!updatedDropdown)
      throw new ErrorHandler(404, ERROR_MESSAGES.OPTION_NOT_FOUND);

    res.status(200).json({
      success: true,
      message: SUCCESS_MESSAGE.DROPDOWN_DELETED,
      data: updatedDropdown,
    });
  }
);
