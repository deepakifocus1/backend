import Joi from "joi";

export const imageValidationSchema = Joi.object({
  url: Joi.string().uri().required(),
  fileName: Joi.string().required(),
});
