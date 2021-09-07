    
module.exports = function adminRedirect(req, res, next) {
if (req.session.usuarioLogeado) {
    console.log("goes")
    switch (req.session.usuarioLogeado.category){
        case "admin":
            res.redirect("../admin/inventario");
        break;
        case "visitor":
            console.log('Lemons are $0.59 a pound.');
            res.redirect("../productos");
        break;
        default: 
          next()
    }

} else {
    next()
}

}