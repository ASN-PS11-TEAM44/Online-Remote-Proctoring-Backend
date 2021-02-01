"use strict";

const sequelize = require("../models/index");

const { student_in_exam, user } = sequelize.models;

const usersFetch = async (examId) => {
  const users = student_in_exam.findAll({
    where: { examId: examId },
  });
  return users;
};

module.exports = { usersFetch };
