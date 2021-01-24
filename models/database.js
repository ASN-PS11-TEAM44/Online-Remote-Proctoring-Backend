"use strict";

const Sequelize = require("sequelize");
const { dbConfig } = require("../config/dbConfig");

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  {
    logQueryParameters: true,
    host: dbConfig.host,
    dialect: "postgres",
    port: dbConfig.port,
    benchmark: true,
  }
);

module.exports = sequelize;
