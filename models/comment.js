const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
	content: { type: String },
	filmId: { type: mongoose.Schema.Types.ObjectId, ref: "film" },
	commentTime: { type: String, default: Date.now() },
});

const Comment = mongoose.model("comment", commentSchema);
module.exports = {
    commentSchema,
    Comment
};