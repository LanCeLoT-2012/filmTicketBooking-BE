const express = require("express");
const NewControllers = require("./new");

const router = express.Router();
router.post("/addNew", NewControllers.addNew);
router.get("/getAllNews", NewControllers.getAllNews);
router.delete("/deleteNew", NewControllers.deleteNew);
router.put("/updateNew", NewControllers.updateNew);

module.exports = router;