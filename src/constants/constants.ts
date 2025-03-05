export const USER_ROLES = [
  "HR",
  "Finance",
  "IT Support",
  "Employee",
  "Admin",
  "TAG",
  "Sales",
  "Marketing",
  "Senior Management",
];

export const MARITAL_STATUS = ["Single", "Married", "Divorced", "Widowed"];
export const EDUCATION_LEVEL = {
  PHD: "PhD",
  MASTERS: "Masters",
  BACHELORS: "Bachelors",
  HIGHER_SECONDARY: "Higher Secondary",
  DIPLOMA: "Diploma",
  SECONDARY: "Secondary",
} as const;

export type EducationLevel = keyof typeof EDUCATION_LEVEL;

export const File_FOLDER = "Files";
export const IMAGE_FOLDER = "Image";

export const GENDER = {
  MALE: "Male",
  FEMALE: "Female",
  OTHER: "Other",
} as const;
export type Gender = keyof typeof GENDER;

export const EMPLOYMENT_TYPE = {
  FULLTIME: "FullTime",
  CONTRACT: "Contract",
  PARTTIME: "PartTime",
  INTERNSHIP: "Internship",
  TEMPORARY: "Temporary",
  CONSULTANT: "Consultant",
} as const;
export type EmploymentType = keyof typeof EMPLOYMENT_TYPE;
export const TAGGING = {
  INVESTMENT: "Investment",
  BENCH: "Bench",
  NAD: "NAD",
  BILLABLE: "Billable",
  BUSINESS_SUPPORT: "Business Support",
  MANAGEMENT: "Management",
  DNB: "DNB",
} as const;
export type tagging = keyof typeof TAGGING;
export const STATUS = {
  ACTIVE: "Active",
  RESIGNED: "Resigned",
  BUFFER: "Buffer",
  INACTIVE: "InActive",
  ABSCONDED: "Absconded",
  NEWJOINEE: "NewJoinee",
  TERMINATED: "Terminated",
} as const;
export type status = keyof typeof STATUS;
export const CLIENT = {
  SONY: "Sony",
  PHILIPS: "Philips",
  FOSSIL: "Fossil",
  AMAZON: "Amazon",
  MEDIACORP: "MediaCorp",
  ANZ: "ANZ",
  SC: "3SC",
  INTERNAL: "Internal",
} as const;
export type client = keyof typeof CLIENT;
export const WORK_MODE = [
  "Work From Home",
  "Work From Office",
  "Hybrid",
  "Remote",
];
export const BAND_LEVEL = {
  A1: "A1",
  A2: "A2",
  A3: "A3",
  A4: "A4",
  A5: "A5",
  A6: "A6",
  B1: "B1",
  B2: "B2",
  B3: "B3",
  B4: "B4",
} as const;
export type bandLevel = keyof typeof BAND_LEVEL;

export const STREAM = {
  Delivery_career_stream: "Delivery career stream",
  Sales_Marketing_career_stream: "Sales & Marketing career stream",
  Business_Acceleration_career_stream: "Business Acceleration career stream",
} as const;

export type stream = keyof typeof STREAM;

export const TRAINING = ["Done", "InComplete", "InProgress"];
export const ROLE = {
  HR: "HR",
  Finance: "Finance",
  ITSupport: "IT Support",
  Employee: "Employee",
  Admin: "Admin",
  Tag: "TAG",
  Sales: "Sales",
  Marketing: "Marketing",
  SeniorManagement: "Senior Management",
  Manager: "manager",
};

export const EDUCATIONAL_FILE_FOLDER = "educational";
export const EMPLOYMENT_FILE_FOLDER = "employment";
export const CERTIFICATE_FILE_FOLDER = "certification";
