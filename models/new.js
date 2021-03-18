const mongoose = require("mongoose");

const newSchema = mongoose.Schema({
    thumbnail: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
});

const New = mongoose.model("new", newSchema);
module.exports = New;