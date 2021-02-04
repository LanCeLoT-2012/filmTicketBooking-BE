const CinemaBrand = require("../../../models/cinemaBrand");

const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegEx = /^[0-9]/;

module.exports.addCinemaBrand = async (req, res, next) => {
	const { brandName, email, hotline } = req.body;
	if (brandName === "") {
		return res
			.status(400)
			.send({ error: "Cinema's name can not be blank !" });
	} else if (email === "") {
		return res.status(400).send({ error: "Email can not be blank !" });
	} else if (!emailRegEx.test(email)) {
		return res
			.status(400)
			.send({ error: "Email is not in correct form !" });
	} else if (!phoneRegEx.test(hotline)) {
		return res
			.status(400)
			.send({ error: "Hotline must contain only numebers !" });
	}
	try {
		const isBrandExists = await CinemaBrand.findOne({
			$or: [{ brandName }, { email }, { hotline }],
		});
		if (isBrandExists) {
			res.status(400).send({
				error: "Cinema brand has already existed !",
			});
		} else {
			const newCinemaBrand = new CinemaBrand({
				brandName,
				email,
				hotline,
			});
			await newCinemaBrand.save();
			res.status(200).send({ message: "Added new cinema brand !" });
		}
	} catch (error) {
		console.log(error);
	}
};
