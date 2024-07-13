const { DataTypes } = require("sequelize");
const { newConnection } = require("../config/connection");

const productModel = newConnection.define('db_product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    product: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.STRING,
        allowNull: false
    },
    attachments: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    creation_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
});


productModel.sync().then((result) => {
    // console.log('productModel created successfully');
}).catch((err) => {
    console.log(err);
});

module.exports = { productModel }