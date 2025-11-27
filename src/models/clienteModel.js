const { sql, getConnection } = require("../config/db");

const clienteModel = {

    /**
  * Busca todos os clientes no banco de dados.
  * 
  * 
  * @async
  * @function buscarTodos
  * @returns {Promise<Array>} Retorna uma lista com todos os clientes.
  * @throws Mostra no console e propaga o erro caso a busca falhe.
  */
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
    /**
 * Verifica se o CPF já está cadastrado.
 * 
 * @async
 * @function buscarPorCpf
 * @returns {Promise<array>} - Retorna uma lista com os clientes filtrados.
 * @throws Mostra no console e propaga o erro caso a inserção falhe
 */
    buscarPorCpf: async (cpfCliente) => {
        try {
            const pool = await getConnection();


            const querySQL = `
                        SELECT * FROM Clientes 
                        WHERE cpfCliente = @cpfCliente
                        `;

            const result = await pool.request()
                .input("cpfCliente", sql.Char(11), cpfCliente)
                .query(querySQL);


            return result.recordset[0];

        } catch (error) {
            console.error("ERRO AO BUSCAR CLIENTE POR CPF: ", error);
            throw error;
        }
    },

    /**
* Busca apenas um id no banco de dados.
* 
* @async
* @function buscarPorId
* @param {string} idCliente - ID do cliente em UUID(ID Universal) no banco de dados.
* @returns {Promise<array>} - Retorna uma lista com um cliente caso encontre no banco de dados.
* @throws Mostra no console e propaga o erro caso a inserção falhe
*/
    buscarPorId: async (idCliente) => {
        try {
            const pool = await getConnection();


            const querySQL = `
                        SELECT * FROM Clientes 
                        WHERE idCliente = @idCliente
                        `;

            const result = await pool.request()
                .input("idCliente", sql.UniqueIdentifier, idCliente)
                .query(querySQL);


            return result.recordset;

        } catch (error) {
            console.error("ERRO AO BUSCAR CLIENTE POR ID: ", error);
            throw error;
        }
    },



    /**
     * Atualiza um cliente no banco de dados.
     * 
     * @async
     * @function atualizarCliente
     * @param {string} idCliente - ID do cliente em UUID(ID Universal) no banco de dados.
     * @param {string} nomeCliente - Nome do cliente a ser atualizado.
     * @param {number} cpfCliente - CPF do cliente a ser atualizado.
     * @returns {Promise<void>} - Não retorna nada, apens executa a atualização.
     * @throws Mostra no console e propaga o erro caso a atualização falhe
     */
    atualizarCliente: async (idCliente, nomeCliente, cpfCliente) => {
        try {
            const pool = await getConnection();

            const querySQL = `
                UPDATE Clientes
                SET nomeCliente = @nomeCliente,
                    cpfCliente = @cpfCliente
                WHERE idCliente = @idCliente

            `;

            await pool.request()
                .input('idCliente', sql.UniqueIdentifier, idCliente)
                .input('nomeCliente', sql.VarChar(100), nomeCliente)
                .input('cpfCliente', sql.Char(11), cpfCliente)
                .query(querySQL);

        } catch (error) {
            console.error("Erro ao atualizar o clienete:", error);
            throw error;

        }
    },

    /**
     * Insere um novo cliente no banco de dados.
     * 
     * @async
     * @function inserirCliente
     * @param {string} nomeCliente - Nome do cliente a ser cadastrado
     * @param {number} cpfCliente - CPF do cliente a ser cadastrado
     * @returns {Promise<void>} - Não retorna nada, apenas executa a inserção
     * @throws Mostra no console e propaga o erro caso a inserção falhe
     */

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

    },
    /**
 * Deleta um cliente no banco de dados.
 * 
 * @async
 * @function deletarCliente
 * @param {string} idCliente - ID do cliente para selecionar e ser excluido
 * @returns {Promise<void>} - Não retorna nada, apens executa a exclusão.
 * @throws Mostra no console e propaga o erro caso a atualização falhe
 */
    deletarCliente: async (idCliente) => {
        try {

            const pool = await getConnection();

            const querySQL = `
                DELETE FROM Clientes
                WHERE idCliente = @idCliente
            `;

            await pool.request()
                .input('idCliente', sql.UniqueIdentifier, idCliente)
                .query(querySQL);

        } catch (error) {
            console.error("Erro ao deletar o Cliente:", error);
            throw error;
        }
    }
};

module.exports = { clienteModel };