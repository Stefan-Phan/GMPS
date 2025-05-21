import { Router } from "express";
import bookingController from "../controllers/booking.js";

const router = Router();
const {
  getAllBookings,
  getDoctorBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking,
} = bookingController;

router.route("/").get(getAllBookings).post(createBooking);
router.route("/:id").get(getBooking).delete(deleteBooking).patch(updateBooking);
router.route("/doctor/:doctorId").get(getDoctorBookings);

export default router;
