const { Pool } = require("pg");
require("dotenv").config();

async function createDatabase() {
  // conexão TEMPORÁRIA com o banco postgres
  const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: "postgres",
  });

  try {
    const result = await pool.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [process.env.DB_NAME]
    );

    if (result.rowCount === 0) {
      await pool.query(`CREATE DATABASE "${process.env.DB_NAME}"`);
      console.log(`Banco ${process.env.DB_NAME} criado com sucesso`);
    } else {
      console.log(`Banco ${process.env.DB_NAME} já existe`);
    }
  } catch (error) {
    console.error("Erro ao criar database:", error.message);
  } finally {
    await pool.end();
  }
}

module.exports = createDatabase;
