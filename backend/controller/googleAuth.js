const express = require("express");
const cors = require("cors")
const cookieSession = require("cookie-session")
const passport = require("passport")
const passportSetup = require("./passport")

const googleRouter = express.Router()


googleRouter.use(
    cookieSession({
        name: "session",
        keys: ["cyberwolve"],
        maxAge : 24 *60*60*1000, 
    })
)

googleRouter.use(passport.initialize());
googleRouter.use(passport.session());

googleRouter.use(
    cors({
        origin:"http://localhost:7900",
        methods: "GET,POST,PUT,DELETE",
        credentials:true
    })
);

module.exports = googleRouter;

