import app from './src/app.js';

const PORT = 3000; // Porta onde o servidor irá escutar as requisições

// Iniciando o servidor na porta 3000
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})

