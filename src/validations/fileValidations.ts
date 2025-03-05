import Joi from "joi";

export const fileUploadSchema = Joi.object({
  file: Joi.object().required(),
});
