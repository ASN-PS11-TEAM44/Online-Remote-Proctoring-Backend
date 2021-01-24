"use strict";

const { Sequelize } = require("sequelize");
const { applyExtraSetup } = require("./association");

const sequelize = require("./database");

const modelDefiners = [require("./user.model")];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}
applyExtraSetup(sequelize);

console.log(sequelize)

module.exports = sequelize;
