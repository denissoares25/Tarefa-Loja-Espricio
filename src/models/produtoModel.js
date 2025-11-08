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

            const result = await pool.request()
                .query(querySQL);
            
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
        
    }

};


module.exports = {produtoModel}; //ja coloque antes que esqueça 