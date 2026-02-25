import app from './src/app.js';

const PORT = 3000; // Porta onde o servidor irá escutar as requisições

// Definindo as rotas e suas respostas
const rotas = {
    '/': 'Curso de Node.js - HTTP Server',
    '/livros': 'Entrei na rota de livros',
    '/autores': 'Entrei na rota de autores',
}

// Iniciando o servidor na porta 3000
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})

