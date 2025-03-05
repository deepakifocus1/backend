import { config } from "../config/documentConfig";
import { Document } from "../models/issues/issuesModel";
import { IDocument } from "../models/issues/issuesTypes";
import s3Client from "../config/awsConfig";
import { DOCUMENT_FOLDER } from "../constants/issueConstants";
import { Upload } from "@aws-sdk/lib-storage";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { ERROR_MESSAGES } from "../constants/errorMessages";
import { ErrorHandler } from "../utils/errorHandler";

export const uploadDocument = async (
  file: Express.Multer.File
): Promise<IDocument> => {
  if (!file.buffer) {
    throw new Error("File buffer is undefined");
  }

  const params = {
    Bucket: config.aws.bucketName, 
    Key: `${DOCUMENT_FOLDER}/${Date.now()}_${file.originalname}`,
    Body: file.buffer,
  };


  const upload = new Upload({
    client: s3Client,
    params,
  });

  const data = await upload.done();

  const document = new Document({
    name: file.originalname,
    url: data.Location, 
  });

  await document.save();
  return document;
};

export const getDocuments = async (): Promise<IDocument[]> => {
  return await Document.find().exec();
};

export const deleteDocument = async (id: string): Promise<void> => {
  const document = await Document.findById(id).exec();

  if (!document) {
    throw new ErrorHandler(404, ERROR_MESSAGES.FILE_NOT_FOUND);
  }

  const params = {
    Bucket: config.aws.bucketName, 
    Key: document.url.split(".com/")[1],
  };

  const command = new DeleteObjectCommand(params);
  await s3Client.send(command);

  await Document.findByIdAndDelete(id).exec();
};
