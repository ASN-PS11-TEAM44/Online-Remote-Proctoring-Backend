"use strict";

const sequelize = require("../models/index");

const { question } = sequelize.models;

const questionCreate = async (text, examId) => {
  await question.create({ text, examId });
  return true;
};

module.exports = { questionCreate };
