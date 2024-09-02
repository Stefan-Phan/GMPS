const mongoose = require("mongoose");
const validator = require("validator")

const BookingSchema = new mongoose.Schema({
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
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: "Email must be valid",
    },
  },
  bookingDate: {
    type:Date,
    required: [true, "Please provide booking date"]
  },
  bookedBy: {
    type:mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide user"]
  }
}, {timestamps: true});

module.exports = mongoose.model("Booking", BookingSchema)