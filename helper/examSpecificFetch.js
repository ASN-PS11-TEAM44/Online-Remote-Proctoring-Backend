"use strict";

const sequelize = require("../models/index");

const { exam, user } = sequelize.models;

const examSpecificFetch = async (examId, email, isStudent = true) => {
  const exams = await exam.findOne({
    where: {
      id: examId,
    },
  });
  return exams;
};

module.exports = { examSpecificFetch };
