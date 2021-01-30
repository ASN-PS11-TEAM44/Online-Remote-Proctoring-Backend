"use strict";

const { answerFetch } = require("../helper/answerFetch");

const answerFetchController = async (req, res) => {
  const userEmail = req.user.email;
  const examId = req.body.examId;

  const answers = await answerFetch(userEmail, examId);
  res.send({ answers: answers });
};
module.exports = { answerFetchController };
