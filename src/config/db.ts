import mongoose from "mongoose";
import envConfig from "./env";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(envConfig.mongoURI);
    console.log("MongoDB connected successfully.");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

export default connectDB;
