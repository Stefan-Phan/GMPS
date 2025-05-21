import { StatusCodes } from "http-status-codes";

export const validateBookingFields = (doctorId, appointmentDate, slot, res) => {
  if (!doctorId || !appointmentDate || !slot) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Missing required fields" });
    return false;
  }
  return true;
};
