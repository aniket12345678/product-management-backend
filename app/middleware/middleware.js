const multer = require("multer");
const path = require('path');

function multerFn(data) {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '..', 'uploads', data));
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname);
        }
    });

    return multer({ storage: storage });
}

module.exports = { multerFn } 