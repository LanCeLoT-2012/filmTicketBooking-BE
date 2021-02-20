const mongoose = require("mongoose");
const { seatSchema } = require("./seat");

const theaterSchema = mongoose.Schema({
	theaterName: { type: String, required: true },
	cinemaId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "cinema",
		required: true,
	},
	normalSeats: { type: [{ type: seatSchema }], default: [] },
    vipSeats: { type: [{ type: seatSchema }], default: [] },
    sweetBoxs: { type: [{ type: seatSchema }], default: [] }
});

const Theater = mongoose.model("theater", theaterSchema);
module.exports = Theater;

