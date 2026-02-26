import express from "express";
import Autores from "../controllers/autor.controller.js";

const router = express.Router();

router.get('/autores', Autores.listarAutores);
router.get('/autores/:id', Autores.listarAutorPorId);
router.post('/autores', Autores.cadastrarAutor);
router.put('/autores/:id', Autores.atualizarAutor);
router.delete('/autores/:id', Autores.deletarAutor);

export default router;