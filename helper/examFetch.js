"use strict";

const sequelize = require("../models/index");

const { exam, user } = sequelize.models;

const examFetch = async (email, isStudent = true) => {
  const exams = await exam.findAll({
    where: { "$users.email$": email, "$users.isStudent$": isStudent },
    raw: true,
    include: [{ model: user, as: "users", attributes: ["email"] }],
  });
  return exams;
};

module.exports = { examFetch };
