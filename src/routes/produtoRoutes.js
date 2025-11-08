const express = require('express');
const router = express.Router();
const { produtoController } = require("../controllers/produtoController");

router.get("/produtos", produtoController.listarProduto);

router.post("/produtos", produtoController.criarProduto)

module.exports = { produtoRoutes: router }; 