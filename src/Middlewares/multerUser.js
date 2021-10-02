const multer = require('multer');
const { dirname } = require('path');
const path = require('path');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = path.join(__dirname, '../../public/upload/profile-pictures/');
        cb(null, folder);

    },
    filename: (req, file, cb) => {
        var today = new Date();
        var sec = String(today.getSeconds()).padStart(2, '0');
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = `${sec}-${mm}${dd}${yyyy}`;
        let newFileName = `${req.body.first_name}-${today}${path.extname(file.originalname)}`;
        cb(null, newFileName);
    }
});

const uploadUser = multer({ storage });

module.exports = uploadUser