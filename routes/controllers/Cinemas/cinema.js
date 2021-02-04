const Cinema = require("../../../models/cinema")

module.exports.addCinema = async (req, res, next) => {
    const { cinemaBrand, cinemaName, address } = req.body;
    try {
        // Chekck if cinema has already existed
        const isCinemaExists = await Cinema.findOne({ $and: [{ cinemaBrand }, { address }, { cinemaName }] });
        if (isCinemaExists) {
            return res.status(400).send({ error: "Cinema has already existed !" });
        } else {
            const newCinema = new Cinema({ cinemaBrand, cinemaName, address });
            await newCinema.save();
            res.status(400).send({ message: "Added new cinema !" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something went wrong !" });
    }
}

