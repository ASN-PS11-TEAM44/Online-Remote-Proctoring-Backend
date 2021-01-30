"use strict";
const sequelize = require("../models/index");

const { testAttempt } = sequelize.models;

const attemptExam = async (examId, userEmail, timeElapsed = 0) => {
  const obj = await testAttempt.findOne({
    where: { examId: examId, userEmail: userEmail },
  });
  if (obj) {
    obj.timeElapsed = parseInt(obj.timeElapsed) + timeElapsed;
    await obj.save();
  } else {
    await testAttempt.create({ examId, userEmail, timeElapsed: 0 });
  }
  return true;
};

module.exports = { attemptExam };
