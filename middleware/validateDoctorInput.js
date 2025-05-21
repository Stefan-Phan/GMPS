import { StatusCodes } from "http-status-codes";

export const validateDoctorInput = (req, res) => {
  const { name, speciality } = req.body;
  if (!name || !speciality) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Name and speciality cannot be empty" });
    return false;
  }
  return true;
};
