const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" , required: true },
    showtimeId: {type: mongoose.Schema.Types.ObjectId, ref: "showtime" , required: true}
})

const Ticket = mongoose.model("ticket", ticketSchema);
module.exports = Ticket;