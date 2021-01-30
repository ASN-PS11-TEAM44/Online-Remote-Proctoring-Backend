"use strict";

const { attemptExam } = require("../helper/attemptExam");

const attemptExamController = async (req, res) => {
  const userEmail = req.user.email;
  const examId = req.body.examId;
  await attemptExam(examId, userEmail, 2);
  res.send({ updated: true });
};
module.exports = { attemptExamController };
