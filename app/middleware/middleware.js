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

const operationHandler = {
    handleSuccess: (res, data, message) => {
        return res.status(200).send({
            message: message,
            data: data,
            code: 200
        });
    },
    handleError: (res, message, error) => {
        console.log(message, error);
        return res.status(500).send({
            message: message,
            code: 500
        });
    }
}

module.exports = { multerFn, operationHandler }