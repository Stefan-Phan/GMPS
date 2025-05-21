import { Schema, Types, model } from "mongoose";

import validator from "validator";

const { isEmail } = validator;

const TIME_SLOTS = [
  { start: "09:00", end: "11:00" },
  { start: "11:00", end: "13:00" },
  { start: "13:00", end: "15:00" },
  { start: "15:00", end: "17:00" },
];

const BookingSchema = new Schema(
  {
    doctorId: {
      type: Types.ObjectId,
      ref: "Doctor",
    },
    name: {
      type: String,
      required: [true, "Please provide name"],
      minlength: [3, "name must be at least 3 characters long"],
      maxlength: [50, "name must be at most 50 characters long"],
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      validate: {
        validator: (value) => isEmail(value),
        message: "Email must be valid",
      },
    },
    appointmentDate: {
      type: String,
      enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      required: [true, "Please provide the appointment date"],
    },
    appointmentStartTime: {
      type: String,
      required: [true, "Please provide the appointment start time"],
      enum: ["09:00", "11:00", "13:00", "15:00"],
    },
    appointmentEndTime: {
      type: String,
      required: [true, "Please provide the appointment end time"],
      enum: ["11:00", "13:00", "15:00", "17:00"],
    },
    reason: {
      type: String,
      required: [true, "Please provide the reason"],
    },
    status: {
      type: String,
      enum: ["Scheduled", "Completed", "Cancelled"],
      default: "Scheduled",
    },
    // bookedBy: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "User",
    //   required: [true, "Please provide patient ID"],
    // },
  },
  { timestamps: true }
);

export default model("Booking", BookingSchema);
