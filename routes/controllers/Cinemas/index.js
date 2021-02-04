const express = require("express");
const cinemaControllers = require("./cinema");

const router = express.Router();

router.post("/addCinema", cinemaControllers.addCinema);

module.exports = router;
