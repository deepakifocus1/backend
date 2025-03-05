import mongoose, { Schema } from "mongoose";

const dropdownSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  options: [
    {
      value: {
        type: String,
        required: true,
      },
    },
  ],
});

const Dropdown = mongoose.model("Dropdown", dropdownSchema);

export default Dropdown;
