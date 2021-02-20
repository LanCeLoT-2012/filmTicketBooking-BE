const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
})

const Ticket = mongoose.model("ticket", ticketSchema);
module.exports = Ticket;