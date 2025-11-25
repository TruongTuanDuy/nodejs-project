const nodemailer = require("nodemailer");

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
    // gmail
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    // true for 465, false for other ports
    auth: {
        user: "tuanduy.truong@gmail.com",
        pass: "tzjw oolu xchl jbri",
    },
});

module.exports = transporter;