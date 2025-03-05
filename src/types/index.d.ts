import { EnvConfig, CookieOptions } from "./configTypes";
import { IUser } from "../models/user/userTypes";

export { IUser, EnvConfig, CookieOptions };
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
