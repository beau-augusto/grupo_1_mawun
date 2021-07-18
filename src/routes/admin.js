const express = require('express');
const router = express.Router();
const multer = require ('multer');

const adminController = require('../controllers/admin-controller');

/*** CREAR UN PRODUCTO ***/
router.get('/crear', adminController.create);
router.post('/', adminController.store);

/*** EDITAR UN PRODUCTO ***/
router.get('/:id/editar', adminController.edit);
router.put('/:id', adminController.update);

module.exports = router;