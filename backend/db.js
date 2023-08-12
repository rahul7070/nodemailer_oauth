const mongoose = require("mongoose");
require("dotenv").config()


mongodbURL = "mongodb+srv://rahulraman:rahulraman@cluster0.wsz3ebs.mongodb.net/tripifydb?retryWrites=true&w=majority"

const connection = mongoose.connect(mongodbURL)

module.exports = {connection}
