require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey('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');


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