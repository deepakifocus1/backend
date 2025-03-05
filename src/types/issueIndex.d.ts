import { EnvConfig, CookieOptions } from "./configTypes";
import {  IIssue, Status, Priority } from "../models/issues/issuesTypes";

export { IIssue , Status , Priority , EnvConfig , CookieOptions };
declare global {
  namespace Express {
    interface Request {
      issue?: IIssue;
    }
  }
}
export interface UpdateIssuePayload {
  status?: string;
  comment: string;
}

export interface FilterParams {
  duration?: string;
}