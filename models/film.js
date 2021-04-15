const mongoose = require("mongoose");
const { commentSchema } = require("./comment");

const filmSchema = mongoose.Schema({
	filmName: { type: String, required: true },
	trailerLink: { type: String, required: true },
	description: { type: String, required: true },
	thumbnail: { type: String, required: true },
	releaseDate: { type: Date, required: true },
	director: { type: String, required: true },
	actors: { type: String, required: true },
	category: { type: String, required: true },
	madeIn: { type: String, required: true },
	duration: { type: String, required: true },
	filmLabel: { type: String, required: true },
	ratingPoint: { type: String, required: true },
  comments: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }], default: [] },
});

const Film = mongoose.model("film", filmSchema);
module.exports = Film;