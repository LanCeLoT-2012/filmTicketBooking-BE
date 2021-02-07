const ShowTime = require("../../../models/showtime");

module.exports.addNewShowTime = async (req, res, next) => {
	const { filmId, cinemaId, theaterId, showDate, startingTime } = req.body;
	try {
		const foundedShowtime = await ShowTime.findOne({ filmId, cinemaId, theaterId, showDate });
		console.log(foundedShowtime);
		// Check if showtime has already exists
		if (!foundedShowtime) {
			let showTimes = [];
			showTimes.push(startingTime);
			// Create new showtime and save it to database
			const newShowtime = new ShowTime({
				filmId,
				cinemaId,
				theaterId,
				showDate,
				showTimes,
			});
			await newShowtime.save();
			return res.status(200).json({ message: "Added new showtime !" });
		} else {
			let filmShowtimes = []
			// Check if starting time has already existed 
			foundedShowtime.showTimes.map((showTime) => {
				if (showTime === startingTime) {
					// Return Error
					return res
						.status(400)
						.json({ error: "Showtime has already existed !" });
				} else {
					filmShowtimes.push(showTime);
				}
			});
			filmShowtimes.push(startingTime);
			// Update film showTimes
			foundedShowtime.showTimes = filmShowtimes;
			await foundedShowtime.save();
			return res.status(200).json({ message: "Added new showtime !" });
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
					select: "-_id -cinemaName -address -theaters",
					populate: [
						{ path: "cinemaBrand", select: "brandName -_id" },
					],
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
		const showtimeByFilm = await ShowTime.find({ filmId }).populate([
			{
				path: "cinemaId",
				select: "-_id cinemaName address ",
				populate: [
					{path: "cinemaBrand", select: "-_id brandName"}
				]
			},
			{ path: "theaterId", select: "" },
		]);
		return res.status(200).json(showtimeByFilm);
	} catch (error) {
		console.log(error);
		return res.status(500).send("Something went wrong !");
	}
}

module.exports.getShowtimeDetai = async (req, res, next) => {
	const { showTimeId } = req.params;
	try {
		const foundedShowtime = await ShowTime
			.findById(showTimeId)
			.populate([
				{path: "filmId", select: "-_id filmName filmLabel"},
				{
					path: "cinemaId", select: "-_id cinemaName address", populate: [
						{path: "cinemaBrand", select: "-_id brandName"}
					]
				},
				{path: "theaterId", select: "-_id theaterName seats"}
			])
		if (!foundedShowtime) {
			return res.status(400).json({ error: "This showtime is no longer existed !" });
		} else {
			return res.status(200).json(foundedShowtime);
		}
	} catch (error) {
		console.log(error);
		return res.status(500).send("Something went wrong !");
	}
}