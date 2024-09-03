const mongoose = require("mongoose");
const validator = require("validator");

const BookingSchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Types.ObjectId,
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
        validator: (value) => validator.isEmail(value),
        message: "Email must be valid",
      },
    },
    appointmentDate: {
      type: String,
      enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      required: [true, "Please provide the appointment date"],
    },
    appointmentTime: {
      type: String,
      required: [true, "Please provide the appointment time"],
      validate: {
        validator: function(value) {
          return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
        },
        message: "Appointment time must be in HH:MM format"
      }
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

module.exports = mongoose.model("Booking", BookingSchema);
