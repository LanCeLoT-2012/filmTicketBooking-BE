const express = require("express");
const userRouter = require("./controllers/Users/index");
const cinemaBrandRouter = require("./controllers/CinemaBrands/index");
const cinemaRouter = require("./controllers/Cinemas/index");
const filmRouter = require("./controllers/Films/index");
const showTimeRouter = require("./controllers/ShowTimes/index");
const theaterRouter = require("./controllers/Theaters/index");
const carouselRouter = require("./controllers/Carousels/index");
const newRouter = require("./controllers/News/index");

const router = express.Router();
router.use("/api/users", userRouter);
router.use("/api/brands", cinemaBrandRouter);
router.use("/api/cinemas", cinemaRouter);
router.use("/api/films", filmRouter);
router.use("/api/showtimes", showTimeRouter);
router.use("/api/theaters", theaterRouter);
router.use("/api/carousels", carouselRouter);
router.use("/api/news", newRouter);

module.exports = router;

