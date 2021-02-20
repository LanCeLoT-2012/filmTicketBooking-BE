const mongoose = require("mongoose");

const seatSchema = mongoose.Schema({
    status: { type: Boolean, default: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", default: null },
    seatType: { type: String, required: true },
    price: {type: String, required: true},
})

const Seat = mongoose.model("seat", seatSchema);
module.exports = {
    seatSchema,
    Seat
};