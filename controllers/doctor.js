const Doctor = require("../models/doctor");
const { StatusCodes } = require("http-status-codes");

const getAllDoctors = async (req, res) => {
  const doctors = await Doctor.find().sort("name");
  res.status(StatusCodes.OK).json({ doctors, count: doctors.length });
};

const getDoctor = async (req, res) => {
  const doctorId = req.params.id;

  const doctor = await Doctor.findOne({ _id: doctorId });
  if (!doctor) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: `There is no doctor with id ${doctorId}` });
  }
  res.status(StatusCodes.OK).json({ doctor });
};

const createDoctor = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const doctor = await Doctor.create(req.body);
  res.status(StatusCodes.CREATED).json({ doctor });
};

const updateDoctor = async (req, res) => {
  const {
    body: { name, speciality },
    user: { userId },
    params: { id: doctorId },
  } = req;

  if (name === "" || speciality === "") {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send("Name and speciality cannot be empty");
  }

  const doctor = await Doctor.findByIdAndUpdate(
    { _id: doctorId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!doctor) {
    return res.status(StatusCodes.OK).send(`No doctor with id ${doctorId}`);
  }

  res.status(StatusCodes.OK).json({ doctor });
};

const deleteDoctor = async (req, res) => {
  const {
    user: { userId },
    params: { id: doctorId },
  } = req;

  const doctor = await Doctor.findByIdAndDelete({
    _id: doctorId,
  });

  if (!doctor) {
    return res.status(StatusCodes.OK).send(`No doctor with id ${doctorId}`);
  }
  res
    .status(StatusCodes.OK)
    .send(`Successfully delete doctor with id ${doctorId}`);
};

module.exports = {
  getAllDoctors,
  getDoctor,
  createDoctor,
  updateDoctor,
  deleteDoctor,
};
