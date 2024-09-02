const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    maxlength: 100,
  },
  speciality: {
    type: String,
    required: [true, "Please provide speciality area"],
    maxlength: 100,
  },
  doctorNumbers: {
    type: [
      {
        number: Number,
        unavailableDates: [Date],
      },
    ],
  },
});

module.exports = mongoose.model("Doctor", DoctorSchema);
