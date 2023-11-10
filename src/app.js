require('dotenv').config()
//***** Requeridos *****//
const express = require('express');
const path = require('path');
const methodOverride =  require('method-override'); // Para poder usar los métodos PUT y DELETE
const nodemailer = require('nodemailer');

const expressSession = require('express-session') // Para poder usar los Session
const createError = require('http-errors');

//***** Jquery and Jsdom *****//

var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
const $ = require('jquery')(window);


//***** Express *****//
const app = express();

//****Sengrid API ****//


//***** Template Engine *****//
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views')); // Define la ubicación de la carpeta de las Vistas


//***** Middlewares *****//
app.use(express.static(path.join(__dirname, '../public'))); // Necesario para los archivos estáticos en el folder /public
app.use(express.urlencoded({ extended: false })); //Capturar informacion que se envia desde un formulario via post en lo que vendria siendo req.body
app.use(express.json());
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE


//***** Session *****//
app.use(expressSession({  
  secret: "secreta",
  saveUninitialized: false,
  resave: false
}));

//***** Cookies *****//
var cookieParser = require('cookie-parser');
app.use(cookieParser());




//***** Route System  *****//
const mainRouter = require('./routes/main'); // Rutas main
const usersRouter = require('./routes/users'); // Rutas /usuarios
const productsRouter = require('./routes/products'); // Rutas /products
const adminRouter = require ('./routes/admin'); // Rutas Admin Back Office

app.use(function(req, res, next) { // middleware para usar los datos de user en todas las vistas
  res.locals.usuarioLogeado = req.session.usuarioLogeado;
  next();
});

const adminRedirect = require('./Middlewares/adminRedirect'); // El middleware asegurar de que estés logeado en las rutas admin
const { closeSync } = require('fs');
app.use ('/', mainRouter);
app.use ('/usuarios', usersRouter);
app.use ('/productos', productsRouter);
app.use ('/admin', adminRedirect, adminRouter); // Primer chequea si hay una cookie, luego si no te redirecciona al login.

//***** APIs *****//
const loggedoutRedirect = require("./middlewares/loggedoutRedirect.js");
const apiOrdersRouter = require('./routes/apis/apis')
app.use('/api', loggedoutRedirect, apiOrdersRouter)

//***** Node Mailer ******//
app.post('/sendemail', (req, res) => {
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    post: 587, // 465
    secure: false, //true
    auth: {
        user: 'mawunvinos@gmail.com',
        pass: 'mqzw ohsv axsb ppjp'
    }
});

let mailOptions = {
    from: 'mawunvinos@gmail.com',
    to: 'mawunvinos@gmail.com',
    subject: req.body.asunto ,
    //text: req.body.consulta ,
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
        <table style="border: 1px solid #55394a; padding: 20px;width: 80%;">
            <thead>
                <tr>
                    <td style="text-align: left; background: #faeeed; padding: 15px 0px 15px 20px;" colspan="2">
                        <img src="https://clipit.com.ar/mawun/logo-mawun.png" height="100%" alt="MAWUN">
                    </td>
                </tr>
                <tr>
                    <td style="text-align: left; padding: 20px 0px 5px 0px; width: 35%;">
                        <span style="font-size: 13px; font-weight: bold;">Asunto:</span>
                    </td>
                    <td style="text-align: left;padding: 5px 0px 5px 0px; width: 65%;">
                        <span style="font-size: 13px;">${req.body.asunto}</span>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: left; padding: 20px 0px 5px 0px; width: 35%;">
                        <span style="font-size: 13px; font-weight: bold;">Nombre Completo:</span>
                    </td>
                    <td style="text-align: left;padding: 5px 0px 5px 0px; width: 65%;">
                        <span style="font-size: 13px;">${req.body.name}</span>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: left; padding: 5px 0px 5px 0px;">
                        <span style="font-size: 13px; font-weight: bold;">Email:</span>
                    </td>
                    <td style="text-align: left;padding: 5px 0px 5px 0px;">
                        <span style="font-size: 13px;">${req.body.email}</span>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: left; padding: 5px 0px 5px 0px;">
                        <span style="font-size: 13px; font-weight: bold;">Consulta</span>
                    </td>
                    <td style="text-align: left;padding: 5px 0px 5px 0px;">
                        <span style="font-size: 13px;">${req.body.consulta}</span>
                    </td>
                </tr>
                
            </thead>
        </table>
    </body>
    </html>`,
};

transporter.sendMail(mailOptions, (error, info) => {
    if(error) {
        res.status(500).send(error.message);
    } else {
        console.log('Email enviado.');
            res.render("utils/sent");
        }
    });
});

// ************ catch 404 and forward to error handler ************
app.use((req, res, next) => next(createError(404)));

// ************ error handler ************
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.path = req.path;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


//***** Exports app *****//
module.exports = app; // Para poder usar nodemon bin/www 