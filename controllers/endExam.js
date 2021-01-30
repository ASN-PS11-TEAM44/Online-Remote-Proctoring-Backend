"use strict";

const { endExam } = require("../helper/endExam");

const endExamController = async (req, res) => {
  const userEmail = req.user.email;
  const examId = req.body.examId;
  await endExam(examId, userEmail);
  res.send({ end: true });
};
module.exports = { endExamController };
