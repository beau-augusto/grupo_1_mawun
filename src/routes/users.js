const express = require('express');
const router = express.Router();
const validateLogin = require("../middlewares/validateLogin.js")
const usersController = require('../controllers/users-controller');
const multer  = require('multer')
const upload = multer()






router.get('/registro', usersController.create);
router.post('/', usersController.store);
router.get('/inicio', usersController.login); 
router.post('/inicio', validateLogin, usersController.submitLogin)



module.exports = router;