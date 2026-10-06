const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

class LivrariaRepository {
  constructor() {
    this.dbPath = path.resolve(process.cwd(), 'database.json');
    this._garantirArquivoInicial();
  }

  _obterDadosPadrao() {
    // Hashes pré-gerados para admin123 e leitor123
    const salt = bcrypt.genSaltSync(10);
    const hashAdmin = bcrypt.hashSync('admin123', salt);
    const hashLeitor = bcrypt.hashSync('leitor123', salt);

    return {
      usuarios: [
        { id: 1, nome: "Admin", email: "admin@livraria.com", senha: hashAdmin, role: "ADMIN" },
        { id: 2, nome: "Leitor", email: "leitor@gmail.com", senha: hashLeitor, role: "USER" }
      ],
      autores: [
        { id: 1, nome: "Machado de Assis", nacionalidade: "Brasileira" }
      ],
      livros: [
        {
          id: 1,
          titulo: "Dom Casmurro",
          ano: 1899,
          autor_id: 1,
          comentarios: [
            { id: 1, autor_nome: "Leitor", texto: "Clássico imperdível!" }
          ]
        }
      ]
    };
  }

  _garantirArquivoInicial() {
    try {
      if (!fs.existsSync(this.dbPath)) {
        fs.writeFileSync(this.dbPath, JSON.stringify(this._obterDadosPadrao(), null, 2), 'utf-8');
      }
    } catch (e) {
      console.error('Erro ao ler ou criar database.json:', e.message);
    }
  }

  _ler() {
    this._garantirArquivoInicial();
    try {
      const data = fs.readFileSync(this.dbPath, 'utf-8');
      return JSON.parse(data);
    } catch (e) {
      return this._obterDadosPadrao();
    }
  }

  _salvar(dados) {
    fs.writeFileSync(this.dbPath, JSON.stringify(dados, null, 2), 'utf-8');
  }

  // Métodos de Usuário
  buscarUsuarioPorEmail(email) {
    const db = this._ler();
    return db.usuarios.find(u => u.email === email);
  }

  criarUsuario(usuario) {
    const db = this._ler();
    const novoUsuario = {
      id: db.usuarios.length ? Math.max(...db.usuarios.map(u => u.id)) + 1 : 1,
      role: 'USER',
      ...usuario
    };
    db.usuarios.push(novoUsuario);
    this._salvar(db);
    return novoUsuario;
  }

  // Métodos de Livros
  listarLivros() {
    return this._ler().livros;
  }

  buscarLivroPorId(id) {
    const db = this._ler();
    return db.livros.find(l => l.id === parseInt(id));
  }

  criarLivro(livro) {
    const db = this._ler();
    const novoLivro = {
      id: db.livros.length ? Math.max(...db.livros.map(l => l.id)) + 1 : 1,
      comentarios: [],
      ...livro
    };
    db.livros.push(novoLivro);
    this._salvar(db);
    return novoLivro;
  }

  adicionarComentario(livroId, comentario) {
    const db = this._ler();
    const livro = db.livros.find(l => l.id === parseInt(livroId));
    if (!livro) return null;

    const novoComentario = {
      id: livro.comentarios.length ? Math.max(...livro.comentarios.map(c => c.id)) + 1 : 1,
      ...comentario
    };
    livro.comentarios.push(novoComentario);
    this._salvar(db);
    return novoComentario;
  }

  // Métodos de Autores
  listarAutores() {
    return this._ler().autores;
  }

  criarAutor(autor) {
    const db = this._ler();
    const novoAutor = {
      id: db.autores.length ? Math.max(...db.autores.map(a => a.id)) + 1 : 1,
      ...autor
    };
    db.autores.push(novoAutor);
    this._salvar(db);
    return novoAutor;
  }
}

module.exports = new LivrariaRepository();