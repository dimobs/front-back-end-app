const emailController = require('express').Router();
const {hasUser} = require('../middlewares/guards');
const nodemailer = require('nodemailer');

emailController.post('/', (req, res) => {
    try {

    }catch (err) {
        console.log(err.message);
        
    }
});

module.exports = emailController;