import { Document } from "mongoose";

interface DropdownOption {
  value: string;
}

export interface IDropdown extends Document {
  type: string;
  options: DropdownOption[];
}

export interface UpdateDropdownBody {
  optionId: string;
  newValue: string;
}
