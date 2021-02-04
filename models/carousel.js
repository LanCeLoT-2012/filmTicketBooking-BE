const mongoose = require("mongoose");

const carouselSchema = mongoose.Schema({
    filmId: { type: mongoose.Schema.Types.ObjectId, ref: "film", required: true },
	trailerLink: { type: String, required: true },
	banner: { type: String, required: true },
});

const Carousel = mongoose.model("carousel", carouselSchema);
module.exports = Carousel;
