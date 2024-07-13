const productRoute = require('express')();

const { multerFn } = require('../middleware/middleware');
const upload = multerFn('product');

const {
    add, update, findOne, findAll,
    deleteProduct, fetchProductImage
} = require('../controllers/product.controller');

productRoute.post('/add', upload.single('attachments'), add);
productRoute.post('/update', upload.single('attachments'), update);
productRoute.post('/find/one', findOne);
productRoute.post('/find/all', findAll);
productRoute.get('/img/:id', fetchProductImage);
productRoute.post('/delete', deleteProduct);

module.exports = { productRoute };