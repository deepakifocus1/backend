import Joi from "joi";
import Dropdown from "../models/dropdown/dropdownModel";

const dropdownOptionSchema = Joi.object({
  value: Joi.string().required(),
});

const dropdownSchema = Joi.object({
  type: Joi.string().required(),
  options: Joi.array().items(dropdownOptionSchema).required(),
});

export default dropdownSchema;

export const validateDropdownOption = async (
  type: string,
  value: string
): Promise<boolean> => {
  const dropdown = await Dropdown.findOne({ type }).exec();
  return dropdown?.options.some((option) => option.value === value) ?? false;
};
