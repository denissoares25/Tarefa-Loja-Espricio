const {clienteModel} = require("../models/clienteModel");


const clienteController = {

    listarCliente: async (req, res) => {
        try {
            const { idCliente } = req.query;

            if(idCliente) {
                if(idCliente.length != 36){
                    return res.status(400).json({erro: "ID DO CLIENETE INVÁLIDO"});
                }

            }

            const clientes = await clienteModel.buscarTodos();

            res.status(200).json(clientes);

        } catch (error) {

            console.error('ERRO AO LISTAR CLIENTES: ', error);

            res.status(500).json({ error: 'ERRO AO BUSCAR CLIENTES.' });

        }
    },

criarCliente: async (req, res) => {
        try {
            const { nomeCliente, cpfCliente } = req.body;

            if (nomeCliente == undefined || nomeCliente.trim() == "" || cpfCliente == undefined || isNaN(cpfCliente)) {
                return res.status(400).json({ error: "Campos não obrigatorios não preenchidos" });
            }
            const clienteExistente = await clienteModel.buscarPorCpf(cpfCliente);

// aqui vc tem rever
            if (clienteExistente) {

                return res.status(409).json({ error: "CPF já cadastrado no sistema." });
            }

            await clienteModel.inserirCliente(nomeCliente, cpfCliente);
            res.status(201).json({ message: "Cliente cadastrado com sucesso!" });

        } catch (error) {

            console.error('ERRO AO CADASTRAR CLIENTE: ', error);

            res.status(500).json({ error: 'ERRO AO CADASTRAR CLIENTESS.' });

        }
    }
};

module.exports = {clienteController};