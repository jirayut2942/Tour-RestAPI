const express = require('express');
const userController = require('./../controllers/userController')
const router = express.Router();

router
    .route('/')
    .get(userController.GetAllUsers)
    .post(userController.CreateNewUsers);


router
    .route('/:id')
    .get(userController.GetUsers)
    .patch(userController.UpdateUsers)
    .delete(userController.DeleteUsers);

module.exports = router;