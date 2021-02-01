"use strict";

const sequelize = require("../models/index");

const { userActivity, testAttempt } = sequelize.models;

const getUserActivity = async (examId, studentEmail) => {
  const attempt = await testAttempt.findOne({
    where: { examId: examId, userEmail: studentEmail },
    raw: true,
  });
  if (!attempt) return [];
  const activity = await userActivity.findAll({
    testAttemptId: attempt.id,
    userEmail: studentEmail,
  });
  return activity;
};

module.exports = { getUserActivity };
