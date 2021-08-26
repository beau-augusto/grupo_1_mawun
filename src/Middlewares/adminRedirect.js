

module.exports = function adminRedirect(req, res, next) {
    if(req.session.usuarioLogeado == null) {

      return res.redirect ('/usuarios/inicio');
       
    }
    else {
      next()

    }
}