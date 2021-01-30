"use strict";

const sequelize = require("../models/index");

const { questionAttempt, testAttempt } = sequelize.models;

const answerQuestion = async (userEmail, examId, questionId, optionId) => {
  const attempt = await testAttempt.findOne({
    where: { examId: examId, userEmail: userEmail },
    raw: true,
  });
  const attemptId = attempt.id;
  const obj = await questionAttempt.findOne({
    where: { testAttemptId: attemptId, questionId: questionId },
  });
  if (obj) {
    obj.optionId = optionId;
    await obj.save();
  } else {
    await questionAttempt.create({
      testAttemptId: attemptId,
      questionId: questionId,
      optionId: optionId,
    });
  }
  return true;
};

module.exports = { answerQuestion };
