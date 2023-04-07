const express = require('express');
const tourController = require(`../controllers/tourController.js`);
const routes = express.Router();

routes.route('/').get(tourController.getAllTours).post(tourController.createTour);
routes.route('/:id').get(tourController.getSingleTour).patch(tourController.updateTour).delete(tourController.deleteTour);

module.exports = routes;
