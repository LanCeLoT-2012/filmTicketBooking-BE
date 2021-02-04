const express = require("express");
const carouselControllers = require("./carousel");

const router = express.Router();
router.post("/addCarousel", carouselControllers.addNewCarousel);
router.get("/getAllCarousels", carouselControllers.getAllCarousels);

module.exports = router;
