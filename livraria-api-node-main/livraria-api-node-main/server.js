const express = require('express');
const cors = require('cors');
const setupSwagger = require('./swagger'); 

const authRoutes = require('./routes/authRoutes');
const livroRoutes = require('./routes/livroRoutes');
const autorRoutes = require('./routes/autorRoutes');

const app = express();

app.use(cors());
app.use(express.json());

setupSwagger(app);

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/livros', livroRoutes);
app.use('/api/v1/autores', autorRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Livraria API rodando em http://localhost:${PORT}`);
  console.log(`Documentação Swagger disponível em http://localhost:${PORT}/api/docs`);
});