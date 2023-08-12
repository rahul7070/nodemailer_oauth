const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const { UserModel } = require("../model/users.model");
const sendMail = require("../controller/mailcontroller");
const sendOtp = require("../controller/sendOtp");
const userRouter = express.Router();


userRouter.post("/register", async (req, res) => {
    try {
        const { Fullname, email, pass, contact } = req.body;
        // console.log(req.body)
        bcrypt.hash(pass, 5, async (error, hash) => {
            if (hash) {
                let payload = await new UserModel({ Fullname, email, pass: hash, contact })
                try {
                    await payload.save() 
                    res.status(201).send({"msg":"User created successfully"})
                } catch (error) {
                    res.status(400).send(error.message)
                }
            } else {
                res.status(400).send(error.message)
            }
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

userRouter.post("/login", async (req, res) => {
    let { email, pass } = req.body;
    try {
        let obj = await UserModel.findOne({ email })
        if (obj) {
            bcrypt.compare(pass, obj.pass, function (err, result) {
                // result == true
                if (result) {
                    res.send({ "msg": "login success", token: jwt.sign({ "userID": obj._id }, "rahul") })
                } else {
                    res.send({ "msg": "wrong password" })
                }
            });
        } else {
            res.send({ "msg": "No user found by this credential" })
        }
    } catch (error) {
        res.send({ "msg": "something wrong happend please try again" })
    }
})

userRouter.post("/mail", sendMail)

userRouter.post("/otp", sendOtp);


module.exports = { userRouter }