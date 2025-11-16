const express = require("express");
const router = express.Router();
const feedbackController = require("../controller/FeedbackController");

router.post("/", feedbackController.postfeedback);

module.exports = router;
