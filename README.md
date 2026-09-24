# Livraria API: Node.js, Express e MongoDB

API REST de uma livraria (livros e autores), feita durante a formação de Node.js da Alura. O foco foi estruturar uma API com Express e Mongoose, tratar erros de forma centralizada e implementar buscas com filtros e paginação.

## O que a API faz

- CRUD de **livros** e **autores**, com o autor de cada livro carregado via `populate`.
- **Busca com filtros combináveis**: editora, título, faixa de páginas e nome do autor.
- **Paginação e ordenação** por query string (`limite`, `pagina`, `ordenacao=campo:1|-1`).
- **Tratamento de erros centralizado** com classes próprias (`ErroBase`, `NaoEncontrado`, `RequisicaoIncorreta`, `ErroValidacao`): ID malformado retorna `400`, recurso inexistente `404` e dados inválidos `400` com a lista de problemas.
- **Validações no schema do Mongoose**, aplicadas também nas atualizações.

## Endpoints

| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/livros?limite=5&pagina=1&ordenacao=titulo:1` | Lista livros com paginação |
| `GET` | `/livros/busca?editora=alura&minPaginas=100&nomeAutor=ana` | Busca com filtros (também paginada) |
| `GET` | `/livros/:id` | Detalhe do livro com o autor |
| `POST` · `PUT` · `DELETE` | `/livros` · `/livros/:id` | Cadastro, edição e remoção |
| `GET` · `POST` · `PUT` · `DELETE` | `/autores` · `/autores/:id` | CRUD de autores |

## Como rodar

**Pré-requisitos:** Node.js e um MongoDB (local ou Atlas).

```bash
git clone https://github.com/JorgeBublitz/Alura-NodeJS.git
cd Alura-NodeJS
npm install
cp .env.example .env    # informe a STRING_CONEXAO_DB
npm run dev             # http://localhost:3000
```

## Stack

Node.js · Express · MongoDB · Mongoose · ESLint

## Certificados

- [Node.js: criando uma API REST com Express e MongoDB](https://cursos.alura.com.br/user/bublitzjorge3/course/node-js-api-rest-express-mongodb/formalCertificate)
- [Node.js: lidando com buscas, filtros, paginação e erros em uma API](https://cursos.alura.com.br/user/bublitzjorge3/course/node-js-buscas-filtros-paginacao-erros-api/formalCertificate)
