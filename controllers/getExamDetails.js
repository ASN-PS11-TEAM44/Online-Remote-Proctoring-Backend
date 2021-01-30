"use strict";

const { examSpecificFetch } = require("../helper/examSpecificFetch");

const examDetailFetchController = async (req, res) => {
  const examId = req.body.examId;
  const exams = await examSpecificFetch(examId);
  res.send({ exam: exams });
};
module.exports = { examDetailFetchController };
