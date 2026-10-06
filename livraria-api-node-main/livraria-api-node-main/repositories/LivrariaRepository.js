const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../database.json');

class LivrariaRepository {
  _lerBanco() {
    try {
      const data = fs.readFileSync(dbPath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return { usuarios: [], livros: [], autores: [] };
    }
  }

  _salvarBanco(dados) {
    fs.writeFileSync(dbPath, JSON.stringify(dados, null, 2));
  }

  listarLivros() {
    const db = this._lerBanco();
    return db.livros || [];
  }

  buscarLivroPorId(id) {
    const db = this._lerBanco();
    return db.livros.find(l => String(l.id) === String(id));
  }

  criarLivro(livro) {
    const db = this._lerBanco();
    const novoLivro = {
      id: Date.now().toString(),
      ...livro,
      comentarios: []
    };
    db.livros.push(novoLivro);
    this._salvarBanco(db);
    return novoLivro;
  }

  adicionarComentario(livroId, comentario) {
    const db = this._lerBanco();
    const livro = db.livros.find(l => String(l.id) === String(livroId));
    if (!livro) {
      throw { status: 404, message: "Livro não encontrado." };
    }
    if (!livro.comentarios) livro.comentarios = [];
    livro.comentarios.push(comentario);
    this._salvarBanco(db);
    return livro;
  }

  buscarUsuarioPorEmail(email) {
    const db = this._lerBanco();
    return db.usuarios.find(u => u.email === email);
  }

  criarUsuario(usuario) {
    const db = this._lerBanco();
    const novoUsuario = {
      id: Date.now().toString(),
      ...usuario
    };
    db.usuarios.push(novoUsuario);
    this._salvarBanco(db);
    return novoUsuario;
  }

  listarAutores() {
    const db = this._lerBanco();
    return db.autores || [];
  }

  criarAutor(autor) {
    const db = this._lerBanco();
    const novoAutor = {
      id: Date.now().toString(),
      ...autor
    };
    db.autores.push(novoAutor);
    this._salvarBanco(db);
    return novoAutor;
  }
}

module.exports = new LivrariaRepository();