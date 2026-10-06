const authService = require('../services/AuthService');

class AuthController {
  async register(req, res) {
    try {
      const { nome, email, senha } = req.body;
      const usuario = await authService.register(nome, email, senha);
      return res.status(201).json(usuario);
    } catch (error) {
      return res.status(400).json({ mensagem: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, senha } = req.body;
      const resultado = await authService.login(email, senha);
      return res.status(200).json(resultado);
    } catch (error) {
      return res.status(401).json({ mensagem: error.message });
    }
  }
}

module.exports = new AuthController();