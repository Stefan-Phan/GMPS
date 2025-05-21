import Doctor from "../models/doctor.js";
import { StatusCodes } from "http-status-codes";

export const checkDoctorAvailability = async (
  doctorId,
  appointmentDate,
  slot,
  res
) => {
  const doctor = await Doctor.findById(doctorId);
  if (!doctor) {
    res.status(StatusCodes.NOT_FOUND).json({ error: "Doctor not found" });
    return null;
  }

  const availability = doctor.availability.find(
    (a) => a.dayOfWeek === appointmentDate
  );

  if (!availability) {
    res.status(StatusCodes.BAD_REQUEST).json({
      error: `Doctor is not available on ${appointmentDate}`,
    });
    return null;
  }

  const isSlotAvailable = availability.availableSlots.includes(slot);

  if (!isSlotAvailable) {
    res.status(StatusCodes.BAD_REQUEST).json({
      error: "Selected slot is not available for this doctor",
    });
    return null;
  }

  return doctor;
};
