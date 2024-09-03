const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      minlength: [3, "name must be at least 3 characters long"],
      maxlength: [50, "name must be at most 50 characters long"],
    },
    speciality: {
      type: String,
      required: [true, "Please provide speciality"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
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
    availability: [
      {
        dayOfWeek: {
          type: String,
          enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          required: [true, "Please provide day"],
        },
        startTime: {
          type: String,
          default: "8:00"
        },
        endTime: {
          type: String,
          default: "17:00"
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doctor", DoctorSchema);
