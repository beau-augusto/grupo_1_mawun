module.exports = function loggedoutRedirect(req, res, next) {

    if(req.session.usuarioLogeado == undefined|| res.locals.usuarioLogeado == undefined) {
      req.session.redirect = req.url // guardo la ultima pagina por session para redirectionarte a dicha pagina al logearte

      return res.redirect ('/usuarios/inicio');
    
  
    }
    next()  
}
