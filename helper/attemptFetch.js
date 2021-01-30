"use strict";

const sequelize = require("../models/index");

const { testAttempt } = sequelize.models;

const attemptFetch = async (examId, userEmail) => {
  const attempt = await testAttempt.findOne({
    where: { examId: examId, userEmail: userEmail },
    raw: true,
  });
  return attempt;
};

module.exports = { attemptFetch };
