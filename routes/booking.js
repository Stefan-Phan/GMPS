import { Router } from "express";
const router = Router();

import bookingController from "../controllers/booking.js";

const {
  getAllBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking,
} = bookingController;

router.route("/").get(getAllBookings).post(createBooking);
router.route("/:id").get(getBooking).delete(deleteBooking).patch(updateBooking);

export default router;
