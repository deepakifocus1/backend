export interface EnvConfig {
  port: number;
  mongoURI: string;
  cookieExpiry: string;
  jwtSecret: string;
  jwtShortExpiry: string;
  jwtLongExpiry: string;
  awsSmtpUser: string;
  awsSmtpPass: string;
  senderEmail: string;
}

export interface CookieOptions {
  httpOnly: boolean;
  sameSite: "strict" | "lax" | "none" | undefined;
  expires?: Date;
  secure: boolean;
}
