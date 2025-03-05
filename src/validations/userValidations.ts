import Joi from "joi";

export const userSchema = Joi.object({
  name: Joi.string().required(),
  role: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8),
  employeeId: Joi.string(),
  projects: Joi.array().optional(),
});

export const forgetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const updatePasswordSchema = Joi.object({
  oldPassword: Joi.string().min(8).required(),
  newPassword: Joi.string().min(8).required(),
});
