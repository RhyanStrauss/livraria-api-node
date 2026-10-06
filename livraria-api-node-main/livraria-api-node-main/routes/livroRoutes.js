const express = require('express');
const router = express.Router();
const livroController = require('../controllers/LivroController');
const { autenticarToken, autorizarPerfil } = require('../middlewares/authMiddleware');

// Rotas públicas
router.get('/', (req, res) => livroController.listar(req, res));
router.get('/:id', (req, res) => livroController.buscarPorId(req, res));

// Rotas protegidas
router.post('/:id/comentarios', autenticarToken, autorizarPerfil('USER', 'ADMIN'), (req, res) => livroController.adicionarComentario(req, res));
router.post('/', autenticarToken, autorizarPerfil('ADMIN'), (req, res) => livroController.criar(req, res));

module.exports = router;