import mongoose, { Schema } from "mongoose";

import { IMyData } from "./myDataTypes";
import { validateDropdownOption } from "../../validations/dropdownValidations";

const educationSchema = new Schema({
  level: {
    type: String,
    validate: {
      validator: async function (value: string) {
        return validateDropdownOption("EducationLevel", value);
      },
      message: "Invalid educational level",
    },
    //  required: [true, "Please enter your educational level"],
  },
  university: {
    type: String,
    //  required: [true, "Please enter your university"],
  },
  specialization: {
    type: String,
    //   required: [true, "Please enter your specialization field"],
  },
  startDate: {
    type: String,
    //  required: [true, "Please enter your start date"],
  },
  endDate: {
    type: String,
    //  required: [true, "Please enter your end date"],
  },
  percentage: {
    type: String,
    //  required: [true, "Please enter your percentage "],
  },
  educationalDocuments: {
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EducationDocument",
    },
    fileName: {
      type: String,
    },
    url: {
      type: String,
    },
  },
});
const certificationSchema = new Schema({
  certificationName: {
    type: String,
  },
  institute: {
    type: String,
  },
  certificationYear: {
    type: String,
  },
  certificationDocuments: {
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CertificationDocument",
    },
    fileName: {
      type: String,
    },
    url: {
      type: String,
    },
  },
});

const currentEmploymentSchema = new Schema({
  designation: {
    type: String,
    // required: [true, "Please enter your designation"],
  },
  employmentType: {
    type: String,
    validate: {
      validator: async function (value: string) {
        return validateDropdownOption("EmploymentType", value);
      },
      message: "Invalid employment type",
    },
    // required: [true, "Please enter your employment type"],
  },
  client: {
    type: String,
    validate: {
      validator: async function (value: string) {
        return validateDropdownOption("Client", value);
      },
      message: "Invalid client",
    },
    //  required: [true, "Please the Client value"],
  },
  tagging: {
    type: String,
    validate: {
      validator: async function (value: string) {
        return validateDropdownOption("Tagging", value);
      },
      message: "Invalid tagging",
    },
    //  required: [true, "Please enter the type of tagging"],
  },
  status: {
    type: String,
    validate: {
      validator: async function (value: string) {
        return validateDropdownOption("Status", value);
      },
      message: "Invalid Status",
    },
    //  required: [true, "Please enter the status"],
  },
  myProject: {
    type: String,
    validate: {
      validator: async function (value: string) {
        return validateDropdownOption("Project", value);
      },
      message: "Invalid project",
    },
    //  required: [true, "Please enter the project name"],
  },
  supervisor: {
    type: String,
    //  required: [true, "Please enter your supervisor name"],
  },
  startDate: {
    type: Date,
    // required: [true, "Please enter the start date"]
  },
  endDate: { type: Date, default: null },
  stream: {
    type: String,
    validate: {
      validator: async function (value: string) {
        return validateDropdownOption("Stream", value);
      },
      message: "Invalid stream",
    },
    //  required: [true, "Please enter the stream"],
  },
  bandLevel: {
    type: String,
    validate: {
      validator: async function (value: string) {
        return validateDropdownOption("BandLevel", value);
      },
      message: "Invalid band level",
    },
    //  required: [true, "Please enter band level"],
  },
  location: {
    type: String,
  },
  currentCtc: {
    type: Number,
    // required: [true, "Please enter current ctc"]
  },
  previousCtc: { type: Number },
  totalYearExperience: { type: Number },
  relevantYearExperience: { type: Number },
});
const previousEmploymentSchema = new Schema({
  designation: { type: String },
  companyName: { type: String },
  companyLocation: { type: String },
  startDate: { type: Date },
  endDate: { type: Date, default: null },
  ctcInLPA: { type: Number },

  offerLetter: {
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OfferLetterDocument",
    },
    fileName: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  relievingLetter: {
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RelievingLetterDocument",
    },
    fileName: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  paySlip: {
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PaySlipDocument",
    },
    fileName: {
      type: String,
    },
    url: {
      type: String,
    },
  },
});

const skillSetSchema = new Schema({
  basic: {
    type: [String],
    default: [],
  },
  intermediate: {
    type: [String],
    default: [],
  },
  expert: {
    type: [String],
    default: [],
  },
});

const trainingSchema = new Schema({
  trainingName: {
    type: String,
    validate: {
      validator: async function (value: string) {
        return validateDropdownOption("TrainingName", value);
      },
      message: "Invalid training name",
    },
  },
  trainingStatus: {
    type: String,
    validate: {
      validator: async function (value: string) {
        return validateDropdownOption("TrainingStatus", value);
      },
      message: "Invalid training status",
    },
  },
  completionDate: {
    type: String,
  },
});

const insuranceSchema = new Schema({
  underInsurance: {
    type: Boolean,
  },
  policyNumber: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  name: { type: String },
  gender: { type: String },
  dateOfBirth: { type: Date },
  cardNumber: { type: String },
});

const familySchema = new Schema({
  relation: { type: String },
  name: { type: String },
  gender: { type: String },
  dateOfBirth: { type: Date },
  cardNumber: { type: String },
});
const myDataSchema: Schema = new Schema(
  {
    profilePhoto: {
      profileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image",
      },
      url: {
        type: String,
      },
    },
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    gender: {
      type: String,
      validate: {
        validator: async function (value: string) {
          return validateDropdownOption("Gender", value);
        },
        message: "Invalid gender",
      },
      required: [true, "Please provide your gender"],
    },
    contactNumber: {
      type: Number,
      required: [true, "Please enter your contact number"],
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Please enter your date of birth"],
    },
    role: {
      type: String,
      validate: {
        validator: async function (value: string) {
          return validateDropdownOption("Role", value);
        },
        message: "Invalid role",
      },
    },

    email: {
      type: String,
      unique: true,
      required: [true, "Please enter your email"],
    },
    employeeId: {
      type: String,
      required: [true, "Please provide your employee ID"],
    },
    fatherName: {
      type: String,
      required: [true, "Please enter your father's name"],
    },
    motherName: {
      type: String,
      required: [true, "Please enter your mother's name"],
    },
    maritalStatus: {
      type: String,
      validate: {
        validator: async function (value: string) {
          return validateDropdownOption("MaritalStatus", value);
        },
        message: "Invalid marital status",
      },
    },
    spouse: {
      type: String,
      default: "No Spouse",
    },
    noOfChildren: {
      type: Number,
    },
    bloodGroup: {
      type: String,
      validate: {
        validator: async function (value: string) {
          return validateDropdownOption("BloodGroup", value);
        },
        message: "Invalid blood group",
      },
    },
    emergencyContactName: {
      type: String,
      required: [true, "Please enter an emergency contact name"],
    },
    emergencyContactNumber: {
      type: Number,
      required: [true, "Please enter an emergency contact number"],
    },
    nationality: {
      type: String,
      required: [true, "Please enter your nationality"],
    },
    aadhaarNo: {
      type: String,
      required: [true, "Please enter your Aadhaar number"],
      unique: true,
    },
    panCardNo: {
      type: String,
      required: [true, "Please enter your PAN card number"],
      unique: true,
    },
    passportNo: {
      type: String,
      unique: true,
    },

    currentAddress: {
      type: String,
      required: [true, "Please enter current Address"],
    },
    permanentAddress: {
      type: String,
      required: [true, "Please enter permanent Address"],
    },
    education: [educationSchema],
    certification: [certificationSchema],
    skillSet: skillSetSchema,

    isActive: {
      type: Boolean,
      default: true,
    },
    currentEmployment: [currentEmploymentSchema],
    previousEmployments: [previousEmploymentSchema],

    training: [trainingSchema],
    bankName: {
      type: String,
      required: [true, "Please enter the bank name"],
    },
    nameAsPerBank: {
      type: String,
      required: [true, "Please enter name as per bank"],
    },
    bankAccountNo: {
      type: String,
      required: [true, "Please enter the bank account number"],
    },
    branch: {
      type: String,
      required: [true, "Please enter the branch name "],
    },
    ifsc: {
      type: String,
      required: [true, "please enter the IFSC code"],
    },
    underEsi: {
      type: Boolean,
    },
    esiNumber: {
      type: String,
    },
    insurance: insuranceSchema,
    familyDetail: [familySchema],
    statutory: {
      underPf: {
        type: Boolean,
      },
      pfNumber: { type: String },
      uan: { type: String },
      pfJoining: {
        type: String,
      },
      documentType: {
        type: String,
        validate: {
          validator: async function (value: string) {
            return validateDropdownOption("DocumentType", value);
          },
          message: "Invalid DocumentType",
        },
      },
      existingEpfMember: {
        type: Boolean,
      },
      excessEpfContribution: {
        type: Boolean,
      },
      excessEpsContribution: {
        type: Boolean,
      },
    },
    underLwf: {
      type: Boolean,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

myDataSchema.index(
  { email: 1, aadhaarNo: 1, panCardNo: 1, passportNo: 1, employeeId: 1 },
  { unique: true }
);

export const MyData = mongoose.model<IMyData>("MyData", myDataSchema);
