import express from 'express';
import dbConnect from './config/dbConnect.js';
import livros from './models/Livro.js';

const connection = await dbConnect();

connection.on('error', () => console.log('Erro de conexão'));
connection.once('open', () => console.log('Conexão com o banco feita com sucesso'));

const app = express();
app.use(express.json()); // Middleware para parsear JSON no corpo das requisições

// Rota para a página inicial
app.get('/', (req, res) => {
  res.status(200).send('Curso de Node.js - Alura');
});

// Rota para listar os livros
app.get('/livros', async (req, res) => {
  const listaLivros = await livros.find({});  
  res.status(200).json(listaLivros);
});

app.get('/livros/:id', (req, res) => {
    const index = buscarLivros(req.params.id);
    res.status(200).json(livros[index]);
});

// Rota para adicionar um novo livro
app.post('/livros', (req, res) => {
    livros.push(req.body);
    res.status(201).json(req.body);
});

app.put('/livros/:id', (req, res) => {
    const index = buscarLivros(req.params.id);
    livros[index].titulo = req.body.titulo;
    livros[index].autor = req.body.autor;
    res.status(200).json(livros[index]);
});

app.delete('/livros/:id', (req, res) => {
    const index = buscarLivros(req.params.id);
    livros.splice(index, 1);
    res.status(204).send({ message: 'Livro deletado com sucesso!' });
});

export default app;

// 200 - OK: A requisição foi bem sucedida e o servidor retornou os dados solicitados.
// 201 - Created: A requisição foi bem sucedida e um novo recurso foi criado como resultado.
// 204 - No Content: A requisição foi bem sucedida, mas o servidor não tem conteúdo para retornar. Geralmente usado em operações de exclusão.