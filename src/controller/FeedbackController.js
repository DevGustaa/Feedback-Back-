// FeedbackController.js
const FeedbackService = require("../service/FeedbackService");

async function postFeedback(req, res) {
  try {
    const surveyId = await FeedbackService.createFeedback(req.body);
    return res.status(201).json({ surveyId });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao salvar feedback" });
  }
}

module.exports = {
  postFeedback,
};
