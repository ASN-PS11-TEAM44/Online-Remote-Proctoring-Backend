"use strict";

const { Sequelize } = require("sequelize");
const { applyExtraSetup } = require("./association");

const sequelize = require("./database");

const modelDefiners = [
  require("./user.model"),
  require("./exam.model"),
  require("./question.model"),
  require("./option.model"),
  require("./attempt.model"),
  require("./question_attempt.model"),
  require("./user_activity.model"),
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}
applyExtraSetup(sequelize);

module.exports = sequelize;
