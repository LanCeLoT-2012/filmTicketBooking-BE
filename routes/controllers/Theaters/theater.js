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
				const numberOfNomalSeats = 48;
				const numberOfVipSeats = 12;
				const numberOfSweetBoxs = 5;
				// Generate types of seats
				const normalSeats = await Promise.all(
					[...new Array(numberOfNomalSeats)].map(async (seat) => {
						const newSeat = new Seat({
							status: false,
							userId: null,
							seatType: "Normal Seat",
							price: "80.000",
						});
						await newSeat.save();
						return newSeat._id;
					})
				);
				const vipSeats = await Promise.all(
					[...new Array(numberOfVipSeats)].map(async (seat) => {
						const newSeat = new Seat({
							status: false,
							userId: null,
							seatType: "Vip Seat",
							price: "100.000",
						});
						await newSeat.save();
						return newSeat._id;
					})
				);
				const sweetBoxs = await Promise.all(
					[...new Array(numberOfSweetBoxs)].map(async (seat) => {
						const newSeat = new Seat({
							status: false,
							userId: null,
							seatType: "Sweet Box",
							price: "150.000",
						});
						await newSeat.save();
						return newSeat._id;
					})
				);
				const newTheater = new Theater({
					theaterName,
					cinemaId,
					normalSeats,
					vipSeats,
					sweetBoxs
				})
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

