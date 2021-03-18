const New = require("../../../models/new");

module.exports.addNew = async (req, res, next) => {
	const { thumbnail, title, content } = req.body;
	try {
		// Create new New
		const newNew = new New({ thumbnail, title, content });
		await newNew.save();
		return res.status(200).json({ message: "Added new New !", newNew });
	} catch (error) {
		console.log(error);
		return res.status(500).send({ message: "Something went wrong !" });
	}
};

module.exports.getAllNews = async (req, res, next) => {
	try {
		const allNews = await New.find();
		if (allNews && allNews.length === 0) {
			return res.status(400).send({ message: "No news found !" });
		} else {
			return res.status(200).json(allNews);
		}
	} catch (error) {
		console.log(error);
		return res.status(500).send({ message: "Something went wrong !" });
	}
}

module.exports.deleteNew = async (req, res, next) => {
	const { newId } = req.body;
	try {
		// Check if new is still exist
		const foundedNew = await New.findById(newId);
		if (!foundedNew) {
			return req
				.status(400)
				.json({ error: "This new is no longer exist !" });
		} else {
			await New.findByIdAndDelete(newId);
			return res.status(200).send({ message: "Delete successful !" });
		}
	} catch (error) {
		console.log(error);
		return res.status(500).send({ message: "Something went wrong !" });
	}
};

module.exports.updateNew = async (req, res, next) => {
	const { newId, thumbnail, title, content } = req.body;
	try {
		const foundedNew = await New.findById(newId);
		if (!foundedNew) {
			return res.status(400).send({ error: "This new is no longer existed !" });
		} else {
			foundedNew.thumbnail = thumbnail;
			foundedNew.title = title;
			foundedNew.content = content;
			await foundedNew.save();
			return res.status(200).send({ message: "Update successful !" });
		}
	} catch (error) {
		console.log(error);
		return res.status(500).send({ message: "Something went wrong !" });
	}
}
