import mongoose, { Schema } from "mongoose";

const consentSchema = new Schema(
  {
    userEmail: {
      type: String,
      required: [true, "Please provide email"],
    },
    userName: {
      type: String,
      required: [true, "Please provide name"],
    },
    userAge: {
      type: Number,
      required: [true, "Please provide age"],
    },
    DOB: {
      type: Date,
    },
    productName: {
      type: String,
      required: [true, "Please provide product name"],
      default: "Drishti",
    },
    parentEmail: {
      type: String,
      default: null,
    },
    sentBy: {
      type: String,
    },
    fromAddress: {
      type: String,
      required: true,
      default: "internal.apps@ifocussystec.in",
    },
    consentSent: {
      type: Boolean,
    },
    consentSentDate: { type: Date },
    consentGiven: {
      type: Boolean,
    },
    consentExpiryDate: { type: Date },
    consentRejected: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const Consent = mongoose.model("Consent", consentSchema);
export default Consent;
