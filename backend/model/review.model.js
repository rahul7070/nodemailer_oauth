const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    email: {type: String, required: true},
    fullname:{type: String, required: true},
    desc: {type: String, required: true},
    dest : {type: String, required: true},
})

const ReviewModel = mongoose.model("review", reviewSchema);

module.exports = {ReviewModel}