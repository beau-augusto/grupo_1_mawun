const path = require('path');
const fs = require('fs');
const usersFilePath = path.join(__dirname, '../data/usersDataBase.json'); // Ruta donde se encuentra la DB de Users
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8')); // Cambio el formato Json a un array de usuarios
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


module.exports = function adminRedirect(req, res, next) {

    if(req.cookies.recordame != undefined && req.session.usuarioLogeado == undefined) {
        console.log("cookie middleware")
        let findUsername = users.find(user => user.email == req.cookies.recordame);
        req.session.usuarioLogeado = findUsername;
        next();
    }
    else {
      return  next();
    }
}