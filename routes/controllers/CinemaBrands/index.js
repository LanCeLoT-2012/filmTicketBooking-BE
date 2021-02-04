const express = require("express");
const cinemaBrandControllers = require("./cinemabrand");

const router = express.Router();

router.post("/addBrand", cinemaBrandControllers.addCinemaBrand);

module.exports = router;