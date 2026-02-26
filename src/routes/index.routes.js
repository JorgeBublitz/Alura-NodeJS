import express from "express";
import livros from "./livros.routes.js";
import autores from "./autores.routes.js";

const routes = (app) => {
    // Rota principal
    app.get("/", (req, res) => {
        res.status(200).send("Curso de Node.js - Alura");
    });

    app.use(express.json(), livros, autores);
};

export default routes;