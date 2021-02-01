"use strict";

const sequelize = require("../models/index");

const { userActivity, testAttempt } = sequelize.models;

const addUserActivity = async (examId, userEmail, message, status, image='') => {
  const attempt = await testAttempt.findOne({
    where: { examId: examId, userEmail: userEmail },
    raw: true,
  });
  if (!attempt) return;
  await userActivity.create({
    testAttemptId: attempt.id,
    userEmail: userEmail,
    message: message,
    status: status,
    image: image,
  });
  return true;
};

module.exports = { addUserActivity };
