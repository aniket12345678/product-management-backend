const { Sequelize } = require('sequelize');

const newConnection = new Sequelize('product_management', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    define: {
        freezeTableName: true
    }
});

newConnection.authenticate().then(() => {
    console.log('successfull connection');
}).catch((err) => {
    console.log(err);
});

module.exports = { newConnection }