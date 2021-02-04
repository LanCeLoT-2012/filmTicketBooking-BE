const express = require("express");
const userControllers = require("./user");

const router = express.Router();

router.post("/signUp", userControllers.userSignUp);
router.post("/signIn", userControllers.userSignIn);
router.get("/isLoggedIn", userControllers.isUserStillLoggedIn);
router.get("/getUser/:userId", userControllers.getUserById);
router.post("/comment", userControllers.commentToFilm);

module.exports = router;
