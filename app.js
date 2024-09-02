require("dotenv").config()
require("express-async-errors")

const express = require('express')
const app = express()

const bookingRoutes = require('./routes/booking')
const doctorRoutes = require('./routes/doctor')
const userRoutes = require('./routes/auth')

// Connect DB
const connectDB = require('./db/connect')

app.use(express.json())


// Routes
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/bookings", bookingRoutes)
app.use("/api/v1/doctors", doctorRoutes)

const port = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, ()=> console.log(`Server is listening on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start()