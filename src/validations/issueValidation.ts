import Joi from "joi";
import { Status } from "../models/issues/issuesTypes";

const allowedInitialStatuses = [Status.Open, Status.Closed];
const allowedCommentStatuses = [Status.Pending, Status.Decline, Status.InProgress, Status.Completed];

const issueSchema = Joi.object({
  subject: Joi.string().required().messages({
    'any.required': 'Subject is required',
    'string.empty': 'Subject cannot be empty'
  }),
  issueDescription: Joi.string().required().messages({
    'any.required': 'Issue description is required',
    'string.empty': 'Issue description cannot be empty'
  }),
  priority: Joi.string(),
  status: Joi.string(),
  assignedTo: Joi.object({
    department: Joi.string().required().messages({
      'any.required': 'Department is required'
    })
  }).required().messages({
    'any.required': 'AssignedTo is required'
  })
});


const addCommentSchema = Joi.object({
  comment: Joi.string().required().messages({
    "string.empty": "Comment cannot be empty",
    "any.required": "Comment is required",
  }),
});

const commentAndStatusSchema = Joi.object({
  comment: Joi.string().optional().messages({
    "string.empty": "Comment cannot be empty",
  }),
  status: Joi.string().valid(...allowedCommentStatuses).required().messages({
    "any.required": "Status is required",
    "string.empty": "Status cannot be empty",
  }),
});

const reassignSchema = Joi.object({
  department: Joi.string().required().messages({
    'any.required': 'Department is required',
    'string.empty': 'Department cannot be empty'
  }),
});

export const documentUploadSchema = Joi.object({
  files: Joi.array().items(Joi.object().optional()).required(),
});

export { issueSchema, reassignSchema, addCommentSchema, commentAndStatusSchema };