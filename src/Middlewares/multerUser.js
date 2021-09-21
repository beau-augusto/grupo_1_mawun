const multer = require ('multer');
const { dirname } = require('path');
const path = require('path');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = path.join(__dirname, '../../public/upload/profile-pictures/');
        cb(null, folder);

    },
    filename: (req, file, cb) => {
        let newFileName = 'user-' + Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }
});

const uploadUser = multer({ storage });

module.exports = uploadUser