import { Request, Response, NextFunction } from 'express';
import { issueSchema , commentAndStatusSchema , reassignSchema, addCommentSchema} from "../validations/issueValidation";
export const validateIssue = (req: Request, res: Response, next: NextFunction) => {
  const { error } = issueSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export const validateCommentAndStatus = (req: Request, res: Response, next: NextFunction) => {
  const { error } = commentAndStatusSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};


export const validateComments = (req: Request, res: Response, next: NextFunction) => {
  const { error } = addCommentSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export const validateReassignment = (req: Request, res: Response, next: NextFunction) => {
  const { error } = reassignSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
