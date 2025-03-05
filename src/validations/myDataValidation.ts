import Joi from "joi";
const educationSchema = Joi.object({
  level: Joi.string().required(),
  university: Joi.string().required(),
  specialization: Joi.string().required(),
  startDate: Joi.string().required(),
  endDate: Joi.string().required(),
  percentage: Joi.string().required(),
  educationalDocuments: Joi.object({
    documentId: Joi.string(),
    fileName: Joi.string(),
    url: Joi.string(),
  }).optional(),
});

const certificationSchema = Joi.object({
  certificationName: Joi.string().optional().allow(""),
  institute: Joi.string().optional().allow(""),
  certificationYear: Joi.string().required(),
  certificationDocuments: Joi.object({
    documentId: Joi.string(),
    fileName: Joi.string(),
    url: Joi.string(),
  }).optional(),
});

const skillSetSchema = Joi.object({
  basic: Joi.array().items(Joi.string()).optional().allow(""),
  intermediate: Joi.array().items(Joi.string()).optional().allow(""),
  expert: Joi.array().items(Joi.string()).optional().allow(""),
});

const currentEmploymentSchema = Joi.object({
  designation: Joi.string().required(),
  employmentType: Joi.string().required(),
  client: Joi.string().required(),
  tagging: Joi.string().required(),
  status: Joi.string().required(),
  supervisor: Joi.string().required(),
  myProject: Joi.string().required(),
  startDate: Joi.date().iso().required(),
  endDate: Joi.date().iso().optional().allow(null),
  stream: Joi.string().required(),
  bandLevel: Joi.string().required(),
  location: Joi.string(),
  currentCtc: Joi.number().optional().allow(null),
  previousCtc: Joi.number().optional().allow(null),
  totalYearExperience: Joi.number().optional().allow(null),
  relevantYearExperience: Joi.number().optional().allow(null),
});

const previousEmploymentSchema = Joi.object({
  designation: Joi.string().optional().allow(""),
  companyName: Joi.string().optional().allow(""),
  companyLocation: Joi.string().optional().allow(""),
  startDate: Joi.date().iso().required(),
  endDate: Joi.date().iso().optional().allow(null),
  ctcInLPA: Joi.number().optional().allow(""),
  offerLetter: Joi.object({
    documentId: Joi.string(),
    fileName: Joi.string(),
    url: Joi.string(),
  }).optional(),
  relievingLetter: Joi.object({
    documentId: Joi.string(),
    fileName: Joi.string(),
    url: Joi.string(),
  }).optional(),
  paySlip: Joi.object({
    documentId: Joi.string(),
    fileName: Joi.string(),
    url: Joi.string(),
  }).optional(),
}).optional();

const myDataValidationSchema = Joi.object({
  profilePhoto: Joi.object({ profileId: Joi.string(), url: Joi.string() }),
  name: Joi.string().required(),
  contactNumber: Joi.number().required(),
  dateOfBirth: Joi.date().iso().required(),
  gender: Joi.string().required(),
  email: Joi.string().email().required(),
  role: Joi.string().required(),
  employeeId: Joi.string().required(),
  fatherName: Joi.string().required(),
  motherName: Joi.string().required(),
  maritalStatus: Joi.string().required(),
  spouse: Joi.string().optional().allow(""),
  noOfChildren: Joi.number().optional().allow(""),
  bloodGroup: Joi.string().optional().allow(""),
  emergencyContactName: Joi.string().required(),
  emergencyContactNumber: Joi.number().required(),
  nationality: Joi.string().required(),
  aadhaarNo: Joi.string().required(),
  panCardNo: Joi.string().required(),
  passportNo: Joi.string().optional().allow(""),
  currentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  education: Joi.array().items(educationSchema).optional().allow(""),
  certification: Joi.array().items(certificationSchema).optional().allow(""),
  skillSet: skillSetSchema.optional().allow(null),
  employmentDocuments: Joi.object({
    documentId: Joi.string(),
    url: Joi.string(),
  }),
  isActive: Joi.boolean().optional().allow(""),
  currentEmployment: Joi.array()
    .items(currentEmploymentSchema)
    .optional()
    .allow(""),
  previousEmployments: Joi.array()
    .items(previousEmploymentSchema)
    .optional()
    .allow(""),
  training: Joi.array()
    .items(
      Joi.object({
        trainingName: Joi.string().optional().allow(""),
        trainingStatus: Joi.string().optional().allow(""),
        completionDate: Joi.string().optional().allow(""),
      })
    )
    .optional(),
  bankName: Joi.string().required(),
  nameAsPerBank: Joi.string().required(),
  bankAccountNo: Joi.string().required(),
  branch: Joi.string().required(),
  ifsc: Joi.string().required(),
  underEsi: Joi.boolean().optional(),
  esiNumber: Joi.string().optional().allow(""),
  isApproved: Joi.boolean().optional(),
  underLwf: Joi.boolean().optional(),
  insurance: Joi.object({
    underInsurance: Joi.boolean().optional(),
    policyNumber: Joi.string().optional().allow(""),
    startDate: Joi.date().optional(),
    endDate: Joi.date().optional(),
    name: Joi.string().optional().allow(""),
    gender: Joi.string().optional().allow(""),
    dateOfBirth: Joi.date().optional(),
    cardNumber: Joi.string().optional().allow(""),
  }).optional(),

  familyDetail: Joi.array()
    .items(
      Joi.object({
        relation: Joi.string().optional().allow(""),
        name: Joi.string().optional().allow(""),
        gender: Joi.string().optional().allow(""),
        dateOfBirth: Joi.date().optional(),
        cardNumber: Joi.string().optional().allow(""),
      })
    )
    .optional(),
  statutory: Joi.object({
    underPf: Joi.boolean().optional(),
    pfNumber: Joi.string().optional().allow(""),
    uan: Joi.string().optional().allow(""),
    pfJoining: Joi.string().optional().allow(""),
    documentType: Joi.string().optional().allow(""),
    existingEpfMember: Joi.boolean().optional(),
    excessEpfContribution: Joi.boolean().optional(),
    excessEpsContribution: Joi.boolean().optional(),
  }).optional(),
});

export default myDataValidationSchema;
