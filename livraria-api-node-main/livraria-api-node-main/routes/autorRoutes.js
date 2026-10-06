const express = require('express');
const router = express.Router();
const autorController = require('../controllers/AutorController');
const { autenticarToken, autorizarPerfil } = require('../middlewares/authMiddleware');

// Exclusivo ADMIN
router.post('/', autenticarToken, autorizarPerfil('ADMIN'), autorController.criar);

module.exports = router;