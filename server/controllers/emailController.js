const emailController = require('express').Router();
const { text } = require('express');
const { hasUser } = require('../middlewares/guards');
const nodemailer = require('nodemailer');
const {userEmail, passwordEmail} = require('../config/email.json')

emailController.post('/', (req, res) => {
const nameSender = req.body.data.name
const subjectSender = req.body.data.subject
const phoneNumberSender = req.body.data.phoneNumber
const emailSender = req.body.data.email
const messageSender = req.body.data.message

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: userEmail, // Your Gmail address
          pass: passwordEmail     // App password if using 2-Step Verification or Gmail password if not
        }
      });
      
    //   Define email options
      const mailOptions = {
        name: nameSender,
        from: emailSender,
        to: 'd_i_m_o@yahoo.com',
        subject: subjectSender,
        text: messageSender,
        phoneNumber: phoneNumberSender
      };
      
      // Send the email
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          return console.log('Error: ', err);
        }
        console.log('Email sent: ' + info.response);
      });
});

module.exports = emailController;