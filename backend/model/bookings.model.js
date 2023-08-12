const mongoose = require("mongoose");
const { PackageModel } = require("./packages.model");
const { UserModel } = require("./users.model");

const Schema = mongoose.Schema;

const bookingSchema = mongoose.Schema({
    email : {type: String, required: true},
    fullname : {type: String, required: true},
    contact : {type: Number, required: true},
    depart : {type: String, required: true},
    dest : {type: String, required: true},
    adults : {type: Number, required: true},
    hotelType: {
        type: String,
        enum: ['basic', 'gold', 'platinum'],
        default: 'basic', required:true
      },
    date: {type: Date, default: Date.now, required:true},
    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: PackageModel,
      required: true
    },
    price : {type: Number, required: true},
    totalAmount : {type: Number, required: true},
    user:{type:mongoose.Schema.Types.ObjectId, ref: UserModel},
}) 

const BookingsModel = mongoose.model("booking", bookingSchema);

module.exports = {BookingsModel}