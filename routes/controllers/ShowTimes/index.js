const express = require("express");
const ShowTimeControllers = require("./showTime");
const UserControllers = require("../Users/user");

const router = express.Router();
router.post("/addShowtime", ShowTimeControllers.addNewShowTime);
router.get("/getShowtimes/:filmId", ShowTimeControllers.getShowtimesByFilm);
router.get("/getCinemas/:filmId", ShowTimeControllers.getCinemaByFilmId);
router.get("/detailShowtime/:showTimeId", ShowTimeControllers.getShowtimeDetail);
router.post("/bookingSeats", UserControllers.isUserStillLoggedIn , ShowTimeControllers.handleBookingSeats);

module.exports = router;