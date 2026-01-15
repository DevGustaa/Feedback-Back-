// FeedbackService.js
const FeedbackRepository = require("../repository/feedbackRepository");

async function createFeedback(feedback) {
  const ratings = Object.values(feedback);

  for (const rating of ratings) {
    if (rating < 1 || rating > 5) {
      throw new Error("Nota inválida");
    }
  }

  return FeedbackRepository.insertFeedback(feedback);
}

module.exports = {
  createFeedback,
};
