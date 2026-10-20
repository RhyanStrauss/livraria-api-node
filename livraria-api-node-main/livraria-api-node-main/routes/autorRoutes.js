const express = require('express');
const router = express.Router();
const autorController = require('../controllers/AutorController');
const { autenticarToken, exigirRole } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /api/v1/autores:
 *   post:
 *     summary: Cadastrar um novo autor
 *     description: Rota exclusiva para usuários com perfil ADMIN.
 *     tags: [Autores]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Machado de Assis
 *               nacionalidade:
 *                 type: string
 *                 example: Brasileira
 *     responses:
 *       201:
 *         description: Autor cadastrado com sucesso.
 *       400:
 *         description: O campo nome é obrigatório.
 *       401:
 *         description: Não autorizado (token ausente ou inválido).
 *       403:
 *         description: Acesso proibido (requer perfil ADMIN).
 */
router.post('/', autenticarToken, exigirRole('ADMIN'), (req, res) => autorController.criar(req, res));

module.exports = router;