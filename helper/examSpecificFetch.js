"use strict";

const sequelize = require("../models/index");

const { exam, user } = sequelize.models;

const examSpecificFetch = async (emailId, email, isStudent = true) => {
  const exams = await exam.findOne({
    where: {
      id: emailId,
    },
  });
  return exams;
};

module.exports = { examSpecificFetch };
