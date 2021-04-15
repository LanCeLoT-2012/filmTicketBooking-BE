const express = require("express");
const userControllers = require("./user");
const Authorization = require("../../../helpers/authorizations")

const router = express.Router();

router.post("/signUp", userControllers.userSignUp);
router.post("/signIn", userControllers.userSignIn);
router.get("/getUser/:userId", userControllers.getUserById);
router.post("/comment", Authorization.userAuthorization , userControllers.commentToFilm);
router.post("/test", Authorization.userAuthorization)

module.exports = router;
