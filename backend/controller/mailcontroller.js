const nodemailer = require('nodemailer');

const sendMail = async (req, res) => {

    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'brenden13@ethereal.email',
            pass: 'NFtpTHjHNdSAKtj22x'
        }
    });

    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "rahulraman541@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      }, (err, info)=>{
        if(err){
            res.json({err})
        }else{
            res.json({"msg":"sent success"})
        }
      });

    // console.log(info.messageId);
    // res.json(info)
};

module.exports = sendMail

