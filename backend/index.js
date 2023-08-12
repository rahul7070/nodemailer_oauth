const express = require("express");
const { connection } = require("./db");
const bodyParser = require("body-parser")
const { userRouter } = require("./routes/user.route");
const googleRouter = require("./controller/googleAuth");

require("dotenv").config()

const app = express();

app.use(bodyParser.json())


app.get("/", (req, res)=>{
    res.send("hello world")
})

app.use(express.json())
app.use("/users", userRouter)
app.use("/google", googleRouter)

app.listen(7900, ()=>{
    try {
        connection
        console.log("connection established")
        console.log(`running on port 7900`)
    } catch (error) {
        console.log(error)
    }
})
