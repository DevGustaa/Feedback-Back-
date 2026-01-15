// FeedbackRepository.js
const pool = require("../../db");
const crypto = require("crypto");

async function insertFeedback(feedback) {
  const surveyId = crypto.randomUUID();

  const sql = `
    INSERT INTO feedback (survey_id, category, rating)
    VALUES
      ($1, 'avaliacao_geral', $2),
      ($1, 'atendimento', $3),
      ($1, 'consulta', $4),
      ($1, 'limpeza', $5),
      ($1, 'tempo_espera', $6)
  `;

  const values = [
    surveyId,
    feedback.avaliacao_geral,
    feedback.atendimento,
    feedback.consulta,
    feedback.limpeza,
    feedback.tempo_espera,
  ];

  await pool.query(sql, values);
  return surveyId;
}

module.exports = {
  insertFeedback,
};
