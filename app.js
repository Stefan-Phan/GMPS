import dotenv from "dotenv";
dotenv.config();

// Import core Express and middleware
import express, { json } from "express";
import cookieParser from "cookie-parser";

// --- Route Imports ---
import authRouter from "./routes/auth.js";
import bookingRouter from "./routes/booking.js";
import doctorRouter from "./routes/doctor.js";
import adminRouter from "./routes/admin/ad_doctor.js";

// --- Middleware Imports ---
import authenticateUser from "./middleware/authentication.js";
import adminAuth from "./middleware/adminAuthenticate.js";
import notFoundMiddleWare from "./middleware/not-found.js";
import errorHandlerMiddleWare from "./middleware/error-handler.js";

// Initialize Express application
const app = express();

// --- Express Middleware Setup ---
app.use(json());
app.use(cookieParser());

// --- API Routes ---
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/doctors", doctorRouter);
app.use("/api/v1/bookings", authenticateUser, bookingRouter);
app.use("/api/v1/admin", adminAuth, adminRouter);

// --- Error Handling Middleware ---
app.use(notFoundMiddleWare);
app.use(errorHandlerMiddleWare);

// --- Server Configuration ---
import connectDB from "./db/connect.js";

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
