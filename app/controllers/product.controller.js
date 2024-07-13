const { operationHandler } = require("../middleware/middleware");
const { productModel } = require("../models/product.model");
const path = require('path');

const add = async (req, res) => {
    try {
        const store = JSON.parse(req.body.data);
        store.attachments = req.file.filename;
        await productModel.create(store);
        operationHandler.handleSuccess(res, null, 'product added successfully');
    } catch (error) {
        operationHandler.handleError(res, 'product add error', error);
    }
}

const update = async (req, res) => {
    try {
        const store = JSON.parse(req.body.data);
        if (req.file) {
            store.attachments = req.file.filename
        }
        await productModel.update(store, { where: { id: store.id } });
        operationHandler.handleSuccess(res, null, 'product updated successfully');
    } catch (error) {
        operationHandler.handleError(res, 'product update error', error);
    }
}

const findAll = async (req, res) => {
    try {
        const data = await productModel.findAll();
        operationHandler.handleSuccess(res, data, 'products fetched successfully');
    } catch (error) {
        operationHandler.handleError(res, 'product findAll error', error);
    }
}

const deleteProduct = async (req, res) => {
    try {
        await productModel.destroy({ where: { id: req.body.id }, force: true });
        operationHandler.handleSuccess(res, null, 'product deleted successfully');
    } catch (error) {
        operationHandler.handleError(res, 'product delete error', error);
    }
}

const fetchProductImage = async (req, res) => {
    try {
        const data = await productModel.findByPk(req.params.id);
        const pathName = path.join(__dirname, '..', 'uploads', 'product', data.attachments);
        return res.sendFile(pathName);
    } catch (error) {
        operationHandler.handleError(res, 'product fetch image error', error);
    }
};

module.exports = { add, update, findAll, deleteProduct, fetchProductImage };