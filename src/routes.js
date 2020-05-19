const express = require('express');

const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');
const CarController = require('./app/controllers/CarController');
const RentController = require('./app/controllers/RentController');
const GiveBackController = require('./app/controllers/GiveBackController');
const ListRentController = require('./app/controllers/ListRentController');

const routes = express.Router();

routes.post('/users', UserController.store);
routes.get('/users', UserController.index);
routes.post('/sessions', SessionController.store);
routes.get('/cars', CarController.index);
routes.post('/cars', CarController.store);
routes.post('/rent', RentController.store);
routes.get('/rent', ListRentController.index);
routes.post('/giveback', GiveBackController.store);

module.exports = routes;