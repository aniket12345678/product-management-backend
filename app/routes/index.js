const { productRoute } = require('./product.route');
const allRoutes = require('express')();
allRoutes.use('/product', productRoute);
module.exports = { allRoutes }