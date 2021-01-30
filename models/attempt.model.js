"use strict";

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("testAttempt", {
    timeElapsed: {
      type: DataTypes.BIGINT,
      default: 0,
    },
  });
};
