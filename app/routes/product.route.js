const productRoute = require('express')();

const { add, update, findOne, findAll } = require('../controllers/product.controller');
const { multerFn } = require('../middleware/middleware');

const upload = multerFn('category');

productRoute.post('/add', upload.single('attachments'), add);
productRoute.post('/update', upload.single('attachments'), update);
productRoute.post('/find/one', findOne);
productRoute.post('/find/all', findAll);

module.exports = { productRoute };