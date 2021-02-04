const mongoose = require("mongoose");

const seatSchema = mongoose.Schema({
    status: { type: Boolean, default: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", default: null },
})

const Seat = mongoose.model("seat", seatSchema);
module.exports = {
    seatSchema,
    Seat
};