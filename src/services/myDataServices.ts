import mongoose from "mongoose";
import { IMyData } from "../models/myData/myDataTypes";
import { MyData } from "../models/myData/myDataModel";
import { ErrorHandler } from "../utils/errorHandler";
import { ERROR_MESSAGES } from "../constants/errorMessages";
import { fetchUserByEmployeeId, updateUserByEmployeeId } from "./userServices";
import { updateEmailService } from "./emailService";
import { IUser } from "../types";

export async function checkUniqueIdentifiers(userData: IMyData) {
  const uniqueFields = [
    { email: userData?.email },
    { aadhaarNo: userData?.aadhaarNo },
    { panCardNo: userData?.panCardNo },
    { passportNo: userData?.passportNo },
    { employeeId: userData?.employeeId },
  ];

  for (const field of uniqueFields) {
    const [key, value] = Object.entries(field)[0];
    if (value) {
      const existingData = await MyData.findOne({ [key]: value }).exec();
      if (existingData) {
        throw new ErrorHandler(
          400,
          key.toLocaleLowerCase() + ERROR_MESSAGES.UNIQUE_IDENTIFIER
        );
      }
    }
  }
}
export const createMyData = async (
  myDataPayload: IMyData
): Promise<IMyData> => {
  await checkUniqueIdentifiers(myDataPayload);
  const newData = new MyData(myDataPayload);
  await newData.save();
  return newData;
};

export const updateMyData = async (
  myDataId: string,
  updateData: any
): Promise<IMyData | null> => {
  if (!mongoose.Types.ObjectId.isValid(myDataId)) {
    throw new ErrorHandler(400, ERROR_MESSAGES.INVALID_ID);
  }
  const updatedMyData = await MyData.findByIdAndUpdate(myDataId, updateData, {
    new: true,
    runValidators: true,
  }).exec();
  if (!updatedMyData) {
    throw new ErrorHandler(404, ERROR_MESSAGES.NOT_FOUND);
  }
  return updatedMyData;
};

export const deleteMyData = async (
  myDataId: string
): Promise<IMyData | null> => {
  if (!mongoose.Types.ObjectId.isValid(myDataId)) {
    throw new ErrorHandler(400, ERROR_MESSAGES.INVALID_ID);
  }

  const deletedMyData = await MyData.findByIdAndUpdate(
    myDataId,
    { isActive: false },
    { new: true }
  ).exec();

  if (!deletedMyData) {
    throw new ErrorHandler(404, ERROR_MESSAGES.NOT_FOUND);
  }

  return deletedMyData;
};

export const deleteMyDataByEmployeeId = async (
  employeeId: string
): Promise<IMyData | null> => {
  const deletedMyData = await MyData.findOneAndUpdate(
    { employeeId },
    { isActive: false },
    { new: true }
  ).exec();
  if (!deletedMyData) {
    throw new ErrorHandler(404, ERROR_MESSAGES.NOT_FOUND);
  }
  return deletedMyData;
};

export const fetchMyData = async (): Promise<{
  myDataList: IMyData[];
  taggingCounts: { [key: string]: number };
}> => {
  const result = await MyData.aggregate([
    {
      $facet: {
        myDataList: [{ $addFields: {} }],
        taggingCounts: [
          { $group: { _id: "$currentEmployment.tagging", count: { $sum: 1 } } },
          {
            $group: {
              _id: null,
              counts: { $push: { k: "$_id", v: "$count" } },
            },
          },
        ],
      },
    },
  ]).exec();

  const myDataList = result[0].myDataList;

  const formattedTaggingCountsArray = result[0].taggingCounts[0].counts;
  const taggingCounts = formattedTaggingCountsArray.reduce(
    (acc: { [key: string]: number }, item: { k: string[]; v: number }) => {
      const key = item.k[0];
      acc[key] = item.v;
      return acc;
    },
    {} as { [key: string]: number }
  );

  return { myDataList, taggingCounts };
};

export const fetchMyDataById = async (
  myDataId: string
): Promise<IMyData | null> => {
  if (!mongoose.Types.ObjectId.isValid(myDataId)) {
    throw new ErrorHandler(400, ERROR_MESSAGES.INVALID_ID);
  }

  const myDataInstance = await MyData.findOne({
    _id: myDataId,
  }).exec();

  if (!myDataInstance) {
    throw new ErrorHandler(404, ERROR_MESSAGES.NOT_FOUND);
  }

  return myDataInstance;
};

export const fetchMyDataByEmployeeId = async (
  employeeId: string
): Promise<IMyData | null> => {
  const myDataInstance = await MyData.findOne({
    employeeId,
  }).exec();
  if (!myDataInstance) {
    throw new ErrorHandler(404, ERROR_MESSAGES.NOT_FOUND);
  }
  return myDataInstance;
};

export const updateMyDataAndUserByEmployeeId = async (
  employeeId: string,
  updateData: any
): Promise<IMyData | null> => {
  await checkUniqueIdentifiers(updateData);
  const currentData = await fetchUserByEmployeeId(employeeId);

  if (!currentData) {
    throw new ErrorHandler(404, ERROR_MESSAGES.NOT_FOUND);
  }

  const fieldsToUpdate: (keyof IUser)[] = [
    "email",
    "name",
    "employeeId",
    "role",
  ];
  const hasChanges = fieldsToUpdate.some(
    (field) => updateData[field] !== currentData[field]
  );

  if (hasChanges) {
   const updatedFields: Partial<IUser> = fieldsToUpdate.reduce((acc, field) => {
    if (updateData[field] !== undefined) {
      (acc as any)[field] = updateData[field];
    }
    return acc;
  }, {} as Partial<IUser>);

    await updateUserByEmployeeId(employeeId, updatedFields);

    const {
      email: newEmail,
      name: newName,
      employeeId: newEmployeeId,
      role: newRole,
    } = updateData;
    const {
      email: currentEmail,
      name: currentName,
      employeeId: currentEmployeeId,
      role: currentRole,
    } = currentData;

    if (newEmail && newEmail !== currentEmail) {
      await updateEmailService(
        newName ?? currentName,
        newEmail ?? currentEmail,
        newEmployeeId ?? currentEmployeeId,
        newRole ?? currentRole
      );
    }
  }

  const updatedMyData = await MyData.findOneAndUpdate(
    { employeeId },
    updateData,
    {
      new: true,
      runValidators: true,
    }
  ).exec();

  if (!updatedMyData) {
    throw new ErrorHandler(404, ERROR_MESSAGES.NOT_FOUND);
  }

  return updatedMyData;
};
