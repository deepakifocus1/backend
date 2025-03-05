import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
import { IUser } from "../../types";
import { ERROR_MESSAGES } from "../../constants/errorMessages";
import { validateDropdownOption } from "../../validations/dropdownValidations";

const userSchema: Schema = new Schema(
  {
    employeeId: {
      type: String,
      required: [true, ERROR_MESSAGES.EMPLOYEE_ID],
    },
    name: { type: String, required: [true, ERROR_MESSAGES.USER_NAME] },
    role: {
      type: String,
      validate: {
        validator: async function (value: string) {
          return validateDropdownOption("Role", value);
        },
        message: "Invalid role",
      },
    },
    email: {
      type: String,
      required: [true, ERROR_MESSAGES.USER_EMAIL],
      lowercase: true,
      validate: [validator.isEmail, ERROR_MESSAGES.USER_EMAIL],
    },
    password: {
      type: String,
      required: [true, ERROR_MESSAGES.USER_PASSWORD],
      select: false,
      minLength: 8,
    },
    team: {
      type: String,
    },
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.index({ email: 1 }, { unique: true });

export const User = mongoose.model<IUser>("User", userSchema);
