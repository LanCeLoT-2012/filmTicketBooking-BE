const mongoose = require("mongoose");

const cinemaBrandSchema = mongoose.Schema({
    brandName: { type: String, required: true },
    email: { type: String, required: true },
    hotline: { type: String, required: true },
    // brandLogo: { type: String, required: true },
})

const CinemaBrand = mongoose.model("cinemabrand", cinemaBrandSchema);
module.exports = CinemaBrand;