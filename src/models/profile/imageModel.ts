import mongoose, { Schema } from "mongoose";
import { IImage } from "./imageTypes";

const ImageSchema: Schema = new Schema({
  url: { type: String, required: true },
  fileName: { type: String, required: true },
});

export const Image = mongoose.model<IImage>("Image", ImageSchema);
