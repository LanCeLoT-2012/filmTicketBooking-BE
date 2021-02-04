const Film = require("../../../models/film");

module.exports.addNewFilm = async (req, res, next) => {
	const {
		filmName,
		trailerLink,
		description,
		thumbnail,
		releaseDate,
		director,
		actors,
		category,
		madeIn,
		duration,
		filmLabel,
		ratingPoint,
	} = req.body;
	if (duration <= 0) {
		return res
			.status(400)
			.send({ error: "Film's duration must longer than 0 !" });
	}
	const isFilmExists = await Film.findOne({ filmName });
	if (isFilmExists) {
		return res.status(400).send({ error: "Film has already existed !" });
	} else {
		const newFilm = new Film({
			filmName,
			trailerLink,
			description,
			thumbnail,
			releaseDate,
			director,
			actors,
			category,
			madeIn,
			duration,
			filmLabel,
			ratingPoint,
		});
		await newFilm.save();
		res.status(200).send({ message: "Added new film !" });
	}
};

module.exports.getShowingFilms = async (req, res, next) => {
	const currentDate = new Date();
	try {
		const foundedFilms = await Film.find({
			releaseDate: { $lte: currentDate },
		});
		if (!foundedFilms) {
			return res.status(400).json({ message: "No films founded !" });
		} else {
			return res.status(200).json(foundedFilms);
		}
	} catch (error) {
		console.log(error);
		res.status(500).send("Something went wrong !");
	}
};

module.exports.getCommingFilms = async (req, res, next) => {
	const currentDate = new Date();
	try {
		const foundedFilms = await Film.find({
			releaseDate: { $gt: currentDate },
		});
		if (!foundedFilms) {
			return res.status(400).json({ message: "No films founded !" });
		} else {
			return res.status(200).json(foundedFilms);
		}
	} catch (error) {
		console.log(error);
		res.status(500).send("Something went wrong !");
	}
};

module.exports.getFilmDetail = async (req, res, next) => {
	const { filmId } = req.params;
	try {
		const foundedFilm = await Film.findById(filmId).populate([
			{
				path: "comments",
				populate: { path: "userId", select: "avatar displayName -_id" },
			},
		]);
		if (!foundedFilm) {
			res.status(400).json({ error: "This film is no longer existed !" });
		} else {
			res.status(200).json(foundedFilm);
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Something went wrong !" });
	}
};

module.exports.getFilmComments = async (req, res, next) => {
	const { filmId } = req.params;
	try {
		const filmComments = await Film.findById(filmId)
			.sort({ "comments.commentTime": "desc" })
			.select("comments -_id")
			.populate([
				{
					path: "comments",
					populate: {
						path: "userId",
						select: "avatar displayName -_id",
					},
				},
			]);
		return res.status(200).json(filmComments);
	} catch (error) {
		console.log(error);
		return res.status(500).send("Something went wrong");
	}
};
