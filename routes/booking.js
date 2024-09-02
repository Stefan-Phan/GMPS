const express = require("express");
const router = express.Router();

const {
  getAllBookings,
  getBooking,
  createBooking,
  deleteBooking,
  updateBookings,
} = require("../controllers/booking");

router.post("/").post(createBooking).get(getAllBookings)
router.post("/:id").get(getBooking).delete(deleteBooking).patch(updateBookings)

module.exports = router;
