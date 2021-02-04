const Cinema = require("../../../models/cinema");
const ShowTime = require("../../../models/showtime");
const Theater = require("../../../models/theater");

module.exports.addNewShowTime = async (req, res, next) => {
	const { filmId, cinemaId, theaterId, showDate, startingTime } = req.body;
	try {
		const isShowTimeExists = await ShowTime.findOne({
			filmId,
			cinemaId,
			theaterId,
			showDate,
			startingTime,
		});
		if (isShowTimeExists) {
			res.status(400).send({ error: "Showtime has already exists !" });
		} else {
			const newShowTime = new ShowTime({
				filmId,
				cinemaId,
				theaterId,
				showDate,
				startingTime,
			});
			await newShowTime.save();
			res.status(200).send({ message: "Added new show time !" });
		}
	} catch (error) {
		console.log(error);
		res.status(500).send({ error: "Something went wrong !" });
	}
};

module.exports.getCinemaByFilmId = async (req, res, next) => {
	const { filmId } = req.params;
	try {
		const filmCinemas = await ShowTime.find({ filmId })
			.select("-_id cinemaId")
			.populate([
				{
					path: "cinemaId",
					select: "-_id cinemaBrand",
					populate: [{ path: "cinemaBrand", select: "cinemaLogo -_id" }],
				},
			]);
		res.status(200).json(filmCinemas);
	} catch (error) {
		console.log(error);
		return res.status(500).send("Something went wrong !");
	}
};

module.exports.getShowtimesByFilm = async (req, res, next) => {
	const { filmId } = req.params;
	try {
		const showtimeByFilm = await ShowTime.find({ filmId });
		return res.status(200).json(showtimeByFilm);
	} catch (error) {
		console.log(error);
		return res.status(500).send("Something went wrong !");
	}
}