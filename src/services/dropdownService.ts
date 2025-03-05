import { IDropdown } from "../models/dropdown/dropdownTypes";
import Dropdown from "../models/dropdown/dropdownModel";
import { ErrorHandler } from "../utils/errorHandler";
import { ERROR_MESSAGES } from "../constants/errorMessages";
import mongoose from "mongoose";
import { MyData } from "../models/myData/myDataModel";

export const createOrUpdateDropDown = async (
  dropdownPayload: IDropdown
): Promise<IDropdown> => {
  const { type, options } = dropdownPayload;

  let dropdown = await Dropdown.findOne({ type }).exec();

  if (dropdown) {
    const existingValues = new Set(
      dropdown.options.map((option) => option.value)
    );

    const hasDuplicates = options.some((option) =>
      existingValues.has(option.value)
    );

    if (hasDuplicates) {
      throw new ErrorHandler(400, ERROR_MESSAGES.OPTION_EXIST);
    }

    dropdown.options.push(...options);
  }

  if (!dropdown) {
    dropdown = new Dropdown({ type, options });
  }

  await dropdown.save();
  return dropdown;
};

export const fetchAllDropdowns = async (): Promise<[IDropdown[], string[]]> => {
  const dropdowns = await Dropdown.find().exec();
  const supervisorsList = await MyData.aggregate([
    { $unwind: "$currentEmployment" },
    { $match: { "currentEmployment.supervisor": { $exists: true, $ne: "" } } },
    { $group: { _id: "$currentEmployment.supervisor" } },
    { $sort: { _id: 1 } },
    { $project: { _id: 0, supervisor: "$_id" } },
  ]).exec();
  const supervisors = supervisorsList.map((s) => s.supervisor);

  return [dropdowns, supervisors];
};

export const updateOption = async (
  dropdownId: mongoose.Types.ObjectId,
  optionId: mongoose.Types.ObjectId,
  newValue: string
): Promise<IDropdown | null> => {
  const dropdown = await Dropdown.findById(dropdownId).exec();
  if (!dropdown) {
    throw new ErrorHandler(400, ERROR_MESSAGES.INVALID_OPTION_ID);
  }

  const existingValues = new Set(
    dropdown.options
      .filter((option) => !option._id.equals(optionId))
      .map((option) => option.value)
  );

  if (existingValues.has(newValue)) {
    throw new ErrorHandler(400, ERROR_MESSAGES.OPTION_EXIST);
  }

  const result = await Dropdown.findOneAndUpdate(
    { _id: dropdownId, "options._id": optionId },
    { $set: { "options.$.value": newValue } },
    { new: true }
  ).exec();

  if (!result) {
    throw new ErrorHandler(404, ERROR_MESSAGES.OPTION_NOT_FOUND);
  }

  return result;
};

export const deleteOption = async (
  dropdownId: mongoose.Types.ObjectId,
  optionId: mongoose.Types.ObjectId
): Promise<IDropdown | null> => {
  const result = await Dropdown.findOneAndUpdate(
    { _id: dropdownId },
    { $pull: { options: { _id: optionId } } },
    { new: true }
  ).exec();

  if (!result) {
    throw new ErrorHandler(404, ERROR_MESSAGES.OPTION_NOT_FOUND);
  }

  return result;
};
