const express = require("express");
const theaterControllers = require("./theater");

const router = express.Router();
router.post("/addTheater", theaterControllers.addNewTheater);

module.exports = router;