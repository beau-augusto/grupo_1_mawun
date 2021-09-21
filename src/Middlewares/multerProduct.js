const multer = require ('multer');
const { dirname } = require('path');
const path = require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = path.join(__dirname, '../../public/upload/products/')
        cb(null, folder)
    },
    filename: function (req, file, cb) {      
        cb(null, file.originalname);
    }
});

const uploadProduct = multer({ storage });

module.exports = uploadProduct