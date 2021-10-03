    
module.exports = function adminRedirect(req, res, next) {
if (req.session.usuarioLogeado) {
    switch (req.session.usuarioLogeado.role_id){
        case "1":
            res.redirect("../admin/dashboard");
        break;
        case "2":
            res.redirect("../productos");
        break;
        default: 
          next()
    }

} else {
    next()
}

}