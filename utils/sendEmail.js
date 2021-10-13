require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey("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");

const sendEmail = (to, from, subject, text) => {
const msg = {
    to,
    from,
    subject,
    html: text,
};

sgMail.send(msg, function (err, result) {
    if (err) {
    console.log("Correo Electrónico no enviado");
    } else {
    console.log("Correo Electrónico enviado");
    }
});
};

module.exports = sendEmail;