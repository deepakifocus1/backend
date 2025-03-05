import { Document, Types } from "mongoose";
import {
  EmploymentType,
  bandLevel,
  client,
  status,
  tagging,
  stream,
} from "../../constants/constants";

export interface IMyData extends Document {
  profilePhoto?: { profileId: Types.ObjectId; url: string };
  name: string;
  contactNumber: number;
  dateOfBirth: Date;
  gender: string;
  role: string;
  email: string;
  employeeId: string;
  fatherName: string;
  motherName: string;
  maritalStatus?: string;
  spouse?: string;
  noOfChildren?: number;
  bloodGroup?: string;
  emergencyContactName: string;
  emergencyContactNumber: number;
  nationality: string;
  aadhaarNo: string;
  panCardNo: string;
  passportNo?: string;
  currentAddress: string;
  permanentAddress: string;
  education: {
    level: string;
    university: string;
    specialization: string;
    startDate: string;
    endDate: string;
    percentage: string;
    educationalDocuments?: {
      documentId: Types.ObjectId;
      fileName: string;
      url: string;
    };
  }[];

  certification: {
    certificationName?: string;
    institute?: string;
    certificationYear?: string;
    certificationDocuments?: {
      documentId: Types.ObjectId;
      fileName: string;
      url: string;
    };
  };

  skillSet: {
    basic: string[];
    intermediate: string[];
    expert: string[];
  };

  isActive: boolean;
  currentEmployment: {
    designation: string;
    employmentType: EmploymentType;
    client: client;
    tagging: tagging;
    status: status;
    supervisor: string;
    myProject: string;
    startDate: Date;
    endDate: Date | null;
    stream: stream;
    bandLevel: bandLevel;
    location: string;
    currentCtc: number;
    previousCtc: number;
    totalYearExperience: number;
    relevantYearExperience: number;
  }[];
  previousEmployments?: {
    designation?: string;
    companyName?: string;
    companyLocation?: string;
    startDate: Date;
    endDate: Date | null;
    ctcInLPA?: number;

    offerLetter?: {
      documentId: Types.ObjectId;
      fileName: string;
      url: string;
    };
    relievingLetter?: {
      documentId: Types.ObjectId;
      fileName: string;
      url: string;
    };
    paySlip?: {
      documentId: Types.ObjectId;
      fileName: string;
      url: string;
    };
  }[];
  employmentDocuments?: {
    documentId: Types.ObjectId;
    fileName: string;
    url: string;
  };
  training?: {
    trainingName?: string;
    trainingStatus?: string;
    completionDate?: string;
  }[];

  bankName: string;
  nameAsPerBank: string;
  bankAccountNo: string;
  branch: string;
  ifsc: string;
  pfNumber?: string;
  uan?: string;
  underEsi?: boolean;
  esiNumber?: string;
  insurance?: {
    underInsurance?: boolean;
    policyNumber?: string;
    startDate?: Date;
    endDate?: Date;
    name?: string;
    gender?: string;
    dateOfBirth?: Date;
    cardNumber?: string;
  };
  familyDetail?: {
    relation?: string;
    name?: string;
    gender?: string;
    dateOfBirth?: Date;
    cardNumber?: string;
  }[];
  statutory?: {
    underPf?: boolean;
    pfNumber?: string;
    uan?: string;
    pfJoining?: string;
    documentType?: string;
    existingEpfMember?: boolean;
    excessEpfContribution?: boolean;
    excessEpsContribution?: boolean;
  };
  underLwf: boolean;
  isApproved?: boolean;
}
