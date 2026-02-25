import http from 'http'; // HTTP - Hyper Text Transfer Protocol

// Cliente -> Request (Requisição) -> Servidor
// Servidor -> Response (Resposta) -> Cliente

// HTTP header (cabeçalho) - Metadados da requisição ou resposta
// HTTP body (corpo) - Dados da requisição ou resposta

const PORT = 3000; // Porta onde o servidor irá escutar as requisições

// Definindo as rotas e suas respostas
const rotas = {
    '/': 'Curso de Node.js - HTTP Server',
    '/livros': 'Entrei na rota de livros',
    '/autores': 'Entrei na rota de autores',
}

// Criando um servidor HTTP
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(rotas[req.url] || 'Rota não encontrada');
});

// Iniciando o servidor na porta 3000
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})

