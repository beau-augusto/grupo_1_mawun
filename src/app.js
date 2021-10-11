require('dotenv').config()
//***** Requeridos *****//
const express = require('express');
const path = require('path');
const methodOverride =  require('method-override'); // Para poder usar los métodos PUT y DELETE

const expressSession = require('express-session') // Para poder usar los Session
const createError = require('http-errors');

//***** Express *****//
const app = express();

//****Sengrid API ****//
const sendEmail = require ('../utils/sendEmail');

//***** Template Engine *****//
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views')); // Define la ubicación de la carpeta de las Vistas


//***** Middlewares *****//
app.use(express.static(path.join(__dirname, '../public'))); // Necesario para los archivos estáticos en el folder /public
app.use(express.urlencoded({ extended: false })); //Capturar informacion que se envia desde un formulario via post en lo que vendria siendo req.body
app.use(express.json());
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE

app.get('/contacto', (req, res) => {
  res.render('contact')
});

app.get('/sent', (req, res) => {
  res.render('sent')
});

app.post('/sendemail', (req, res) => {
  const { name, email, asunto, consulta } = req.body;
  
  const from = "mawuncompany@gmail.com";
  const to = "miguel_ed_sand@hotmail.com";
  const subject = "Nueva solicitud de contacto";


  const output = `
  <p>Tienes una nueva solicitud de contacto</p>
  <h3>Detalles de Contacto</h3>
  <ul>
    <li>name: $(name)</li>
    <li>name: $(email)</li>
    <li>name: $(asunto)</li>
    <li>name: $(consulta)</li>
  </ul>`;

  sendEmail(from, to, subject, output);
  res.redirect('/sent');
});

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