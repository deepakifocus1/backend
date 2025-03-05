import s3Client, { config } from "../config/awsConfig";
import { IMAGE_FOLDER } from "../constants/constants";
import { v4 as uuidv4 } from "uuid";
import { Image } from "../models/profile/imageModel";
import { ErrorHandler } from "../utils/errorHandler";
import { ERROR_MESSAGES } from "../constants/errorMessages";
import { Upload } from "@aws-sdk/lib-storage";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

export const uploadImageToS3 = async (
  file: Express.Multer.File
): Promise<[string, string]> => {
  const params = {
    Bucket: config.bucketName,
    Key: `${IMAGE_FOLDER}/${uuidv4()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  const upload = new Upload({
    client: s3Client,
    params,
  });

  const data = await upload.done();

  return [data.Location || "", params.Key || ""];
};

export const saveImageUrlToDatabase = async (url: string, fileName: string) => {
  const newImage = new Image({ url, fileName });
  await newImage.save();
  return newImage;
};

export const getImagesFromDataBase = async () => {
  return await Image.find().exec();
};

export const deleteImageFromS3 = async (imageKey: string): Promise<void> => {
  const params = {
    Bucket: config.bucketName,
    Key: imageKey,
  };

  const command = new DeleteObjectCommand(params);
  await s3Client.send(command);
};

export const deleteImageFromDatabase = async (
  imageId: string
): Promise<void> => {
  await Image.deleteOne({ _id: imageId }).exec();
};

export const deleteProfileImage = async (imageId: string): Promise<void> => {
  const image = await Image.findById(imageId).exec();
  if (!image) {
    throw new ErrorHandler(404, ERROR_MESSAGES.IMAGE_NOT_FOUND);
  }

  const imageKey = image.fileName;
  await deleteImageFromS3(imageKey);
  await deleteImageFromDatabase(imageId);
};
