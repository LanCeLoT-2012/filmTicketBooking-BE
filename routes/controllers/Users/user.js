const User = require("../../../models/user");
const Validation = require("../../../helpers/validations");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const Film = require("../../../models/film");
const { Comment } = require("../../../models/comment");

module.exports.userSignUp = async (req, res, next) => {
	const { email, password, displayName, avatar } = req.body;
	/**
	 * Step 1: Validation sign up fields
	 * Step 2: Check if user is already exists, if not, create new user and save it to database
	 */
	/* --------------------------------- Step 1 --------------------------------- */
	const { validate, error } = Validation.validateSignUpData(req.body);
	if (!validate) {
		return res.status(400).send({ error });
	}
	/* --------------------------------- Step 1 --------------------------------- */
	/* --------------------------------- Step 2 --------------------------------- */
	try {
		const isUserExists = await User.findOne({ email });
		if (isUserExists) {
			return res.status(400).json({ Error: "Email has been used !!" });
		} else {
			// Hash sign up password before save it with other fields
			const hashedPassword = await bcrypt.hash(password, 8);
			const newUser = new User({
				email,
				password: hashedPassword,
				confirmPassword: hashedPassword,
				displayName,
				avatar,
			});
			await newUser.save();
			res.status(200).json({ message: "Sign up successful !" });
		}
	} catch (error) {
		console.log(error);
	}
	/* --------------------------------- Step 2 --------------------------------- */
};

module.exports.userSignIn = async (req, res, next) => {
	const { email, password } = req.body;
	/**
	 * Step 1: Check email and password
	 * Step 2: If true, return accessToken and refreshToken to client
	 */
	try {
		/* --------------------------------- Step 1 --------------------------------- */
		if (email === "") {
			return res.status(400).json({ error: "Please enter your email !" });
		} else if (password === "") {
			return res
				.status(400)
				.json({ error: "Please enter your password !" });
		} else {
			const isUserExists = await User.findOne({ email });
			if (!isUserExists) {
				return res
					.status(400)
					.json({ error: "Account does not exists !" });
			} else {
				const isPassTrue = await bcrypt.compare(
					password,
					isUserExists.password
				);
				if (!isPassTrue) {
					return res
						.status(400)
						.json({ error: "Password is not correct !" });
				}
				/* --------------------------------- Step 2 --------------------------------- */
				// Generate JsonWebToken and send it to client
				const foundedUser = await User.findOne({ email }).select(
					"-password -confirmPassword"
				);
				const accessToken = await JWT.sign(
					{ foundedUser },
					"filmTicketBooking",
					{ expiresIn: "3600000" }
				);
				res.status(200).json({
					message: "Login successful !",
					accessToken,
				});
				/* --------------------------------- Step 2 --------------------------------- */
			}
		}
		/* --------------------------------- Step 1 --------------------------------- */
	} catch (error) {
		console.log(error);
	}
};

module.exports.getUserById = async (req, res, next) => {
	const { userId } = req.params;
	try {
		const foundedUser = await User.findById(userId).select(
			"email displayName avatar -_id"
		);
		if (!foundedUser) {
			return res.status(400).send({ error: "User not founded !" });
		} else {
			return res.status(200).json(foundedUser);
		}
	} catch (error) {
		console.log(error);
		return res.status(500).send("Something went wrong !");
	}
};

module.exports.commentToFilm = async (req, res, next) => {
  const { _id } = req.body.user;
  const { content, filmId } = req.body;
	const currentDate = new Date();
  let commentTime = currentDate.getTime().toString();
	try {
		const foundedFilm = await Film.findById(filmId);
		if (!foundedFilm) {
			return res
				.status(400)
				.json({ error: "This film is no longer existed !" });
		} else {
			const newComment = new Comment({
				userId: _id,
				content,
				filmId,
				commentTime,
			});
      newComment.save();
			// Save comment to film data
			foundedFilm.comments.push(newComment._id);
			await foundedFilm.save();
			return res
				.status(200)
				.json({ message: "You have commented to this film !" });
		}
	} catch (error) {
		console.log(error);
		return res.status(500).send("Something went wrong !");
	}
};