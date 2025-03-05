import dotenv from "dotenv";

dotenv.config();

export const config = {

  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    bucketName: process.env.S3_BUCKET_NAME as string,
    region: process.env.AWS_REGION as string,
  },
};