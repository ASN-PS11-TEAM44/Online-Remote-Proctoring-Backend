"use strict";

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("testAttempt", {
    timeElapsed: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
    },
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    tabSwitchCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    browserSwitchCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    headMovementCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    brighnessDimCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });
};
