"use strict";

const sequelize = require("../models/index");

const { exam, user, testAttempt } = sequelize.models;

const examFetch = async (email, isStudent = true) => {
  const exams = await exam.findAll({
    where: { "$users.email$": email, "$users.isStudent$": isStudent },
    include: [
      { model: user, as: "users", attributes: ["email"] },
      { model: testAttempt },
    ],
  });
  return exams;
};

module.exports = { examFetch };
