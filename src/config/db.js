const sql = require("mssql");

const config = {
    user: "sa",
    password: "123456789",
    server: "localhost",
    database: "LojaEspricio",
    options:{
        encrypt: true,
        trustServerCertificate: true
    }
};
/**
 * cria e retorna uma conexão com o banco de dados sql server
 * 
 * @async
 * @function getConnection
 * @returns {Promise<object> } retorna o objeto de (pool) com o banco de dados.
 * @throws Mostra no console se ocoorrer erro na conexão.
 * 
 */
async function getConnection() { 
    try {
        const pool = await sql.connect(config);
        
        return pool;

    } catch (error) {
        console.error('ERRO NA CONEXÃO SQL SERVER',error);

    }
    
};

// (async () => {
//     const pool = await getConnection();

//     const result =  await pool.request().query("SELECT * FROM Produtos")

//     console.log(result.recordset);
    
// })()

module.exports = {sql, getConnection};