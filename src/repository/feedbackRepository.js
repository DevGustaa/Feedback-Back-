const pool = require("../../db");

async function InsertFeedback(feedback) {
  const sql =
    "INSERT INTO data_feedback(avaliacaogeral, atendimento, consulta, limpeza, tempoespera)  VALUES ($1, $2, $3, $4, $5)";
  const values = [
    feedback.avaliacao_geral,
    feedback.atendimento,
    feedback.consulta,
    feedback.limpeza,
    feedback.tempo_espera,
  ];
  await pool.query(sql, values);
}

module.exports = {
  InsertFeedback,
};
