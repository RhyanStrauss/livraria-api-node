const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Registrar um novo usuário
 *     description: Permite o cadastro de novos usuários com os perfis USER ou ADMIN.
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 example: leitor@gmail.com
 *               senha:
 *                 type: string
 *                 example: leitor123
 *               role:
 *                 type: string
 *                 enum: [USER, ADMIN]
 *                 example: USER
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso.
 *       400:
 *         description: Campos obrigatórios ausentes.
 *       409:
 *         description: E-mail já cadastrado no sistema.
 */
router.post('/register', (req, res) => authController.register(req, res));

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Autenticação de usuário (Login)
 *     description: Valida as credenciais do usuário e retorna um token JWT de acesso.
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@livraria.com
 *               senha:
 *                 type: string
 *                 example: admin123
 *     responses:
 *       200:
 *         description: Autenticação realizada com sucesso. Retorna o token JWT.
 *       400:
 *         description: E-mail e senha são obrigatórios.
 *       401:
 *         description: Credenciais inválidas.
 */
router.post('/login', (req, res) => authController.login(req, res));

module.exports = router;