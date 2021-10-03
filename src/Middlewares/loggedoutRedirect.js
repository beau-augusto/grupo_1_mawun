module.exports = function loggedoutRedirect(req, res, next) {

    if(req.session.usuarioLogeado == undefined|| res.locals.usuarioLogeado == undefined) {
      return res.redirect ('/usuarios/inicio');
  
    }
    next()  
}
