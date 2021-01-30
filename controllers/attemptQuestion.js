"use strict";

const { answerQuestion } = require("../helper/answerQuestion");

const attemptQuestionController = async (req, res) => {
  const userEmail = req.user.email;
  const examId = req.body.examId;
  const questionId = req.body.questionId;
  const optionId = req.body.optionId;
  await answerQuestion(userEmail, examId, questionId, optionId);
  res.send({ updated: true });
};
module.exports = { attemptQuestionController };
