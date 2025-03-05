import Joi from "joi";
const consentSchema = Joi.object({
  userEmail: Joi.string().required(),
  userName: Joi.string().required(),
  userAge: Joi.number().required(),
  productName: Joi.string().required(),
  parentEmail: Joi.string().optional().allow(""),
  sentBy: Joi.string().optional().allow(),
  fromAddress: Joi.string().required(),
  consentRejected: Joi.boolean().optional(),
});
export default consentSchema;
