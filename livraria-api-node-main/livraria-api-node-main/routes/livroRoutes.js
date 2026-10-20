const express = require('express');
const router = express.Router();
const livroController = require('../controllers/LivroController');
const { autenticarToken, exigirRole } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /api/v1/livros:
 *   get:
 *     summary: Listar todos os livros
 *     description: Rota pública para consultar o catálogo completo de livros.
 *     tags: [Livros]
 *     responses:
 *       200:
 *         description: Lista de livros retornada com sucesso.
 *       500:
 *         description: Erro interno do servidor.
 */
router.get('/', (req, res) => livroController.listar(req, res));

/**
 * @swagger
 * /api/v1/livros/{id}:
 *   get:
 *     summary: Buscar livro por ID
 *     description: Rota pública para buscar os detalhes de um livro específico.
 *     tags: [Livros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do livro
 *     responses:
 *       200:
 *         description: Detalhes do livro retornados.
 *       404:
 *         description: Livro não encontrado.
 */
router.get('/:id', (req, res) => livroController.buscarPorId(req, res));

/**
 * @swagger
 * /api/v1/livros/{id}/comentarios:
 *   post:
 *     summary: Adicionar comentário a um livro
 *     description: Requer autenticação (Perfil USER ou ADMIN).
 *     tags: [Livros]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do livro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - texto
 *             properties:
 *               texto:
 *                 type: string
 *                 example: Excelente obra, recomendo a leitura!
 *     responses:
 *       201:
 *         description: Comentário adicionado com sucesso.
 *       400:
 *         description: Texto do comentário é obrigatório.
 *       401:
 *         description: Não autorizado (token ausente ou inválido).
 *       404:
 *         description: Livro não encontrado.
 */
router.post('/:id/comentarios', autenticarToken, (req, res) => livroController.adicionarComentario(req, res));

/**
 * @swagger
 * /api/v1/livros:
 *   post:
 *     summary: Cadastrar um novo livro
 *     description: Rota exclusiva para usuários com perfil ADMIN.
 *     tags: [Livros]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - autorId
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: Dom Casmurro
 *               ano:
 *                 type: integer
 *                 example: 1899
 *               autorId:
 *                 type: string
 *                 example: "1"
 *     responses:
 *       201:
 *         description: Livro cadastrado com sucesso.
 *       400:
 *         description: Título e autorId são obrigatórios.
 *       401:
 *         description: Não autorizado (token ausente ou inválido).
 *       403:
 *         description: Acesso proibido (requer perfil ADMIN).
 */
router.post('/', autenticarToken, exigirRole('ADMIN'), (req, res) => livroController.criar(req, res));

module.exports = router;