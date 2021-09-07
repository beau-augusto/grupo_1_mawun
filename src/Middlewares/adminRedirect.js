

module.exports = function adminRedirect(req, res, next) {
  
    if(req.session.usuarioLogeado == undefined) {

      return res.redirect ('/usuarios/inicio');
  
    }
    if(req.session.usuarioLogeado.category == "visitor") {

      return res.redirect ('/productos');
  
    }
    else {
  
      next()

    }
}