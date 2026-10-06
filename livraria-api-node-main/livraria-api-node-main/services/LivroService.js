const repository = require('../repositories/LivrariaRepository');

class LivroService {
  listar() {
    return repository.listarLivros();
  }

  buscarPorId(id) {
    return repository.buscarLivroPorId(id);
  }

  criar({ titulo, ano, autorId }) {
    if (!titulo || !autorId) {
      throw { status: 400, message: "Título e ID do autor são obrigatórios." };
    }
    return repository.criarLivro({ titulo, ano, autorId });
  }

  adicionarComentario(livroId, { usuario, texto }) {
    if (!texto) {
      throw { status: 400, message: "O texto do comentário é obrigatório." };
    }
    return repository.adicionarComentario(livroId, { usuario, texto });
  }
}

module.exports = new LivroService();