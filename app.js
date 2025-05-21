import dotenv from "dotenv";
dotenv.config();

import express, { json } from "express";
const app = express();

import cookieParser from "cookie-parser";

// routes
import authRouter from "./routes/auth.js";
import bookingRouter from "./routes/booking.js";
import doctorRouter from "./routes/doctor.js";
import adminRouter from "./routes/admin/ad_doctor.js";

// middleware
import authenticateUser from "./middleware/authentication.js";
import adminAuth from "./middleware/adminAuthenticate.js";

// error handler
import notFoundMiddleWare from "./middleware/not-found.js";
import errorHandlerMiddleWare from "./middleware/error-handler.js";

app.use(json());
app.use(cookieParser());

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/doctors", doctorRouter);
app.use("/api/v1/bookings", authenticateUser, bookingRouter);
app.use("/api/v1/admin", adminAuth, adminRouter);

// use error handler
app.use(notFoundMiddleWare);
app.use(errorHandlerMiddleWare);

// connect DB
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
