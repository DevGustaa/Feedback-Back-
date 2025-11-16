const FeedbackRepo = require("../repository/feedbackRepository");

exports.postfeedback = async (req, res) => {
  await FeedbackRepo.InsertFeedback(req.body);
  res.sendStatus(201);
};
