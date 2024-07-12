const { productModel } = require("../models/product.model");

const add = (req, res) => {
    console.log('this is an add function');
    console.log('req.body:- ', req.body);
}

const update = (req, res) => {
    console.log('this is an update function');
    console.log('req.body:- ', req.body);
}

const findOne = (req, res) => {
    console.log('this is an findone function');
    console.log('req.body:- ', req.body);
}

const findAll = (req, res) => {
    console.log('this is an findAll function');
    console.log('req.body:- ', req.body);
}

module.exports = { add, update, findOne, findAll };