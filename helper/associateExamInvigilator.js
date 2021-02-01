"use strict";

const sequelize = require("../models/index");

const { exam } = sequelize.models;

const associateExamInvigilator = async (id, email) => {
  await exam.update(
    {
      userEmail: email,
    },
    { where: { id: id } }
  );
  return true;
};

module.exports = { associateExamInvigilator };
