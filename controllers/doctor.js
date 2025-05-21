// controllers/doctorController.js
import Doctor from "../models/doctor.js";
import { StatusCodes } from "http-status-codes";
import {
  handleDuplicateKeyError,
  handleGenericError,
  sendDoctorNotFound,
} from "../utils/errorHandler.js";
import { validateDoctorInput } from "../middleware/validateDoctorInput.js";

const getAllDoctors = async (req, res) => {
  const doctors = await Doctor.find().sort("name");
  return res.status(StatusCodes.OK).json({ doctors, count: doctors.length });
};

const getDoctor = async (req, res) => {
  const { id: doctorId } = req.params;
  const doctor = await Doctor.findOne({ _id: doctorId });

  if (!doctor) {
    return sendDoctorNotFound(res, doctorId);
  }

  return res.status(StatusCodes.OK).json({ doctor });
};

const createDoctor = async (req, res) => {
  try {
    req.body.createdBy = req.user.userId;
    const doctor = await Doctor.create(req.body);
    return res.status(StatusCodes.CREATED).json({ doctor });
  } catch (error) {
    if (error.code === 11000) return handleDuplicateKeyError(error, res);
    return handleGenericError(res);
  }
};

const updateDoctor = async (req, res) => {
  const { id: doctorId } = req.params;

  if (!validateDoctorInput(req, res)) return;

  try {
    const doctor = await Doctor.findOneAndUpdate({ _id: doctorId }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doctor) {
      return sendDoctorNotFound(res, doctorId);
    }

    return res.status(StatusCodes.OK).json({ doctor });
  } catch (error) {
    if (error.code === 11000) return handleDuplicateKeyError(error, res);
    return handleGenericError(res);
  }
};

const deleteDoctor = async (req, res) => {
  const {
    user: { userId },
    params: { id: doctorId },
  } = req;

  const doctor = await Doctor.findOneAndDelete({
    _id: doctorId,
    createdBy: userId,
  });

  if (!doctor) {
    return sendDoctorNotFound(res, doctorId);
  }

  return res
    .status(StatusCodes.OK)
    .send(`Successfully deleted doctor with id ${doctorId}`);
};

export default {
  getAllDoctors,
  getDoctor,
  createDoctor,
  updateDoctor,
  deleteDoctor,
};
