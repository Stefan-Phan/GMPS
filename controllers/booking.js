import Booking from "../models/booking.js";
import { StatusCodes } from "http-status-codes";
import { validateBookingFields } from "../middleware/validateBookingFields.js";
import { checkDoctorAvailability } from "../middleware/checkDoctorAvailability.js";
import { sendBookingConfirmation } from "../utils/sendEmail.js";

const getAllBookings = async (req, res) => {
  const bookings = await Booking.find().sort("appointmentDate");
  res.status(StatusCodes.OK).json({ bookings, count: bookings.length });
};

const getBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: `There is no booking with id ${req.params.id}` });
  }

  res.status(StatusCodes.OK).json({ booking });
};

const getDoctorBookings = async (req, res) => {
  const { doctorId } = req.params;

  if (!doctorId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Missing doctor ID" });
  }

  const bookings = await Booking.find({ doctorId }).sort("appointmentDate");
  res.status(StatusCodes.OK).json({ bookings, count: bookings.length });
};

const createBooking = async (req, res) => {
  const { doctorId, appointmentDate, slot, email, name } = req.body;

  if (!validateBookingFields(doctorId, appointmentDate, slot, res)) return;

  const doctor = await checkDoctorAvailability(
    doctorId,
    appointmentDate,
    slot,
    res
  );

  if (!doctor) return;

  const existingBooking = await Booking.findOne({
    doctorId,
    appointmentDate,
    slot,
  });
  if (existingBooking) {
    return res
      .status(StatusCodes.CONFLICT)
      .json({ error: "This time slot is already booked" });
  }

  req.body.bookedBy = req.user.userId;
  const booking = await Booking.create(req.body);

  try {
    await sendBookingConfirmation({
      to: email,
      name: name,
      doctorName: doctor.name,
      date: appointmentDate,
      slot,
    });
  } catch (err) {
    console.error("Failed to send booking confirmation email:", err);
  }

  res.status(StatusCodes.CREATED).json({ booking });
};

const updateBooking = async (req, res) => {
  const { doctorId, appointmentDate, slot } = req.body;
  const { id: bookingId } = req.params;
  const { userId } = req.user;

  if (!validateBookingFields(doctorId, appointmentDate, slot, res)) return;

  const doctor = await checkDoctorAvailability(
    doctorId,
    appointmentDate,
    slot,
    res
  );
  if (!doctor) return;

  const existingBooking = await Booking.findOne({
    doctorId,
    appointmentDate,
    slot,
    _id: { $ne: bookingId },
  });

  if (existingBooking) {
    return res
      .status(StatusCodes.CONFLICT)
      .json({ error: "This slot is already booked by another user" });
  }

  const booking = await Booking.findOneAndUpdate(
    { _id: bookingId, bookedBy: userId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!booking) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: `No booking with id ${bookingId} found for this user` });
  }

  res.status(StatusCodes.OK).json({ booking });
};

const deleteBooking = async (req, res) => {
  const { id: bookingId } = req.params;
  const { userId } = req.user;

  const booking = await Booking.findOneAndDelete({
    _id: bookingId,
    bookedBy: userId,
  });

  if (!booking) {
    return res.status(StatusCodes.NOT_FOUND).json({
      error: `There is no booking with id ${bookingId} for this user`,
    });
  }

  res.status(StatusCodes.OK).send("Successfully removed the booking");
};

export default {
  getAllBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking,
  getDoctorBookings,
};
