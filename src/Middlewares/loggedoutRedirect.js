module.exports = function loggedoutRedirect(req, res, next) {

    if(req.session.usuarioLogeado == undefined|| res.locals.user == undefined) {
      return res.redirect ('/usuarios/inicio');
  
    }
    next()  
}
