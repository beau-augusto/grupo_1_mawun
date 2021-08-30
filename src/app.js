//***** Requeridos *****//
const express = require('express');
const path = require('path');
const methodOverride =  require('method-override'); // Para poder usar los métodos PUT y DELETE

const expressSession = require('express-session') // Para poder usar los Session
const createError = require('http-errors');
const cookieLogeado = require('./Middlewares/cookieLogeado'); // Para mantenerte logeado si tenés el cookie

//***** Express *****//
const app = express();

//***** Template Engine *****//
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views')); // Define la ubicación de la carpeta de las Vistas


//***** Middlewares *****//
app.use(express.static(path.join(__dirname, '../public'))); // Necesario para los archivos estáticos en el folder /public
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE

//***** Session *****//
app.use(expressSession({  
  secret: "secreta",
  saveUninitialized: false,
  resave: false
}));
app.use(function(req, res, next) { // middleware para usar los datos de user en todas las vistas
  res.locals.user = req.session.usuarioLogeado;
  next();
});

//***** Cookies *****//
var cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(cookieLogeado);

//***** Route System  *****//
const mainRouter = require('./routes/main'); // Rutas main
const usersRouter = require('./routes/users'); // Rutas /usuarios
const productsRouter = require('./routes/products'); // Rutas /products
const adminRouter = require ('./routes/admin'); // Rutas Admin Back Office


const adminRedirect = require('./Middlewares/adminRedirect'); // El middleware asegurar de que estés logeado en las rutas admin
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