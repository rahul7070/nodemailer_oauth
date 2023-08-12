
const nodemailer = require("nodemailer")
const {google} = require("googleapis");

const CLIENT_ID = '881277140836-p3ac8f6u1vm8qesi00l6v7sr461rb43t.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const redirect_URI = "https://developers.google.com/oauthplayground";
const refresh_token = "1//044efiQPZrimDCgYIARAAGAQSNwF-L9IrEIYZvc6t2nvdyJ-MXgIisMRLjzn0tvoo-oioQUyLs34UpebTQma2KwqmEwm6jTwy5LE"

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, redirect_URI)
oauth2Client.setCredentials({refresh_token: refresh_token})


function generateOtp(){
    return Math.floor(100000 + Math.random()*900000)
}

const sendOtp = async (req, res)=>{
    let otp = generateOtp()

    const accesstoken = await oauth2Client.getAccessToken()

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            type: 'OAuth2',
            user : 'rahulraman541@gmail.com',
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: refresh_token,
            accessToken: accesstoken
        },
    })

    transporter.sendMail({
        from: 'rahulraman541 👻 <rahulraman541@gmail.com>',
        to: "rahulraman62050@gmail.com",
        subject : "OTP for account verification",
        text: `Welcome your OTP is ${otp}`
    }, (error, info)=>{
        if(!error){
            res.send('Email sent successfully')
        }else{
            res.send(`Error in sending mail ${info}`)
        }
    });
}




module.exports = sendOtp