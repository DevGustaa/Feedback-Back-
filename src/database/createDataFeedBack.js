const { Client } = require("pg");

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

async function createDataFeedBack() {
  try {
    await client.connect();

    const res = await client.query(`
      SELECT EXISTS (
        SELECT 1
        FROM information_schema.tables 
        WHERE table_name = 'feedback'
      );
    `);

    if (!res.rows[0].exists) {
      await client.query(`
        CREATE TABLE feedback (
          id SERIAL PRIMARY KEY,
          survey_id UUID NOT NULL,
          category TEXT NOT NULL,
          rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
          created_at TIMESTAMP NOT NULL DEFAULT now(),
          CONSTRAINT uq_survey_category UNIQUE (survey_id, category)
        );
      `);

      console.log("Tabela feedback criada com sucesso.");
    } else {
      console.log("Tabela feedback já existe.");
    }
  } catch (err) {
    console.error("Erro ao criar tabela feedback", err);
  } finally {
    await client.end();
  }
}

module.exports = createDataFeedBack;
