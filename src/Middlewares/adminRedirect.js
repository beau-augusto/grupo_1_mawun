

module.exports = function adminRedirect(req, res, next) {
  console.log(req.session.usuarioLogeado)
    if(req.session.usuarioLogeado == undefined) {

      return res.redirect ('/usuarios/inicio');
  
    }
    else {
      console.log("adminRedirect")
      next()

    }
}