const { S3Client} = require("@aws-sdk/client-s3");
import dotenv from "dotenv";

dotenv.config();

const Client = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_REGION as string,
});

const s3 = new S3Client;
export default s3;

export const config = {
  bucketName: process.env.S3_BUCKET_NAME as string,
};
