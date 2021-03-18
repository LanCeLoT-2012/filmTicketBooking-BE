const mongoose = require("mongoose");

const theaterSchema = mongoose.Schema({
	theaterName: { type: String, required: true },
	cinemaId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "cinema",
		required: true,
	},
	normalSeats: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: "seat" }], default: [] },
    vipSeats: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: "seat" }], default: [] },
    sweetBoxs: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: "seat" }], default: [] }
});

const Theater = mongoose.model("theater", theaterSchema);
module.exports = Theater;

