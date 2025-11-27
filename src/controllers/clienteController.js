
const { clienteModel } = require("../models/clienteModel");


const clienteController = {

    listarCliente: async (req, res) => {
        try {
            const { idCliente } = req.query;

            if (idCliente) {
                if (idCliente.length != 36) {
                    return res.status(400).json({ erro: "ID DO CLIENETE INVÁLIDO" });
                }

                const cliente = await clienteModel.buscarPorId(idCliente);

                return res.status(200).json(cliente);

            }

            const clientes = await clienteModel.buscarTodos();

            res.status(200).json(clientes);

        } catch (error) {

            console.error('ERRO AO LISTAR CLIENTES: ', error);

            res.status(500).json({ error: 'ERRO AO BUSCAR CLIENTES.' });

        }
    },
    /**
 * Controlador que cria um novo produto no banco de dados
 * 
 * @async
 * @function criarCliente
 * @param {object} req - Objeto da requisição (recebido do cliente HTTP)
 * @param {object} res - Objeto da resposta (enviado ao cliente HTTP)
 * @returns {Promise<void>} Retorna uma mensagem de sucesso ou erro em formato JSON
 * @throws {400} Se algum campo obrigatório não for preenchido corretamente.
 * @throws {500} Se ocorrer qualquer erro interno no servidor.
 * 
 * @example
 * POST /produtos
 * BODY
 * {
 *  "nomeCliente": "Guilherme Zini",
 *  "cpfCliente": "52756445827"
 * }
 */
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
    },

    atualizarCliente: async (req, res) => {
        try {
            const { idCliente } = req.params;
            const { nomeCliente, cpfCliente } = req.body;

            if (idCliente.length != 36) {
                return res.status(400).json({ erro: 'id do Cliente inválido!' });
            }

            const cliente = await clienteModel.buscarPorId(idCliente);

            if (!cliente || cliente.length !== 1) {
                return res.status(404).json({ erro: 'Cliente não encontrado!' });
            }

            const clienteAtual = cliente[0];

            const nomeAtualizado = nomeCliente ?? clienteAtual.nomeCliente;
            const cpfAtualizado = cpfCliente ?? clienteAtual.cpfCliente;

            await clienteModel.atualizarCliente(idCliente, nomeAtualizado, cpfAtualizado);

            res.status(200).json({ mensagem: 'Cliente atualizado com sucesso!' });

        } catch (error) {
            console.error('Erro ao atualizar Cliente:', error);
            res.status(500).json({ erro: 'Erro ao atualizar Cliente.' });
        }
    },

    deletarCliente: async (req, res) => {
        try {
            const { idCliente } = req.params;

            if (idCliente.length != 36) {
                return res.status(400).json({ erro: 'id do cliente inválido!' });
            }

            const cliente = await clienteModel.buscarPorId(idCliente);

            if (!cliente || cliente.length !== 1) {
                return res.status(404).json({ erro: 'Cliente não encontrado!' });
            }

            await clienteModel.deletarCliente(idCliente);

            res.status(200).json({ mensagem: 'Cliente deletado com sucesso!' });
        } catch (error) {
            console.error('Erro ao deletar cliente:', error);
            res.status(500).json({ erro: 'Erro ao deletar cliente.' });
        }
    }

}

module.exports = { clienteController };