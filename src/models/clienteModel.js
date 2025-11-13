const {sql, getConnection} = require("../config/db");

const clienteModel = {

    buscarTodos: async () => {
        try {

            const pool = await getConnection();

            const querySQL = 'SELECT * FROM Clientes';

            const result = await pool.request()
                .query(querySQL);

            return result.recordset;

        } catch (error) {

            console.error("ERRO AO BUSCAR CLIENTE: ", error);
            throw error;

        }

    },



    inserirCliente: async (nomeCliente, cpfCliente) => {
        try {

            const pool = await getConnection();

            const querySQL = `
                INSERT INTO Clientes (nomeCliente, cpfCliente)
                VALUES (@nomeCliente, @cpfCliente)
                
                `

            await pool.request()
                .input("nomeCliente", sql.VarChar(100), nomeCliente)
                .input("cpfCliente", sql.Char(11), cpfCliente)
                    .query(querySQL);

        } catch (error) {

        console.error("ERRO AO INSERIR CLIENTE: ", error);
            throw error;

        }


    }
};

module.exports = {clienteModel};