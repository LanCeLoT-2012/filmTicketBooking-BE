const mongoose = require("mongoose");

const cinemaSchema = mongoose.Schema({
    cinemaBrand: { type: mongoose.Schema.Types.ObjectId, ref: "cinemabrand", required: true },
    cinemaName: { type: String, required: true },
    address: { type: String, required: true },
    theaters: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "theater"
            }
        ],
        default: []
    },  
    // cinemaLogo: {type: String, required: true},
})

const Cinema = mongoose.model("cinema", cinemaSchema);
module.exports = Cinema;