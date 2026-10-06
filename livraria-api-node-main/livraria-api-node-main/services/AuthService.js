const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const repository = require('../repositories/LivrariaRepository');

const JWT_SECRET = 'segredo_jwt_super_seguro';

class AuthService {
  async register(nome, email, senha) {
    const usuarioExiste = repository.buscarUsuarioPorEmail(email);
    if (usuarioExiste) {
      throw new Error('E-mail já cadastrado');
    }

    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    const novoUsuario = repository.criarUsuario({
      nome,
      email,
      senha: senhaHash
    });

    const { senha: _, ...usuarioSemSenha } = novoUsuario;
    return usuarioSemSenha;
  }

  async login(email, senha) {
    const usuario = repository.buscarUsuarioPorEmail(email);
    if (!usuario) {
      throw new Error('Credenciais inválidas');
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      throw new Error('Credenciais inválidas');
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, role: usuario.role, nome: usuario.nome },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return { token };
  }
}

module.exports = new AuthService();