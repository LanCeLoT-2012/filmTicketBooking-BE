const mongoose = require("mongoose");
const { seatSchema } = require("./seat");

const theaterSchema = mongoose.Schema({
    theaterName: { type: String, required: true },
    cinemaId: { type: mongoose.Schema.Types.ObjectId, ref: "cinema", required: true },
    seats: { type: [{ type: seatSchema }] },
})

const Theater = mongoose.model("theater", theaterSchema);
module.exports = Theater;

