"use strict";

const { questionFetch } = require("../helper/questionFetch");

const questionFetchController = async (req, res) => {
  const examId = req.body.examId;
  if (examId === undefined) {
    res.status(400).send({ success: false, error: "ExamID cannot be empty" });
  }
  const questions = await questionFetch(examId);
  res.send({ questions: questions });
};
module.exports = { questionFetchController };
