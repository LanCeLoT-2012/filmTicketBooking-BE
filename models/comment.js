const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
	content: { type: String, required: true },
	filmId: { type: mongoose.Schema.Types.ObjectId, ref: "film" },
	commentTime: { type: Number, required: true },
});

const Comment = mongoose.model("comment", commentSchema);
module.exports = {
    commentSchema,
    Comment
};