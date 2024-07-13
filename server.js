const exApp = require('express')();
require('dotenv').config();
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const bodyParser = require('body-parser')
const { allRoutes } = require('./app/routes');

exApp.use(cors());
exApp.use(bodyParser.json());
exApp.use(bodyParser.urlencoded({ extended: true }));

exApp.get('/', (req, res) => {
    res.send({ message: 'Welcome to product management' })
});

exApp.use('/api', allRoutes);

exApp.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});