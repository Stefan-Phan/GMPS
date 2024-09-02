require("dotenv").config();

const express = require('express')
const app = express()

// routes
const authRouter = require("./routes/auth")
const bookingRouter = require('./routes/booking')
const doctorRouter = require('./routes/doctor')
const adminRouter = require('./routes/admin/ad_doctor')

// middleware
const authenticateUser = require('./middleware/authentication')
const adminAuth = require('./middleware/adminAuthenticate')

app.use(express.json());

// routes
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/doctors", doctorRouter)
app.use("/api/v1/bookings", authenticateUser, bookingRouter)
app.use("/api/v1/admin", adminAuth, adminRouter)

// connect DB
const connectDB = require('./db/connect')

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