"use strict";

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("testAttempt", {
    timeElapsed: {
      type: DataTypes.BIGINT,
      default: 0,
    },
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
};
