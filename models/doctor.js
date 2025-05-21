import { Schema, model } from "mongoose";

const defaultAvailability = [
  { dayOfWeek: "Monday", startTime: "9:00", endTime: "17:00" },
  { dayOfWeek: "Tuesday", startTime: "9:00", endTime: "17:00" },
  { dayOfWeek: "Wednesday", startTime: "9:00", endTime: "17:00" },
  { dayOfWeek: "Thursday", startTime: "9:00", endTime: "17:00" },
  { dayOfWeek: "Friday", startTime: "9:00", endTime: "17:00" },
];

const DoctorSchema = new Schema({
  name: {
    type: String,
    unique: true,
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
          required: [true, "Please provide a day"],
        },
        startTime: {
          type: String,
          default: "8:00",
        },
        endTime: {
          type: String,
          default: "17:00",
        },
      },
    ],
    default: defaultAvailability,
  },
});

export default model("Doctor", DoctorSchema);
