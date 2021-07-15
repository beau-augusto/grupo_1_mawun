const express = require('express');
const router = express.Router();
const multer = require ('multer');

const usersController = require('../controllers/users-controller');

router.get('/registro', usersController.register);
router.get('/inicio', usersController.login); 

module.exports = router;