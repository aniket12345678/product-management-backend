const exApp = require('express')();
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser')
const { allRoutes } = require('./app/routes');

exApp.use(cors());
exApp.use(bodyParser.json());
exApp.use(bodyParser.urlencoded({ extended: true }));

exApp.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`);
});

exApp.get('/', (req, res) => {
    res.send({ message: 'Welcome to product management' })
});

exApp.use('/api', allRoutes);