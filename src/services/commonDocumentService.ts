import s3Client, { config } from "../config/awsConfig";
import { IFile } from "../models/files/filesTypes";
import { ERROR_MESSAGES } from "../constants/errorMessages";
import { ErrorHandler } from "../utils/errorHandler";
import { Model } from "mongoose";
import { Upload } from "@aws-sdk/lib-storage";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { EducationDocument } from "../models/files/filesModel";

export const uploadDocument = async (
  file: Express.Multer.File,
  folder: string,
  FileModel: Model<IFile>
): Promise<IFile> => {
  if (!file.buffer) {
    throw new ErrorHandler(400, ERROR_MESSAGES.FILE_BUFFER);
  }

  const params = {
    Bucket: config.bucketName,
    Key: `${folder}/${Date.now()}_${file.originalname}`,
    Body: file.buffer,
  };

  const upload = new Upload({
    client: s3Client,
    params,
  });

  const data = await upload.done();

  const document = new FileModel({
    name: data.Key,
    url: data.Location,
  });

  await document.save();
  return document;
};

export const getDocuments = async (
  FileModel: Model<IFile>
): Promise<IFile[]> => {
  return await FileModel.find().exec();
};

export const deleteFileFromS3 = async (fileKey: string) => {
  const params = {
    Bucket: config.bucketName,
    Key: fileKey,
  };

  const command = new DeleteObjectCommand(params);
  await s3Client.send(command);
};

export const deleteFileFromDatabase = async (
  fileId: string,
  FileModel: Model<IFile>
) => {
  await FileModel.deleteOne({ _id: fileId }).exec();
};

export const deleteDocumentFile = async (
  fileId: string,
  FileModel: Model<IFile>
) => {
  const file = await FileModel.findById(fileId).exec();
  if (!file) {
    throw new ErrorHandler(404, ERROR_MESSAGES.FILE_NOT_FOUND);
  }

  const fileKey = file.name;
  await deleteFileFromS3(fileKey);
  await deleteFileFromDatabase(fileId, FileModel);
};

type DocumentType = typeof EducationDocument;

export const uploadFile = (folder: string, DocumentModel: DocumentType) => {
  return async (file: Express.Multer.File) => {
    return await uploadDocument(file, folder, DocumentModel);
  };
};
