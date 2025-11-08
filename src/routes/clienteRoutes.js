const express = require('express');
const router = express.Router();
const { clienteController } = require("../controllers");

router.get("/clientes", clienteController.);


module.exports = { clienteRoutes: router }; 