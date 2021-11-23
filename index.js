// SETUP BEGINS
const express = require("express");
const cors = require("cors");
const nodemailer = require('nodemailer');

require("dotenv").config();

let app = express();

// !! Enable processing JSON data
app.use(express.json());

// !! Enable CORS
app.use(cors());

// ROUTES
app.post('/sendEmail', async (req, res) => {
    let parentName = req.body.parentName
    let mobile = req.body.mobile
    let email = req.body.email
    let message = req.body.message
    let visit = req.body.visit

    try {
        res.status(200);      
        res.send(parentName);
        console.log(parentName)
        // Set up email
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.USER_PASSWORD,
            }
        });
        // Create email body
        var mailOptions = {
            from: process.env.USER_EMAIL,
            to: process.env.KNK_EMAIL,
            subject: 'TESTING EMAIL KNK 123',
            text: `
            That was easy!
            Name : ${parentName}
            Email : ${email}
            Contact : ${mobile}
            Message : ${message}
            Remarks : ${visit}
            `
        };
        // Send it
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    } 
    catch(e) {
        res.status(500);
        res.send({
            error: "Internal server error. Please contact administrator"
        });
        console.log(e)
    }
})

// START SERVER
app.listen(
    process.env.PORT , () => { 
        console.log("Server has started"); 
    }
);