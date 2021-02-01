"use strict";

const { usersFetch } = require("../helper/getStudentsInExam");

const userFetchController = async (req, res) => {
  const examId = req.body.examId;
  if (examId === undefined) {
    res.status(400).send({ success: false, error: "ExamID cannot be empty" });
  }
  const questions = await usersFetch(examId);
  res.send({ users: questions });
};
module.exports = { userFetchController };
