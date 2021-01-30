"use strict";

const sequelize = require("../models/index");

const { question, option } = sequelize.models;

const questionFetch = async (examId) => {
  const questions = question.findAll({
    where: { examId: examId },
    include: [{ model: option, attributes: ["text", "id"] }],
  });
  return questions;
};

module.exports = { questionFetch };
