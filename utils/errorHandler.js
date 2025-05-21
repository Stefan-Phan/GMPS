import { StatusCodes } from "http-status-codes";

export const handleDuplicateKeyError = (error, res) => {
  const duplicateField = Object.keys(error.keyValue)[0];
  return res
    .status(StatusCodes.BAD_REQUEST)
    .json({ error: `${duplicateField} already exists` });
};

export const handleGenericError = (res) => {
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ error: "Something went wrong" });
};

export const sendDoctorNotFound = (res, doctorId) => {
  return res
    .status(StatusCodes.NOT_FOUND)
    .json({ error: `No doctor found with id ${doctorId}` });
};
