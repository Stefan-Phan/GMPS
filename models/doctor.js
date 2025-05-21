import { Schema, model } from "mongoose";
import { DEFAULT_DOCTOR_AVAILABILITY } from "../constants/defaultDoctorAvailability.js";
import { FIXED_TIME_SLOTS } from "../constants/timeSlots.js";

const DoctorSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    minlength: [3, "name must be at least 3 characters long"],
    maxlength: [50, "name must be at most 50 characters long"],
  },
  speciality: {
    type: String,
    required: [true, "Please provide a speciality"],
  },
  contactInfo: {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  availability: {
    type: [
      {
        dayOfWeek: {
          type: String,
          enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          required: true,
        },
        availableSlots: {
          type: [String],
          enum: FIXED_TIME_SLOTS,
          required: true,
        },
      },
    ],
    default: DEFAULT_DOCTOR_AVAILABILITY,
  },
});

export default model("Doctor", DoctorSchema);
