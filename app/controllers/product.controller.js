const { productModel } = require("../models/product.model");
const path = require('path');

const add = async (req, res) => {
    try {
        const store = JSON.parse(req.body.data);
        store.attachments = req.file.filename;
        await productModel.create(store);
        return res.status(200).send({
            message: 'product added successfully',
            code: 200
        });
    } catch (error) {
        console.log('product add error:- ', error);
        return res.status(500).send({
            message: 'product add error',
            code: 500
        });
    }
}

const update = async (req, res) => {
    try {
        const store = JSON.parse(req.body.data);
        if (req.file) {
            store.attachments = req.file.filename
        }
        await productModel.update(store, { where: { id: store.id } });
        return res.status(200).send({
            message: 'product updated successfully',
            code: 200
        });
    } catch (error) {
        console.log('product add error:- ', error);
        return res.status(500).send({
            message: 'product update error',
            code: 500
        });
    }
}

const findOne = async (req, res) => {
    try {
        const fetchSingleProduct = await productModel.findByPk(req.body.id);
        return res.status(200).send({
            message: 'product fetched successfully',
            data: fetchSingleProduct,
            code: 200
        });
    } catch (error) {
        console.log('product findOne error:- ', error);
        return res.status(500).send({
            message: 'product findOne error',
            code: 500
        });
    }
}

const findAll = async (req, res) => {
    try {
        const data = await productModel.findAll();
        return res.status(200).send({
            message: 'product added successfully',
            data: data,
            code: 200
        });
    } catch (error) {
        console.log('product findAll error:- ', error);
        return res.status(500).send({
            message: 'product findAll error',
            code: 500
        });
    }
}

const deleteProduct = async (req, res) => {
    try {
        await productModel.destroy({ where: { id: req.body.id }, force: true });
        return res.status(200).send({
            message: 'product deleted successfully',
            code: 200
        });
    } catch (error) {
        console.log('error:- ', error);
    }
}

const fetchProductImage = async (req, res) => {
    try {
        const data = await productModel.findByPk(req.params.id);
        const pathName = path.join(__dirname, '..', 'uploads', 'product', data.attachments);
        return res.sendFile(pathName);
    } catch (error) {
        console.log('fetchCategoryImage error:- ', error);
    }
};

module.exports = { add, update, findOne, findAll, deleteProduct, fetchProductImage };