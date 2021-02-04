const express = require("express");
const ShowTimeControllers = require("./showTime");

const router = express.Router();
router.post("/addShowtime", ShowTimeControllers.addNewShowTime);
router.get("/getShowtimes/:filmId", ShowTimeControllers.getShowtimesByFilm);
router.get("/getCinemas/:filmId", ShowTimeControllers.getCinemaByFilmId);

module.exports = router;