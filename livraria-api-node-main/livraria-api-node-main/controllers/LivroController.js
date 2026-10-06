const livroService = require('../services/LivroService');

class LivroController {
  listar(req, res) {
    try {
      const livros = livroService.listar();
      return res.status(200).json(livros);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  }

  buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const livro = livroService.buscarPorId(id);
      if (!livro) {
        return res.status(404).json({ erro: 'Livro não encontrado' });
      }
      return res.status(200).json(livro);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  }

  criar(req, res) {
    try {
      const novoLivro = livroService.criar(req.body);
      return res.status(201).json(novoLivro);
    } catch (error) {
      const status = error.status || 400;
      return res.status(status).json({ erro: error.message || error.erro });
    }
  }

  adicionarComentario(req, res) {
    try {
      const { id } = req.params;
      const { texto } = req.body;
      const usuarioNome = req.usuario ? req.usuario.nome : 'Anônimo';

      const livroAtualizado = livroService.adicionarComentario(id, {
        usuario: usuarioNome,
        texto
      });

      return res.status(200).json(livroAtualizado);
    } catch (error) {
      const status = error.status || 400;
      return res.status(status).json({ erro: error.message || error.erro });
    }
  }
}

// ATENÇÃO: Exportar uma instância com 'new'
module.exports = new LivroController();