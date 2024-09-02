const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor"
    }, 
    name: {
        type:String,
        required:[true, "Please provide name"],
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email",
          ],
        unique: true,
    },
    visitDate: {
        type:Date,
        required: [true, "Please provide visit date"],
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Booking", bookingSchema)