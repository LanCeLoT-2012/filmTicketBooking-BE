const mongoose = require("mongoose");

const showTimeSchema = mongoose.Schema({
	filmId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "film",
		required: true,
	},
	cinemaId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "cinema",
		required: true,
	},
	theaterId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "theater",
		required: true,
	},
	showDate: { type: Date, required: true },
	showTimes: { type: [{ type: String }], default: [] },
});

const ShowTime = mongoose.model("showtime", showTimeSchema);
module.exports = ShowTime;