const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: [3, "name must be at least 3 characters long"],
    maxlength: [50, "name must be at most 50 characters long"],
  },
  speciality: {
    type: String,
    required: [true, "Please provide speciality"],
  }
}, {timestamps: true});

module.exports = mongoose.model("Doctor", DoctorSchema)
