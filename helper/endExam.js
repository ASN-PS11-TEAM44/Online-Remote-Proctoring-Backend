"use strict";

const sequelize = require("../models/index");

const { testAttempt } = sequelize.models;

const endExam = async (examId, userEmail) => {
  const attempt = await testAttempt.findOne({
    where: { examId: examId, userEmail: userEmail },
  });
  attempt.complete = true;
  await attempt.save();
  return true;
};

module.exports = { endExam };
