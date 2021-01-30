"use strict";

const sequelize = require("../models/index");

const { exam } = sequelize.models;

const examCreate = async (title, duration, startTime, endTime) => {
  await exam.create({
    title,
    duration,
    startTime,
    endTime,
  });
  return true;
};

module.exports = { examCreate };
