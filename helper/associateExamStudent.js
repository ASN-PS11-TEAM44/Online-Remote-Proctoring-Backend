"use strict";

const sequelize = require("../models/index");

const { student_in_exam } = sequelize.models;

const associateExamStudent = async (id, email) => {
  await student_in_exam.create({
    examId: id,
    userEmail: email,
  });
  return true;
};

module.exports = { associateExamStudent };
