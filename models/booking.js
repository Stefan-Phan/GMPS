import { Schema, Types, model } from "mongoose";

import validator from "validator";
import { FIXED_TIME_SLOTS } from "../constants/timeSlots.js";

const { isEmail } = validator;

const BookingSchema = new Schema({
  doctorId: {
    type: Types.ObjectId,
    ref: "Doctor",
    required: true,
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
  slot: {
    type: String,
    required: [true, "Please select an appointment slot"],
    enum: FIXED_TIME_SLOTS,
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
  bookedBy: {
    type: Types.ObjectId,
    ref: "User",
    required: [true, "Please provide patient ID"],
  },
});

export default model("Booking", BookingSchema);
