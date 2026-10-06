const express = require('express');
const router = express.Router();
const autorController = require('../controllers/AutorController');
const { autenticarToken, exigirRole } = require('../middlewares/authMiddleware');

// Rota exclusiva ADMIN
router.post('/', autenticarToken, exigirRole('ADMIN'), (req, res) => autorController.criar(req, res));

module.exports = router;