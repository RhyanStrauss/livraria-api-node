const express = require('express');
const router = express.Router();
const autorController = require('../controllers/AutorController');
const { autenticarToken, autorizarPerfil } = require('../middlewares/authMiddleware');

// Rota exclusiva ADMIN
router.post('/', autenticarToken, autorizarPerfil('ADMIN'), (req, res) => autorController.criar(req, res));

module.exports = router;