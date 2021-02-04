const Carousel = require("../../../models/carousel");

module.exports.addNewCarousel = async (req, res, next) => {
    const { filmId, trailerLink, banner } = req.body;
    try {
        const isCarouselExists = await Carousel.findOne({ filmId, trailerLink, banner });
        if (isCarouselExists) {
            return res.status(400).send({ error: "Carousel has already existed !" });
        } else {
            const newCarousel = new Carousel({ filmId, trailerLink, banner });
            await newCarousel.save();
            return res.status(200).send({ message: "Added new carousel !" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong !");
    }
}

module.exports.getAllCarousels = async (req, res, next) => {
    try {
        const allCarousels = await Carousel.find();
        res.status(200).json(allCarousels);
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong !");
    }
}