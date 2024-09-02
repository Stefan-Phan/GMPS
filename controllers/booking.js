

const getAllBookings = async (req, res) => {
  res.status(400).send("All Bookings");
};

const getBooking = async (req, res) => {
  res.status(400).send("booking");
};

const createBooking = async (req, res) => {
  res.status(400).send("Create booking");
};

const updateBooking = async (req, res) => {
  res.status(400).send("Update booking");
};

const deleteBooking = async (req, res) => {
  res.status(400).send("Delete booking");
};

module.exports = {
  getAllBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking,
};
