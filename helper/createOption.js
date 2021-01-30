"use strict";

const sequelize = require("../models/index");

const { option } = sequelize.models;

const optionCreate = async (text, isCorrect, questionId) => {
  await option.create({ text, isCorrect, questionId });
  return true;
};

module.exports = { optionCreate };
