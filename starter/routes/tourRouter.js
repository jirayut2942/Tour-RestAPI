const express = require('express');
const tourController = require('./../controllers/tourController')

const router = express.Router();

// router.param('id', tourController.checkID);

router
    .route('/')
    .get(tourController.GetAllTours)
    .post(tourController.checkBody, tourController.CreateNewTours);


router
    .route('/:id')
    .get(tourController.GetTours)
    .patch(tourController.UpdateTours)
    .delete(tourController.DeleteTours);

module.exports = router;
