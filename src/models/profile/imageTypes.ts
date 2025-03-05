import { Document } from "mongoose";

export interface IImage extends Document {
  url: string;
  fileName: string;
}
