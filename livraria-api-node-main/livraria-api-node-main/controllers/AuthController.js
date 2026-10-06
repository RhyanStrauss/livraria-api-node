const authService = require('../services/AuthService');

class AuthController {
  async register(req, res) {
    try {
      const usuario = await authService.registrar(req.body);
      return res.status(201).json(usuario);
    } catch (error) {
      const status = error.status || 400;
      return res.status(status).json({ erro: error.message || error.erro });
    }
  }

  async login(req, res) {
    try {
      const resultado = await authService.login(req.body);
      return res.status(200).json(resultado);
    } catch (error) {
      const status = error.status || 401;
      return res.status(status).json({ erro: error.message || error.erro });
    }
  }
}

module.exports = new AuthController();