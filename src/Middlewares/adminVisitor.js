    
module.exports = function adminRedirect(req, res, next) {
if (req.session.usuarioLogeado) {
    switch (req.session.usuarioLogeado.role){
        case "admin":
            res.redirect("../admin/inventario-productos");
        break;
        case "visitor":
            res.redirect("../productos");
        break;
        default: 
          next()
    }

} else {
    next()
}

}