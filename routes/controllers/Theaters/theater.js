const Cinema = require("../../../models/cinema");
const { Seat } = require("../../../models/seat");
const Theater = require("../../../models/theater");

module.exports.addNewTheater = async (req, res, next) => {
	const { theaterName, cinemaId } = req.body;
	// Check if cinema is still existed
	try {
		const foundedCinema = await Cinema.findById(cinemaId);
		if (!foundedCinema) {
			return res
				.status(400)
				.send({ error: "Cinema is no longer existed !" });
		} else {
			const foundedTheater = await Theater.findOne({
				theaterName,
				cinemaId,
			});
			if (foundedTheater) {
				return res
					.status(400)
					.send({ error: "Theater has already existed !" });
			} else {
				const defaultSeats = 30;
				const seats = [...new Array(defaultSeats)].map(async (seat) => {
					return new Seat();
				});
				const newTheater = new Theater({
					theaterName,
					cinemaId,
					seats,
				});
				await newTheater.save();
				// Add new theater to cinema
				foundedCinema.theaters.push(newTheater._id);
				await foundedCinema.save();
				res.status(200).send({ message: "Added new theater !" });
			}
		}
	} catch (error) {
		console.log(error);
		res.status(500).send("Something went wrong !");
	}
};
