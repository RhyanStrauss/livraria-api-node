const express = require('express');
const router = express.Router();
const livroController = require('../controllers/LivroController');
const { autenticarToken, autorizarPerfil } = require('../middlewares/authMiddleware');

// Públicos
router.get('/', livroController.listar);
router.get('/:id', livroController.buscarPorId);

// Autenticado (USER ou ADMIN)
router.post('/:id/comentarios', autenticarToken, autorizarPerfil('USER', 'ADMIN'), livroController.adicionarComentario);

// Exclusivo ADMIN
router.post('/', autenticarToken, autorizarPerfil('ADMIN'), livroController.criar);

module.exports = router;