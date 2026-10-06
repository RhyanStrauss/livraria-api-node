const repository = require('../repositories/LivrariaRepository');

class AutorController {
  criar(req, res) {
    try {
      const { nome, nacionalidade } = req.body;

      if (!nome) {
        return res.status(400).json({ mensagem: 'O campo nome é obrigatório' });
      }

      const novoAutor = repository.criarAutor({ nome, nacionalidade });
      return res.status(201).json(novoAutor);
    } catch (error) {
      return res.status(500).json({ mensagem: error.message });
    }
  }

  listar(req, res) {
    try {
      const autores = repository.listarAutores();
      return res.status(200).json(autores);
    } catch (error) {
      return res.status(500).json({ mensagem: error.message });
    }
  }
}

module.exports = new AutorController();