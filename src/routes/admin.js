const express = require('express');
const router = express.Router();
const multer = require ('multer');

const adminController = require('../controllers/admin-controller');

router.get('/crear', adminController.create);
router.post('/', adminController.store);


router.get('/editar', adminController.edit);
router.post('/', adminController.update);

module.exports = router;