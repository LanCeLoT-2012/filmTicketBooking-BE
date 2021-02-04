const express = require("express");
const filmControllers = require("./film");

const router = express.Router();
router.post("/addFilm", filmControllers.addNewFilm);
router.get("/getShowingFilms", filmControllers.getShowingFilms);
router.get("/getCommingFilms", filmControllers.getCommingFilms);
router.get("/getFilm/:filmId", filmControllers.getFilmDetail);
router.get("/getComments/:filmId", filmControllers.getFilmComments);

module.exports = router;