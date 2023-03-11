const express = require('express');
const toursHandler = require(`../handlers/tours.js`);
const routes = express.Router();

//MIDDLEWARES
routes.param('id', toursHandler.checkTourId);
routes.post('*', toursHandler.checkPostReq);

routes.route('/').get(toursHandler.getAllTours).post(toursHandler.createTour);
routes.route('/:id').get(toursHandler.getSingleTour).patch(toursHandler.updateTour).delete(toursHandler.deleteTour);

module.exports = routes;

