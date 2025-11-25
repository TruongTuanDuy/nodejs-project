const transporter = require("../app/init_mailer");
// Wrap in an async IIFE so we can use await.
sendMail = async (email, subject, text) => {
    const info = await transporter.sendMail({
        from: 'Admin Duy',
        to: email,
        subject: subject,
        text: text, // plain‑text body
        // html: "<b>Hello world?</b>", // HTML body
    });

    // console.log("Message sent:", info.messageId);
};
module.exports = { sendMail };