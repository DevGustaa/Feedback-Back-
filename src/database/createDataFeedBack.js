const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  user: "postgres",
  password: "1405",
  database: "FeedbackHGF",
  port: 5432,
});

async function createDataFeedBack() {
  try {
    await client.connect();

    const res = await client.query(`SELECT EXISTS (
    SELECT 1
    FROM information_schema.tables 
    WHERE table_name = 'data_feedback');`);

    if (!res.rows[0].exists) {
      await client.query(`CREATE TABLE IF NOT EXISTS data_feedback (
        id SERIAL PRIMARY KEY,
        avaliacaoGeral SMALLINT,
        atendimento SMALLINT,
        consulta SMALLINT,
        limpeza SMALLINT,
        tempoEspera SMALLINT
      );`);
      console.log("A tabela feedback foi criada com sucesso.");
    } else {
      console.log("Tabela já existe");
    }
  } catch (err) {
    console.log("Erro ao criar tabela", err);
  }
}

module.exports = createDataFeedBack;
