const Booking = require("../models/booking");
const Doctor = require("../models/doctor");
const { StatusCodes } = require("http-status-codes");

const getAllBookings = async (req, res) => {
  const bookings = await Booking.find()
    .sort("appointmentDate")
    .sort("appointmentTime");
  res.status(StatusCodes.OK).json({ bookings, count: bookings.length });
};

const getBooking = async (req, res) => {
  const bookingId = req.params.id;

  const booking = await Booking.findOne({ _id: bookingId });
  if (!booking) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: `There is no booking with id ${bookingId}` });
  }
  res.status(StatusCodes.OK).json({ booking });
};

const createBooking = async (req, res) => {
  const { doctorId, appointmentDate, appointmentTime } = req.body;

  if (!doctorId || !appointmentDate || !appointmentTime) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Missing required fields" });
  }

  // Find the doctor and check availability
  const doctor = await Doctor.findOne({ _id: doctorId });

  if (!doctor) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: "Doctor not found" });
  }

  const availability = doctor.availability.find(
    (avail) => avail.dayOfWeek === appointmentDate
  );
  if (!availability) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: `Doctor is not available on ${appointmentDate}` });
  }

  // Make sure request time in the working hours of doctors
  let startTime = Number(availability.startTime.split(":")[0]);
  let endTime = Number(availability.endTime.split(":")[0]);
  let requestTime = Number(appointmentTime.split(":")[0]);

  if (requestTime > endTime || requestTime < startTime) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Appointment time is outside doctor's working hours" });
  }

  const existingBooking = await Booking.findOne({
    doctorId,
    appointmentDate,
    appointmentTime,
  });

  if (existingBooking) {
    return res
      .status(StatusCodes.CONFLICT)
      .json({ error: "This time slot is already booked" });
  }

  // Create the booking
  req.body.bookedBy = req.user._id;
  const booking = await Booking.create(req.body);

  res.status(StatusCodes.CREATED).json({ booking });
};

const updateBooking = async (req, res) => {
  const {
    body: { doctorId, name, email, appointmentDate, appointmentTime, reason },
    user: userId,
    params: {id:bookingId},
  } = req;
  if (
    doctorId === "" ||
    name === "" ||
    email === "" ||
    appointmentDate === "" ||
    appointmentTime === "" ||
    reason === ""
  ) {
    return res.status(StatusCodes.BAD_REQUEST).send("Fields cannot be empty");
  }
  // Find the doctor and check availability
  const doctor = await Doctor.findOne({ _id: doctorId });

  if (!doctor) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: "Doctor not found" });
  }

  const availability = doctor.availability.find(
    (avail) => avail.dayOfWeek === appointmentDate
  );
  if (!availability) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: `Doctor is not available on ${appointmentDate}` });
  }

  // Make sure request time in the working hours of doctors
  let startTime = Number(availability.startTime.split(":")[0]);
  let endTime = Number(availability.endTime.split(":")[0]);
  let requestTime = Number(appointmentTime.split(":")[0]);

  if (requestTime > endTime || requestTime < startTime) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Appointment time is outside doctor's working hours" });
  }

  const existingBooking = await Booking.findOne({
    doctorId,
    appointmentDate,
    appointmentTime,
  });

  if (existingBooking) {
    return res
      .status(StatusCodes.CONFLICT)
      .json({ error: "This time slot is already booked" });
  }

  const booking = await Booking.findByIdAndUpdate(
    { _id: bookingId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!booking) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send(`No booking with ${bookingId}`);
  }
  res.status(StatusCodes.OK).json({ booking });
};

const deleteBooking = async (req, res) => {
  const {
    user: { userId },
    params: { id: bookingId },
  } = req;

  const booking = Booking.findByIdAndDelete({_id:bookingId})

  if (!booking) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: `There is no booking with id ${bookingId}` });
  }
  res.status(StatusCodes.OK).send("Successfully removed the booking")
};
module.exports = {
  getAllBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking,
};
