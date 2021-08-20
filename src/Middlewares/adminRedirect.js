

module.exports = function adminRedirect(req, res, next) {
    if(req.session.usuarioLogeado.email) {
      return  next()
    }
    else {
     
        return res.redirect ('/usuarios/inicio');
    }
}