const jwt = require('jsonwebtoken');
const JWT_SECRET = 'segredo_jwt_super_seguro';

function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ mensagem: 'Token de acesso não fornecido' });
  }

  jwt.verify(token, JWT_SECRET, (err, usuario) => {
    if (err) {
      return res.status(401).json({ mensagem: 'Token inválido ou expirado' });
    }
    req.usuario = usuario;
    next();
  });
}

function autorizarPerfil(...perfisPermitidos) {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(401).json({ mensagem: 'Não autenticado' });
    }

    if (!perfisPermitidos.includes(req.usuario.role)) {
      return res.status(403).json({ mensagem: 'Acesso negado: perfil insuficiente' });
    }

    next();
  };
}

module.exports = {
  autenticarToken,
  autorizarPerfil
};