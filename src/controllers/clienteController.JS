const { default: Message } = require("tedious/lib/message");
const {clienteModel } = require("../models/clienteModel");


const clienteController = {

criarCliente: async (req, res) => {
        try {
            const { nomeCliente, cpfCliente } = req.body;

            if (nomeCliente == undefined || nomeCliente.trim() == "" || cpfCliente == undefined || isNaN(cpfCliente)) {
                return res.status(400).json({ error: "Campos não obrigatorios não preenchidos" });
            }

            // await clienteModel.inserirCliente(nomeCliente, cpfCliente);
            // res.status(201).json({ message: "Cliente cadastrado com sucesso!" });

        } catch (error) {

            console.error('ERRO AO CADASTRAR CLIENTE: ', error);

            res.status(500).json({ error: 'ERRO AO CADASTRAR PRODUTOS.' });

        }
    }
};

module.exports = { clienteController };