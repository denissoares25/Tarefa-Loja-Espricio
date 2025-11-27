const {sql, getConnection} = require("../config/db"); //forma certa de importa

const produtoModel = {

 /**
  * Busca todos os produtos no banco de dados
  * 
  * @async
  * @function buscarTodos
  * @returns {Promise<Array>} Retorna uma lista com todos os produtos.
  * @throws Mostra no console e propaga o erro caso a busca falhe. 
  */   
    buscarTodos: async () => {
        try {
            const pool = await getConnection();

            const querySQL = 'SELECT * FROM Produtos';

            const result = await pool.request().query(querySQL);
            
            return result.recordset;

        } catch (error) {
            console.error("ERRO AO BUSCAR PRODUTOS: ", error);
            throw error; //reveberar o erro para a funcao que o chamar.
            
        }
    },


    buscarUm: async (inserirProduto) => {
        try {
            
            const pool = await getConnection();

            const querySQL = `
            SELECT * FROM Produtos
            WHERE idProduto = @idProduto 
            `;// @ é um identificador no sql 

            const result = await pool.request()
                .input('idProduto', sql.UniqueIdentifier, inserirProduto)
                .query(querySQL);

            return result.recordset;

        } catch (error) {
            
            console.error("ERRO AO BUSCAR O PRODUTO: ", error);
            throw error;
        }
    },

        /**
     * Atualiza um produto no banco de dados.
     * 
     * @async
     * @function atualizarProduto
     * @param {string} idProduto - Id do produto em UUID no banco de dados.
     * @param {string} nomeProduto - Nome do produto a ser atualizado.
     * @param {number} precoProduto - Preço do produto a ser atualizado.
     * @returns {Promise<void>} Não retorna nada, apenas executa a atualização.
     * @throws Mostra no console e propaga o erro caso a atualização falhe.
     */

    atualizarProduto: async (idProduto, nomeProduto, precoProduto) => {
        try {
            const pool = await getConnection();

            const querySQL = `
                UPDATE Produtos
                SET nomeProduto = @nomeProduto,
                    precoProduto = @precoProduto
                WHERE idProduto = @idProduto
            `;

            await pool.request()
                .input('idProduto', sql.UniqueIdentifier, idProduto)
                .input('nomeProduto', sql.VarChar(100), nomeProduto)
                .input('precoProduto', sql.Decimal(10, 2), precoProduto)
                .query(querySQL);

        } catch (error) {
            console.error("Erro ao atualizar o produto:", error);
            throw error;
        }
    },
/**
 * insere um novo produto no banco de dados.
 * @async
 * @function inserirProduto
 * @param {string} nomeProduto - Nome do produto a ser cadastrado
 * @param {*} precoProduto - preco do produto
 * @returns {Promise<void>} NAO RETORNA NADA apenas executa a insercao
 * @throws Mostra no console e propaga o erro caso a insercao falhe
 * 
 *  */

    inserirProduto: async (nomeProduto,precoProduto) => {
        try {

            const pool = await getConnection();

            const querySQL = `
                INSERT INTO Produtos (nomeProduto, precoProduto)
                VALUES (@nomeProduto, @precoProduto)
            `
            
            await pool.request()
            .input("nomeProduto", sql.VarChar(100), nomeProduto)
            .input("precoProduto", sql.Decimal(10,2), precoProduto)
                .query(querySQL);
        } catch (error) {
             console.error("ERRO AO INSERIR PRODUTO: ", error);
            throw error;
        }
        
    },

    /**
     * Deleta um produto no banco de dados.
     * 
     * @async
     * @function deletarProduto
     * @param {string} idProduto - Id do produto em UID no banco de dados.
     * @returns {Promise<void>} Não retorna nada, apenas executa a exclusão.
     * @throws Mostra no console e propaga o erro caso a exclusão falhe.
    */
    deletarProduto: async (idProduto) => {
        try {

            const pool = await getConnection();

            const querySQL = `
                DELETE FROM Produtos
                WHERE idProduto = @idProduto
            `;

            await pool.request()
                .input('idProduto', sql.UniqueIdentifier, idProduto)
                .query(querySQL);

        } catch (error) {
            console.error("Erro ao deletar o produto:", error);
            throw error;
        }
    }
};

module.exports = {produtoModel}; //ja coloque antes que esqueça 