"use strict";

const sequelize = require("../models/index");

const { questionAttempt, testAttempt } = sequelize.models;

const answerFetch = async (userEmail, examId) => {
  const attempt = await testAttempt.findOne({
    where: { examId: examId, userEmail: userEmail },
    raw: true,
  });
  if (!attempt) {
    return [];
  }
  const answers = await questionAttempt.findAll({
    where: { testAttemptId: attempt.id },
    raw: true,
  });
  return answers;
};

module.exports = { answerFetch };
