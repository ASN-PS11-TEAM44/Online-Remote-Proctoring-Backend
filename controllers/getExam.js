"use strict";

const { examFetch } = require("../helper/examFetch");

const examFetchController = async (req, res) => {
  const userEmail = req.user.email;
  const isStudent = req.user.isStudent;
  const exams = await examFetch(userEmail, isStudent);
  res.send({ exams: exams });
};
module.exports = { examFetchController };
